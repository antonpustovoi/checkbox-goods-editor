import { useMemo, useState } from "react";

import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useDebounce } from "@hooks/useDebounce";
import * as Q from "@queries";

import { useProductsContext } from "../ProductsContext";

import { ListboxComponent } from "./ListboxComponent";
import { css } from "./css";

const DEFAULT_LIMIT = 25;
const DEBOUNCE_DELAY = 200;

export function SelectProductField() {
  const { products, setProducts } = useProductsContext();

  const [inputValue, setInputValue] = useState("");

  const { data, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ["Products", inputValue, DEFAULT_LIMIT],
    queryFn: Q.getProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length >= DEFAULT_LIMIT) {
        return lastPage.pageParam + 1;
      }
    },
    gcTime: 0,
    refetchOnWindowFocus: false
  });

  const debounceSetInputValue = useDebounce(setInputValue, DEBOUNCE_DELAY);

  const options = useMemo(() => {
    const options = data?.pages.map((page) => page.data).flat() || [];
    return options.filter((option) =>
      products.every((product) => product.code !== option.code)
    );
  }, [data, products]);

  const handleBottomScroll = () => fetchNextPage({ cancelRefetch: false });

  const handleChange = (_event, value) => {
    const nextValue = {
      ...value,
      purchasePrice: null,
      margin: 25,
      marked: false,
      original: value
    };
    setProducts([...products, nextValue]);
  };

  const handleInputChange = (_event, value, reason) =>
    reason === "input" && debounceSetInputValue(value);

  const handleBlur = () => setInputValue("");

  const renderOption = (props, option) => (
    <li {...props} css={css.option}>
      <span css={css.name}>{option.name}</span>
      {Boolean(option.related_barcodes) && (
        <span css={css.barcodes}>
          {"["}
          {option.related_barcodes}
          {"]"}
        </span>
      )}
      <span css={css.price}>{Number(option.price).toFixed(2)}</span>
    </li>
  );

  const renderInput = (params) => (
    <TextField
      {...params}
      label="Пошук"
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <>
            {isFetching && <CircularProgress color="inherit" size={20} />}
            {params.InputProps.endAdornment}
          </>
        )
      }}
    />
  );

  return (
    <Autocomplete
      value={null}
      options={options}
      loading={isFetching}
      blurOnSelect
      clearOnBlur
      loadingText="Завантаження списку..."
      noOptionsText="Елементи відсутні"
      filterOptions={(options) => options}
      getOptionLabel={(option) => option.name}
      getOptionKey={(option) => option.code}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onBlur={handleBlur}
      ListboxComponent={ListboxComponent}
      ListboxProps={{
        onBottomScroll: handleBottomScroll
      }}
      renderOption={renderOption}
      renderInput={renderInput}
    />
  );
}

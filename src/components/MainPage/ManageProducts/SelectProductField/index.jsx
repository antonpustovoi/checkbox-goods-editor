import { useEffect, useMemo, useState } from "react";

import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

import { useDebounce } from "hooks/useDebounce";
import * as Q from "queries";

import { useProductsContext } from "../ProductsContext";

import { css } from "./css";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

const DEFAULT_LIMIT = 25;
const DEBOUNCE_DELAY = 200;

SelectProductField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export function SelectProductField(props) {
  const { value, onChange } = props;

  const { products } = useProductsContext();

  const [inputValue, setInputValue] = useState("");

  const [, setListNode] = useState(null);

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
    refetchOnWindowFocus: false,
  });

  const debounceSetInputValue = useDebounce(setInputValue, DEBOUNCE_DELAY);

  const scrollRef = useBottomScrollListener(
    () => fetchNextPage({ cancelRefetch: false }),
    { offset: 100, debounce: 100 }
  );

  const options = useMemo(() => {
    const options = data?.pages.map((page) => page.data).flat() || [];
    return options.filter((option) =>
      products.every((product) => product.code !== option.code)
    );
  }, [data, products]);

  const handleChange = (_event, value) => {
    const nextValue = {
      ...value,
      purchasePrice: 0,
      margin: 25,
      marked: false,
      original: value,
    };
    onChange(nextValue);
  };

  const handleInputChange = (_event, value, reason) =>
    reason === "input" && debounceSetInputValue(value);

  const handleBlur = () => setInputValue("");

  const renderOption = (props, option) => (
    <li {...props} key={option.code} css={css.option}>
      <span key="name" css={css.name}>
        {option.name}
      </span>
      {Boolean(option.related_barcodes) && (
        <span key="barcodes" css={css.barcodes}>
          {"["}
          {option.related_barcodes}
          {"]"}
        </span>
      )}
      <span key="price" css={css.price}>
        {Number(option.price).toFixed(2)}
      </span>
    </li>
  );

  const renderInput = (params) => (
    <TextField
      {...params}
      label="Пошук"
      slotProps={{
        input: {
          ...params.InputProps,
          endAdornment: (
            <>
              {isFetching && <CircularProgress color="inherit" size={20} />}
              {params.InputProps.endAdornment}
            </>
          ),
        },
      }}
    />
  );

  return (
    <Autocomplete
      value={value ?? null}
      options={options}
      loading={isFetching}
      blurOnSelect
      clearOnBlur
      loadingText="Завантаження списку..."
      noOptionsText="Елементи відсутні"
      filterOptions={(options) => options}
      getOptionLabel={(option) => option.name}
      getOptionKey={(option) => option.code}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onBlur={handleBlur}
      slotProps={{
        listbox: {
          ref: (ref) => setListNode((scrollRef.current = ref)),
          role: "list-box",
        },
      }}
      renderOption={renderOption}
      renderInput={renderInput}
    />
  );
}

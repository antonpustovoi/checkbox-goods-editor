import { useMemo, useState } from "react";

import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useDebounce } from "@hooks/useDebounce";
import * as Q from "@queries";

import { useGoodsContext } from "../GoodsContext";

import { ListboxComponent } from "./ListboxComponent";
import { css } from "./css";

const DEFAULT_LIMIT = 25;
const DEBOUNCE_DELAY = 200;

export function SelectProductField() {
  const { data, setData } = useGoodsContext();

  const [inputValue, setInputValue] = useState("");

  const {
    data: goods,
    isFetching,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ["Goods", inputValue, DEFAULT_LIMIT],
    queryFn: Q.getGoods,
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
    const options = goods?.pages.map((page) => page.data).flat() || [];
    return options.filter((option) =>
      data.every((el) => el.code !== option.code)
    );
  }, [goods, data]);

  const handleBottomScroll = () => fetchNextPage({ cancelRefetch: false });

  const handleChange = (_event, value) => {
    const nextValue = {
      ...value,
      price: null,
      purchasePrice: null,
      margin: 25,
      original: value
    };
    setData([...data, nextValue]);
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

import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import * as Q from "../../../../queries";
import { useMemo, useState } from "react";
import { useGoodsContext } from "../GoodsContext";

export function SelectProductField() {
  const [inputValue, setInputValue] = useState("");

  const { data, setData } = useGoodsContext();

  const { data: goods, isFetching } = useQuery({
    queryKey: ["Goods", inputValue],
    queryFn: Q.getGoods,
    initialData: [],
  });

  const options = useMemo(
    () => goods.filter((el) => data.every((option) => option.id !== el.id)),
    [goods, data]
  );

  const handleChange = (_event, value) => {
    const nextValue = {
      ...value,
      price: null,
      purchasePrice: null,
      margin: 25,
      original: value,
    };
    setData([...data, nextValue]);
  };

  const handleInputChange = (_event, value, reason) =>
    reason !== "reset" && setInputValue(value);

  const handleClose = () => setInputValue("");

  const renderOption = (props, option) => (
    <li {...props}>
      {option.name}
      {Boolean(option.related_barcodes) && (
        <span style={{ marginLeft: "auto", color: "#707070" }}>
          {option.related_barcodes}
        </span>
      )}
    </li>
  );

  return (
    <Autocomplete
      value={null}
      inputValue={inputValue}
      options={options}
      loading={isFetching}
      blurOnSelect
      clearOnBlur
      loadingText="Завантаження списку..."
      filterOptions={(options) => options}
      getOptionLabel={(option) => option.name}
      getOptionKey={(option) => option.id}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onClose={handleClose}
      renderOption={renderOption}
      renderInput={(params) => (
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
            ),
          }}
        />
      )}
    />
  );
}

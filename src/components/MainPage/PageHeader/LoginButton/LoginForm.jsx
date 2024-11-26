import { Grid2 as Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";

LoginForm.propTypes = {
  id: PropTypes.string,
  onSubmit: PropTypes.func,
};

export function LoginForm(props) {
  const { id, onSubmit } = props;

  const form = useForm({
    defaultValues: {
      licenseKey: "",
      pinCode: "",
    },
  });

  const renderField = (name, label) => (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => <TextField {...field} fullWidth label={label} />}
    />
  );

  return (
    <form id={id} onSubmit={form.handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={12}>{renderField("licenseKey", "Ключ ліцензії")}</Grid>
        <Grid size={12}>{renderField("pinCode", "ПІН-код касира")}</Grid>
      </Grid>
    </form>
  );
}

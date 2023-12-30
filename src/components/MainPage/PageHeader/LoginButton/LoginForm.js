import { Unstable_Grid2 as Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import PropTypes from "prop-types";

LoginForm.propTypes = {
  id: PropTypes.string,
  onSubmit: PropTypes.func
};

export function LoginForm(props) {
  const { id, onSubmit } = props;

  const formik = useFormik({
    initialValues: {
      licenseKey: "",
      pinCode: ""
    },
    onSubmit
  });

  const renderField = (name, label) => (
    <TextField
      fullWidth
      name={name}
      label={label}
      onChange={formik.handleChange}
      value={formik.values[name]}
    />
  );

  return (
    <form id={id} onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid xs={12}>{renderField("licenseKey", "Ключ ліцензії")}</Grid>
        <Grid xs={12}>{renderField("pinCode", "ПІН-код касира")}</Grid>
      </Grid>
    </form>
  );
}

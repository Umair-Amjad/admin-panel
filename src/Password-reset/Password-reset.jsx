import { useEffect, useRef } from "react";
import { Box, Button, FormHelperText, TextField } from "@mui/material";
import { Formik } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";


const PasswordReset = () => {
    const { id, token } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const itemsRef = useRef([]);

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, 6);
    }, []);

    return (
        <Formik
            initialValues={{
              
                password: "",
                passwordConfirm: "",
                submit: null,
            }}
            validationSchema={Yup.object().shape({
              
                password: Yup.string()
                    .min(7, "Must be at least 7 characters")
                    .max(255)
                    .required("Required"),
                passwordConfirm: Yup.string()
                    .oneOf([Yup.ref("password"), null], "Passwords must match")
                    .required("Required"),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                // console.log(values.password);
                // return;
                try {
                    const data = values.password;
                    // await passwordReset(values.email, values.code.join(''), values.password);
                    const res = await customAxios.postCalls(`register/${id}/${token}`, {
                        data
                    });
                    console.log(res)
                    if (res.status == 201) {
                        toast.success("Password Updated")
                        navigate("/")
                    } else {
                        toast.error("! Token Expired generate new LInk");
                    }
                    // console.log(values);

                } catch (err) {
                    console.error(err);
                    if (mounted.current) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                touched,
                values,
            }) => (
                <form noValidate onSubmit={handleSubmit}>
                   
                    <TextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
                        label="Password"
                        margin="normal"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                        variant="outlined"
                    />
                    <TextField
                        error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
                        fullWidth
                        helperText={touched.passwordConfirm && errors.passwordConfirm}
                        label="Password Confirmation"
                        margin="normal"
                        name="passwordConfirm"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.passwordConfirm}
                        variant="outlined"
                    />
                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box sx={{ mt: 3 }}>
                        <Button
                            color="primary"
                            disabled={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Send
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default PasswordReset;

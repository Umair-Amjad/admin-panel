import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, FormHelperText, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const PasswordRecoveryJwt = () => {
    const navigate = useNavigate();
 const [loading,setloading]=useState(false)
    return (
        <Formik
            initialValues={{
                email: '',
                submit: null
            }}
            validationSchema={Yup
                .object()
                .shape({
                    email: Yup
                        .string()
                        .email('Must be a valid email')
                        .max(255)
                        .required('Email is required')
                })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    console.log(values)
                     const email=values.email

                    const res = await axios.post("http://localhost:5001/forgot-password", {
                        email
                    });
                     console.log("reponses",res)
                     if (res.status == 401) {
                         return toast.error("Invalid User")
                        }
                        setloading(true)
                    return toast.success("Reset Link sent to your email Succefully")
                   
                } catch (err) {
                    console.error(err);
                    console.log("umair",err.AxiosError.response)
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form
                    noValidate
                    onSubmit={handleSubmit}
                >

                    {!loading ? (<>
                        <TextField
                            autoFocus
                            error={Boolean(touched.email && errors.email)}
                            fullWidth
                            helperText={touched.email && errors.email}
                            label="Email Address"
                            margin="normal"
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="email"
                            value={values.email}
                            variant="outlined"
                        />


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
                    </>):"Reset Link send to your Email Thank You"}
                   
                          
                    
                </form>
            )}
        </Formik>
    );
};

export default PasswordRecoveryJwt;

/*eslint-disable*/
import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";

import {
    Box,
    Button,
    FormHelperText,
    TextField,
    Stack,
    Typography
} from "@mui/material";

const TransportForm = ({ setOpen, rows }) => {
    console.log("rows", rows)
    return (
        <Formik
            initialValues={{
                name: rows.name || "",
                email: rows.email || "",
                Phone: rows.Phone || "",
                work: rows.work || "",
                password: rows.passowrd || "",
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().required("Name is required"),
            })}
            onSubmit={async (values) => {
                try {
                    await new Promise((r) => setTimeout(r, 500));
                    const data = { values, id: rows.id ? rows.id : "" }

                    setOpen(false);

                    return console.log(data)
                    customAxios.postCall("tranport/transport", {
                        name: values.name,
                        Phone: values.Phone,
                        email: values.email,
                        work: values.work,
                        password: values.password,
                    })
                        .then((res) => {
                            res.json;
                        })
                        .then((json) => {
                            console.log(json);
                        });
                    setOpen(false);
                } catch (err) {
                    console.log(err);
                }
            }}
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
            }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Typography style={{ fontSize: 20, color: "black" }}>
                        <strong>Add Transport</strong>
                    </Typography>
                    <Stack
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                        spacing={2}
                    >
                        <TextField
                            autoFocus
                            error={Boolean(touched.name && errors.name)}
                            fullWidth
                            helperText={touched.name && errors.name}
                            label="Name"
                            margin="normal"
                            id="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            variant="outlined"
                        />
                        <TextField
                            fullwidth
                            error={Boolean(touched.Phone && errors.Phone)}
                            fullWidth
                            helperText={touched.Phone && errors.Phone}
                            label="Mobile"
                            margin="normal"
                            name="Phone"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="number"
                            value={values.Phone}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(touched.email && errors.email)}
                            // sx={{ width: "50%" }}
                            helperText={touched.email && errors.email}
                            fullWidth
                            id="email"
                            label="Email"
                            margin="normal"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.email}
                            variant="outlined"
                        />{" "}
                        <TextField
                            error={Boolean(touched.work && errors.work)}
                            fullWidth
                            helperText={touched.work && errors.work}
                            label="vehicle"
                            margin="normal"
                            id="work"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.work}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(touched.password && errors.password)}
                            fullWidth
                            helperText={touched.password && errors.password}
                            label="Password"
                            margin="normal"
                            id="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.password}
                            variant="outlined"
                        />
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        <Box sx={{ mt: 2 }}>
                            <Button
                                color="primary"
                                disabled={isSubmitting}
                                sx={{ width: "211px" }}
                                size="large"
                                type="submit"
                                variant="contained"
                            // onClick={edit}
                            >
                                Add Trasport
                            </Button>
                        </Box>
                    </Stack>
                </form>
            )}
        </Formik>
    );
};
export default TransportForm;

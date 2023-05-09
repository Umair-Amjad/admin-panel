import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate ,Navigate} from "react-router-dom";
import { Alert, Box, Button, FormHelperText, IconButton, InputAdornment, TextField } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from "react-toastify";
// import { login } from "../Slices/Login";
// import { clearMessage } from "../Slices/Message";
// import { useDispatch, useSelector } from "react-redux";
const LoginJWT = (props) => {
    // const mounted = useMounted();
    // const { login } = useAuth();
    // const dispatch=useDispatch();
    const navigate = useNavigate();
    const [capsLocks, setCapsLocks] = useState(false);
    const [show, setShow] = useState(false);

    const [loading, setLoading] = useState(false);

    // const { isLoggedIn } = useSelector((state) => state.auth);
    // const { message } = useSelector((state) => state.message);
    const capsLock = (event) => {
        if (event.getModifierState("CapsLock")) {
            setCapsLocks(true);
        } else {
            setCapsLocks(false);
        }
    };


    const handleLogin = (formValue) => {
        // console.log(formValue)
        const { email, password } = formValue;
        setLoading(true);

        // dispatch(login({ email, password }))
           
            // .then((res) => {
            //     console.log(res)
            //     navigate("/table");
            //     window.location.reload();
            // })
            // .catch(() => {
            //     setLoading(false);
            // });
    };

    // if (isLoggedIn) {
    //     console.log(isLoggedIn)
    //     return <Navigate to="/table" />;
    // }

    // useEffect(() => {
    //     dispatch(clearMessage());
    // }, [dispatch]);
    return (
        <Formik
            initialValues={{
                email: "uamjad508@gmail.com",
                password: "umair122!",
                submit: null,
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email("Must be a valid email")
                    .max(255)
                    .required("Email is required"),
                password: Yup.string().max(255).required("Password is required"),
            })}
            onSubmit={(values)=>{
                const { email, password } =values

                return console.log(values)
                // dispatch(login({ email, password }))

                    // .then((res) => {
                    //     console.log(res)
                    //     navigate("/table");
                    //     window.location.reload();
                    // })
                    // .catch(() => {
                    //     setLoading(false);
                    // });
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
                <form noValidate onSubmit={handleSubmit} {...props}>
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
                    <TextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
                        onKeyUp={capsLock}
                        label="Password"
                        margin="normal"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type={show ? "text" : "password"}
                        value={values.password}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShow(!show)}
                                        edge="end"
                                    >
                                        {show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {capsLocks && "CapsLock is On"}
                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                        <Button
                            color="primary"
                            // disabled={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Log In
                        </Button>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Alert severity="info">
                            <div>
                                Use <b>demo@devias.io</b> and password <b>Password123!</b>
                            </div>
                        </Alert>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default LoginJWT;

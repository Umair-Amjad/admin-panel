import React, { useState } from 'react';
import LoginJWT from './JwtLogin';
import { Box, Card, CardContent, Container, Divider, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'
import Logo from '../Icons/Logo';
import AuthBanner from './AuthBanner';


const Login = () => {
    // const { platform } = useAuth();
    let platform = "JWT"


    return (
        <>
            <title>Login | Material Kit Pro</title>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <AuthBanner />
                <Container maxWidth="sm" sx={{ py: "50px" }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 8,
                        }}
                    >
                        <RouterLink to="/">
                            <Logo
                                sx={{
                                    height: 40,
                                    width: 40,
                                }}
                            />
                        </RouterLink>
                    </Box>
                    <Card>
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                p: 4,
                            }}
                        >
                            <Box
                                sx={{
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 3,
                                }}
                            >
                                <div>
                                    <Typography color="textPrimary" gutterBottom variant="h4">
                                        Log in
                                    </Typography>
                                    <Typography color="textSecondary" variant="body2">
                                        Log in on the internal platform
                                    </Typography>
                                </div>
                            </Box>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    mt: 3,
                                }}
                            >

                                {platform === "JWT" && <LoginJWT />}
                            </Box>
                            <Divider sx={{ my: 3 }} />
                            <Link
                                color="textSecondary"
                                component={RouterLink}
                                to="/authentication/register-unguarded"
                                variant="body2"
                            >
                                Create new account
                            </Link>
                            {platform === "JWT" && (
                                <Link
                                    color="textSecondary"
                                    component={RouterLink}
                                    sx={{ mt: 1 }}
                                    to="/reset/password-recovery"
                                    variant="body2"
                                >
                                    Forgot password
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </>
    );
};

export default Login;

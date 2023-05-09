import { useEffect } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import Passwordreset  from '../Password-reset/Password-reset';


const PasswordReset = () => {
 const platform = "JWT"
  const { id, token } = useParams();

  console.log("checking",id, token)
  const navigate = useNavigate();
  const userValid = async () => {
    const res = await fetch(`/recover/reset-password/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("checking res", res)
    if (data.status == 201) {
      console.log("user valid");
    } else {
      navigate("*");
    }
  };
 
  useEffect(() => {
    userValid();
    // setTimeout(() => {
    //   setData(true);
    // }, 3000);
  }, [id]);
  return (
    <>
        <title>Password Reset | Material Kit Pro</title>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="sm" sx={{ py: 10 }}>
          
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 8,
            }}
          />
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
                    Password Reset
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Reset your account password using your code
                  </Typography>
                </div>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3,
                }}
              >
                {platform === "JWT" && <Passwordreset />}
              </Box>
              <Divider sx={{ my: 3 }} />
              {platform === "Amplify" && (
                <Link
                  color="textSecondary"
                  component={RouterLink}
                  to="/authentication/password-recovery"
                  variant="body2"
                >
                  Did you not receive the code?
                </Link>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default PasswordReset;

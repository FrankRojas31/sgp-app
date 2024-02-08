import {
  TextField,
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  Link,
  Box,
  Paper,
  Grid,
  CssBaseline,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import WelcomeIMG from "../assets/WelcomeIMG.png";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Components/dashboard/SideMenu.module.css";
import { useAuthStore } from "../stores/Auth/authStore";

//tema
const theme = createTheme({
  palette: {
    primary: {
      main: "#191C40",
    },
  },
  typography: {
    fontFamily: "Tang SCOSF Bold, Arial, sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// Componente
const LoginPage = () => {
  const navigate = useNavigate();
  const useUser = useAuthStore((state) => state.user);

  useEffect(() => {
    if (useUser) {
      navigate("/dashboard");
    } 
  }, [useUser, navigate]);
  
  
  const useLogin = useAuthStore((state) => state.login);

  const [error, setError] = useState(null);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleInputChange = () => {
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    setUserEmail(email);
    setUserPassword(password);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setError(null);

    if (!email || !password) {
      setError({ message: "Por favor, complete todos los campos." });
      return;
    }

    if (!emailRegex.test(email)) {
      setError({ message: "Ingrese un correo electrónico válido." });
      return;
    }

    try {
      const response = await useLogin(email, password);
      if (response.roles.includes('admin')) {
        navigate("/dashboard");
      } else {
        navigate('/teamread')
      }
    } catch (error) {
      if (error.message === "Credentials are not valid (password)") {
        setError({ message: "Contraseña incorrecta" });
      } else if (
        (error.message === "email must be an email",
        "The password must have a Uppercase, lowercase letter and a number",
        "password must be longer than or equal to 6 characters")
      ) {
        setError({ message: "El correo y contraseña no existen" });
      }
    }
  };

  const LoginFormContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    maxWidth: "100%",
    width: "100%",
  }));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container component="main" sx={{ height: "100vh" }}>
        {/* Sección de imagen */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${WelcomeIMG})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Sección del formulario */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={0}
          square
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoginFormContainer>
            <img
              src="/public/logo.png"
              style={{
                maxWidth: "30%",
                height: "auto",
                marginRight: 3,
              }}
              alt="SGP Logo"
            />
            <Typography
              component="h2"
              variant="h5"
              gutterBottom
              style={{ color: "#191C40", fontWeight: "bold" }}
            >
              Sistema de Gestión de Proyectos
            </Typography>
            {error && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {error.message}
              </Alert>
            )}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                onChange={handleInputChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                onChange={handleInputChange}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <Link
                href="#"
                variant="body2"
                sx={{ display: "block", mt: 1 }}
                onClick={(event) => {
                  event.preventDefault();
                  Swal.fire({
                    title: "Recuperación de cuenta",
                    text: "Favor de comunicarse con el administrador para la recuperación de su cuenta.",
                    icon: "info",
                    confirmButtonText: "Entendido",
                  });
                }}
              >
                ¿Olvidaste la contraseña?
              </Link> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar sesión
              </Button>
              {/* <Button type="button" fullWidth variant="text" sx={{ mb: 2 }}>
                Crear cuenta
              </Button> */}
            </Box>
          </LoginFormContainer>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;

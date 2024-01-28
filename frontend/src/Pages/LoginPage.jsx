import React from 'react';
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
  CssBaseline
} from '@mui/material';
import { styled } from '@mui/system';
import WelcomeIMG from './assets/WelcomeIMG.png';

//tema
const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7',
    },
  },
  typography: {
    fontFamily: 'Tang SCOSF Bold, Arial, sans-serif', 
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
  const LoginFormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    maxWidth: '100%',
    width: '100%', 
  }));

  return (
    <ThemeProvider theme={theme}>
       <CssBaseline />
      <Grid container component="main" sx={{ height: '100vh' }}>
        {/* Sección de imagen */}
        <Grid item xs={false} sm={4} md={7} sx={{
          backgroundImage: `url(${WelcomeIMG})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        {/* Sección del formulario */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square sx={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
        }}>
          <LoginFormContainer>
            <Typography component="h2" variant="h5" gutterBottom style={{ color: '#673ab7' }}>
              Inicia sesión
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="usuario"
                label="Usuario"
                name="usuario"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="contraseña"
                label="Contraseña"
                type="password"
                id="contraseña"
                autoComplete="current-password"
              />
              <Link href="#" variant="body2" sx={{ display: 'block', mt: 1 }}>
                ¿Olvidaste la contraseña?
              </Link>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                INGRESAR
              </Button>
              <Button
                type="button"
                fullWidth
                variant="text"
                sx={{ mb: 2 }}
              >
                Crear cuenta
              </Button>
            </Box>
          </LoginFormContainer>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;
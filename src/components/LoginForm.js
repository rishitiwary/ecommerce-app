//login form with formik
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../auth/firebaseAuth';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const LoginForm = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await login(values.email, values.password);
        alert('Login successful!');
        navigate('/admin'); // Redirect to /admin page after successful login
      } catch (error) {
        alert(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default LoginForm;

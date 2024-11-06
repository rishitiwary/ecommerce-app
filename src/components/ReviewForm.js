import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../auth/firebaseConfig';
import { Box, Button, TextField, Typography, Rating, Snackbar, CircularProgress } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ReviewForm = ({ productId }) => {
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const formik = useFormik({
    initialValues: { rating: 5, comment: '' },
    validationSchema: Yup.object({
      rating: Yup.number().min(1).max(5).required('Required'),
      comment: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true); // Start loading
      try {
     const res=   await addDoc(collection(db, 'reviews'), {
          productId,
          rating: values.rating,
          comment: values.comment,
        });
        console.log("res",res);
        setMessage('Review submitted!');
        setSeverity('success');
        setOpenSnackbar(true); // Show success message
        resetForm();
      } catch (error) {
        setMessage(`Error: ${error.message}`);
        setSeverity('error');
        setOpenSnackbar(true); // Show error message
      } finally {
        setLoading(false); // Stop loading
      }
    },
  });

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Leave a Review
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="center">
        <Rating
          name="rating"
          value={formik.values.rating}
          onChange={(event, newValue) => formik.setFieldValue('rating', newValue)}
          precision={1}
        />
      </Box>

      <TextField
        label="Comment"
        variant="outlined"
        multiline
        rows={4}
        {...formik.getFieldProps('comment')}
        error={formik.touched.comment && Boolean(formik.errors.comment)}
        helperText={formik.touched.comment && formik.errors.comment}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading} // Disable button while loading
      >
        {loading ? <CircularProgress size={24} /> : 'Submit Review'}
      </Button>

      {/* Snackbar for feedback messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReviewForm;

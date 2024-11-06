import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import { useCartActions } from '../recoil/cartState';
import { toast } from 'react-toastify'; // Import toast
import ReviewForm from './ReviewForm';

const ProductCard = ({ product }) => {
  const { addToCart } = useCartActions();

  const handleAddToCart = () => {
    addToCart(product);  // Add the product to the cart
    toast.success(`${product.title} added to cart!`, { // Show success toast
      position: "top-right", // Position of the toast
      autoClose: 3000, // Duration for which the toast will be visible
      hideProgressBar: true, // Hide the progress bar
      closeOnClick: true, // Close toast when clicked
      pauseOnHover: true, // Pause when hovering over toast
    });
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 3,
        borderRadius: 2,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="120"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      />
      <CardContent>
        <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', mb: 1 }}>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Category: {product.category}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          ${product.price}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            borderRadius: 2,
            '&:hover': {
              backgroundColor: '#006bb3',
            },
          }}
          onClick={handleAddToCart}  // Handle click event to show toast
        >
          Add to Cart
        </Button>
        {/* <ReviewForm productId={product.id}/> */}
      </CardContent>
    </Card>
  );
};

export default ProductCard;

import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState, cartTotalSelector } from '../recoil/cartState';
import { motion } from 'framer-motion';
import { Card, CardContent, Button, Typography, Box, Divider, IconButton } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const total = useRecoilValue(cartTotalSelector);

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      )
    );
  };

  return (
    <motion.div initial={{ x: 100 }} animate={{ x: 0 }} className="cart">
      <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Your Cart
        </Typography>
        
        {cart.length === 0 ? (
          <Typography variant="h6" align="center" color="text.secondary">
            Your cart is empty.
          </Typography>
        ) : (
          cart.map((item) => (
            <Card key={item.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 3, padding: 1 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: 'cover',
                        borderRadius: '4px',
                        marginRight: 16,
                      }}
                    />
                    <Typography variant="h6" fontSize={16} >
                      {item.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1">${item.price} x {item.quantity}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center">
                  <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => updateQuantity(item.id, 1)}
                      sx={{ mr: 1, minWidth: 36, height: 36, padding: 0, borderRadius: '50%' }}
                    >
                      <Add sx={{ fontSize: 18 }} />
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                      sx={{ minWidth: 36, height: 36, padding: 0, borderRadius: '50%' }}
                    >
                      <Remove sx={{ fontSize: 18 }} />
                    </Button>
                  </Box>
                  <IconButton
                    onClick={() => removeItem(item.id)}
                    color="error"
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
              <Divider sx={{ mb: 1 }} />
            </Card>
          ))
        )}

        <Box sx={{ textAlign: 'right', mt: 3 }}>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
            Total: ${total}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={cart.length === 0}
            size="large"
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Cart;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, Grid, IconButton } from '@mui/material';
import { RemoveCircleOutline, AddCircleOutline, DeleteOutline } from '@mui/icons-material';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    dispatch(updateQuantity({ productId, quantity: item.quantity + 1 }));
  };

  const handleDecreaseQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item.quantity > 1) {
      dispatch(updateQuantity({ productId, quantity: item.quantity - 1 }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleCheckout = () => {
    navigate('/checkout');
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cartItems.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Box display="flex" alignItems="center">
                  <img src={item.images[0]} alt={item.name} style={{ height: 80, marginRight: 16 }} />
                  <Box flexGrow={1}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body1">${item.price}</Typography>
                    <Box display="flex" alignItems="center">
                      <IconButton onClick={() => handleDecreaseQuantity(item.id)}>
                        <RemoveCircleOutline />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton onClick={() => handleIncreaseQuantity(item.id)}>
                        <AddCircleOutline />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant="body1">${(item.price * item.quantity).toFixed(2)}</Typography>
                  <IconButton onClick={() => handleRemoveItem(item.id)}>
                    <DeleteOutline />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box marginTop={2}>
            <Typography variant="h5">Total: ${totalPrice.toFixed(2)}</Typography>
          </Box>
          <Box marginTop={2}>
            <Button variant="contained" color="primary" onClick={handleClearCart}>
              Clear Cart
            </Button>
            <Button variant="contained" color="secondary" style={{ marginLeft: 16 }} onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartPage;

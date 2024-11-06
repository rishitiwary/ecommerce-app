import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../auth/firebaseAuth";
import { useRecoilValue } from "recoil";
import { cartState } from "../recoil/cartState"; // Assuming cartState is defined in recoil/cartState
import { AppBar, Toolbar, Button, Typography, Box, Badge } from "@mui/material";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  // Get the cart items from the recoil state
  const cart = useRecoilValue(cartState);

  // Count unique items in the cart
  const uniqueItemsInCart = new Set(cart.map(item => item.id)).size;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
          </Typography>
        </Box>
        
        {/* Cart Button with Unique Item Count */}
        <Button color="inherit" component={Link} to="/cart">
          <Badge badgeContent={uniqueItemsInCart} color="secondary">
            Cart
          </Badge>
        </Button>
        
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/admin">
              Admin Dashboard
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

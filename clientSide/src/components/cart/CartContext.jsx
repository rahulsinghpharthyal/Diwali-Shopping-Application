import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../navbar/UserProvider';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const {user} = useUser();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Function to fetch cart data from API and update state
  const fetchCartDataFromAPI = async () => {
    try {
      const response = await axios.get('http://localhost:3002/cart'); // Adjust URL as per your API endpoint
      setCart(response.data.cart); // Assuming response.data.cart is an array of items
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  // Function to fetch wishlist data from API and update state
  const fetchWishlistDataFromAPI = async () => {
    try {
      const response = await axios.get('http://localhost:3002/wishlist');
      // Adjust URL as per your API endpoint
      setWishlist(response.data.wishlist); // Assuming response.data.wishlist is an array of items
    } catch (error) {
      console.error('Error fetching wishlist data:', error);
    }
  };
  
  const fetchCartlistDataFromAPI = async () => {
    try {
      const response = await axios.get('http://localhost:3002/addtocart');
      // Adjust URL as per your API endpoint
      setCart(response.data.cart); // Assuming response.data.wishlist is an array of items
    } catch (error) {
      console.error('Error fetching wishlist data:', error);
    }
  };

  const addToCart = (product) => {
    console.log('this is from cart product', product)
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = async (id) => {
    if(user){
      try {
        console.log('this is id', id);
        console.log('this is user', user)
        // Make a DELETE request to the backend to remove the item
        const response = await axios.delete('http://localhost:3002/addtocart', {
          data: { userId: user._id, itemId: id }
        });
        console.log('this is response', response)
        // Update the cart state in the frontend
        // removeFromCart(_id);
        setCart((prevCart) => prevCart.filter((item) => item._id !== id));
      } catch (error) {
        console.error(error);
      }
    };
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

 const removeFromWishlist = async (id) => {
  try {
    console.log('this is id', id);
    // Make a DELETE request to the backend to remove the item
    const response = await axios.delete('http://localhost:3002/wishlist', {
      data: { userId: user._id, itemId: id }
    });
    console.log('this is response', response);
    
    // Update the wishlist state in the frontend
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== id));
  } catch (error) {
    console.error(error);
  }
};

  const clearWishlist = () => {
    setWishlist([]);
  };

  const wishlistCount = () => {
    return wishlist.length;
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        wishlistCount,
        clearWishlist,
        fetchCartDataFromAPI,
        fetchWishlistDataFromAPI,
        fetchCartlistDataFromAPI,
        setWishlist,
        setCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

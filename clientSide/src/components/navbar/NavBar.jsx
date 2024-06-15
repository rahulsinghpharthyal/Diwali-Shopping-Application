import React, { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import SearchComponent from './SearchComponent';
import { Badge } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../cart/CartContext';
import { useUser } from './UserProvider';
import axios from 'axios';

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isSellerClicked, setIsSellerClicked] = useState(false);
  const navigate = useNavigate();
  const { cart, wishlist, clearCart, clearWishlist, setWishlist, setCart } = useCart();
  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchWishlistCount = async () => {
      if (user) {
        try {
          const wishListData = await axios.get('http://localhost:3002/wishlist', {
            params: {
              userId: user._id,
            },
          });
          const cartData = await axios.get('http://localhost:3002/addtocart', {
            params: {
              userId: user._id,
            },
          });

          setCart(cartData.data.cart || []);
          setWishlist(wishListData.data.wishlist || []);
        } catch (error) {
          setCart([]);
          setWishlist([]);
        }
      } else {
        setCart([]);
        setWishlist([]);
      }
    };

    fetchWishlistCount();
  }, [user, setCart, setWishlist]);

  const handleLogout = async () => {
    setUser(null);
    clearCart();
    clearWishlist();
    navigate('/');
  };


  const handleLoginClick = () => {
    setIsLoginClicked(true);
    setIsSellerClicked(false);
    navigate('/login');
    console.log('login click', isLoginClicked)
  };

  const handleSellerClick = () => {
    setIsSellerClicked(true);
    setIsLoginClicked(false);
    navigate('/login');
    console.log('become a seeller click', isSellerClicked )

  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="text-2xl font-bold text-black">
            <span className="text-black">D</span>iwali <span className="text-black">s</span>hopping.
          </div>
          <div className="hidden md:flex space-x-6">
            <ul className="flex space-x-6">
              <li className="text-black hover:text-red-500 cursor-pointer text-lg" onClick={() => navigate('/')}>Home</li>
              <li className="text-black hover:text-red-500 cursor-pointer text-lg" onClick={() => navigate('/shop')}>Shop</li>
              <li
                className="text-black hover:text-red-500 relative cursor-pointer text-lg"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                Pages
                {dropdownOpen && (
                  <div className="absolute left-0 mt-0 w-40 bg-black border border-blue-500 shadow-lg z-50">
                    <ul className="py-1">
                      <li className='cursor-pointer block px-4 py-2 text-white' onClick={() => navigate('/about')}>About Us</li>
                      <li className='cursor-pointer block px-4 py-2 text-white' onClick={() => navigate('/shop')}>Shop Details</li>
                      <li className='cursor-pointer block px-4 py-2 text-white' onClick={() => navigate('/cart')}>Shopping Cart</li>
                      <li className='cursor-pointer block px-4 py-2 text-white' onClick={() => navigate('/checkout')}>Check Out</li>
                    </ul>
                  </div>
                )}
              </li>
              <li className="text-black hover:text-red-500 cursor-pointer text-lg" onClick={() => navigate('/contactus')}>Contacts</li>
            </ul>
          </div>
          <div className="flex space-x-4 items-center">
            <IoIosSearch className='w-6 h-6 cursor-pointer' onClick={() => setSearchOpen(true)} />
            <Badge badgeContent={wishlist.length} color="primary">
              <FcLike className='w-6 h-6 cursor-pointer' onClick={() => navigate('/wishlist')} />
            </Badge>
            <Badge badgeContent={cart.length} color="primary">
              <AddShoppingCartIcon className='cursor-pointer' onClick={() => navigate('/cart')} />
            </Badge>
            {user?._id ? (
              <>
                <span className="hidden md:inline text-black">{user?.name}</span>
                <button className='bg-red-500 w-24 h-10 rounded-lg text-white text-sm hidden md:inline' onClick={handleLogout}>Log Out</button>
                <button className='bg-blue-500 w-24 h-10 rounded-lg text-white text-sm hidden md:inline' onClick={handleSellerClick}>Become a Seller</button>
              </>
            ) : (
              <button className='bg-blue-500 w-24 h-10 rounded-lg text-white text-lg hidden md:inline' onClick={handleLoginClick}>Log In</button>
            )}
          </div>
        </div>
      </nav>

      <div className="md:hidden bg-white shadow-md">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <button className="text-black" onClick={() => setDropdownOpen(!dropdownOpen)}>
            ☰
          </button>
        </div>
        {dropdownOpen && (
          <div className="bg-white border-t border-gray-200 shadow-lg z-50">
            <ul className="flex flex-col space-y-2 py-2 px-4">
              <li className="text-black hover:text-red-500 cursor-pointer text-lg" onClick={() => { navigate('/'); setDropdownOpen(false); }}>Home</li>
              <li className="text-black hover:text-red-500 cursor-pointer text-lg" onClick={() => { navigate('/shop'); setDropdownOpen(false); }}>Shop</li>
              <li className="text-black hover:text-red-500 cursor-pointer text-lg" onClick={() => { navigate('/about'); setDropdownOpen(false); }}>About Us</li>
              <li className="text-black hover:text-red-500 cursor-pointer text-lg" onClick={() => { navigate('/shop'); setDropdownOpen(false); }}>Shop Details</li>
              <li className="text-black hover:text-red-500 cursor-pointer text-lg" onClick={() => { navigate('/cart'); setDropdownOpen(false); }}>Shopping Cart</li>
              <li className="text-black hover:text-red-500 cursor-pointer text-lg" onClick={() => { navigate('/checkout'); setDropdownOpen(false); }}>Check Out</li>
              <li className="text-black hover:text-red-500 cursor-pointer text-lg" onClick={() => { navigate('/contactus'); setDropdownOpen(false); }}>Contacts</li>
              <div className="flex flex-col space-y-2 py-2">
                {user?._id ? (
                  <>
                    <span className="text-black">{user?.name}</span>
                    <button className='bg-red-500 w-24 h-10 rounded-lg text-white text-sm' onClick={() => { handleLogout(); setDropdownOpen(false); }}>Log Out</button>
                    <button className='bg-blue-500 w-24 h-10 rounded-lg text-white text-sm' onClick={() => { handleSellerClick(); setDropdownOpen(false); }}>Become a Seller</button>
                  </>
                ) : (
                  <button className='bg-blue-500 w-24 h-10 rounded-lg text-white text-lg' onClick={() => { handleLoginClick(); setDropdownOpen(false); }}>Log In</button>
                )}
              </div>
            </ul>
          </div>
        )}
      </div>

      {searchOpen && <SearchComponent setSearchOpen={setSearchOpen} />}
    </>
  );
}

export default NavBar;

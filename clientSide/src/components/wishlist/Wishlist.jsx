import React from 'react';
import { useCart } from '../cart/CartContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, wishlistCount, clearWishlist} = useCart();
  console.log('this is is fetchwishlist-->', wishlist)
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      <p className="text-gray-600 mb-4">Total items in wishlist: {wishlistCount}</p>
      <button 
        className="bg-red-500 text-white text-xs uppercase px-2 py-1 rounded-lg mb-4"
        onClick={clearWishlist}
      >
        Clear Wishlist
      </button>
      {wishlistCount === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item, index) => (
            <div key={index} className="border border-gray-300 rounded-lg overflow-hidden relative">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover object-center" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-gray-600 mb-2">{item.price}</p>
                <button 
                  className="bg-red-500 text-white text-xs uppercase px-2 py-1 rounded-lg"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

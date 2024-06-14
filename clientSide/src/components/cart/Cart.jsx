    import React, { useState } from 'react';
    import { useCart } from '../cart/CartContext';
    import { useNavigate } from 'react-router-dom';
    import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
    import { useDispatch } from 'react-redux';
    import { actionCreators } from '../../state/index';
    import { useUser } from '../navbar/UserProvider';

    const Cart = () => {
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const {user} = useUser(); 
      const { cart, removeFromCart } = useCart();

      console.log('this is cart', cart)
      // const handleRemoveItem = async (_id) => {
      //   if(user){
      //     try {
      //       console.log('this is id', _id);
      //       // Make a DELETE request to the backend to remove the item
      //       const response = await axios.delete('http://localhost:3002/addtocart', {
      //         data: { userId: user._id, itemId: _id }
      //       });
      //       console.log('this is response', response)
      //       // Update the cart state in the frontend
      //       removeFromCart(_id);
      //     } catch (error) {
      //       console.error(error);
      //     }
      //   };
      // }

      const [quantities, setQuantities] = useState({});

      const addItems = (productId) => {
        setQuantities((prevQuantities) => {
          const newQuantity = (prevQuantities[productId] || 1) + 1;
          return {
            ...prevQuantities,
            [productId]: newQuantity > 20 ? 20 : newQuantity,
          };
        });
      };

      const removeItems = (productId) => {
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [productId]: Math.max((prevQuantities[productId] || 1) - 1, 1),
        }));
      };

      // Calculate total of all items in the cart
      const total = cart.reduce((acc, product) => {
        const quantity = quantities[product.id] || 1;
        return acc + product.price * quantity;
      }, 0);

      // Calculate total number of items in the cart
      const totalItems = cart.reduce((acc, product) => {
        const quantity = quantities[product.id] || 1;
        return acc + quantity;
      }, 0);

      const buyNow = () => {
        navigate('/checkout', { state: { totalItems, total } });
        dispatch(actionCreators.totalAmount);
      };

      return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl w-full space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-gray-900">Your Cart</h2>
            </div>
            {cart.length === 0 ? (
              <div className="text-center mt-6">
                <h3 className="text-2xl text-gray-700">Your Cart is Empty Now</h3>
                <button
                  className="bg-blue-500 text-white w-48 h-12 rounded-lg mt-6 hover:bg-blue-600"
                  onClick={() => navigate('/shop')}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className='flex justify-between items-center bg-gray-200 p-4 rounded-lg'>
                  <h2 className='text-xl font-semibold'>Product</h2>
                  <h2 className='text-xl font-semibold'>Quantity</h2>
                  <h2 className='text-xl font-semibold'>Total</h2>
                </div>
                {cart.map((product) => {
                  const quantity = quantities[product.id] || 1;
                  const totalPerItem = product.price * quantity;
                  return (
                    <div key={product.id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded-lg" />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{product.title}</h3>
                          <span className="text-gray-700">{product.price}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <FaArrowLeft
                          onClick={() => removeItems(product.id)}
                          className="cursor-pointer text-gray-500 hover:text-gray-700"
                        />
                        <p className="text-lg font-bold">{quantity}</p>
                        <FaArrowRight
                          onClick={() => addItems(product.id)}
                          className="cursor-pointer text-gray-500 hover:text-gray-700"
                        />
                      </div>  
                      <div className="flex flex-col items-center">
                        <p className="text-lg font-bold">{totalPerItem}</p>
                        <button
                          onClick={() => removeFromCart(product._id)}
                          className="text-red-500 hover:text-red-700 mt-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-between items-center mt-4">
                  <p className="text-xl font-semibold">Total Items: {totalItems}</p>
                  <p className="text-xl font-semibold">Total Price: {total}</p>
                </div>
                <div className='flex flex-row justify-between'>
                  <button
                    className="bg-blue-500 text-white w-48 h-12 rounded-lg mt-6 hover:bg-blue-600 mb-4"
                    onClick={() => navigate('/shop')}
                  >
                    Continue Shopping
                  </button>
                  <button
                    className="bg-red-500 text-white w-48 h-12 rounded-lg mt-6"
                    onClick={buyNow}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };

    export default Cart;
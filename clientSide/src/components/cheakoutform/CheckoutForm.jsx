import React, { useState } from "react";
import { useCart } from '../cart/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from "react-router-dom";
import { useUser } from "../navbar/UserProvider";
import axios from "axios";

const CheckoutForm = () => {
  const location = useLocation();
  const { total, totalItems } = location.state || { total: 0, totalItems: 0 };
  const { cart } = useCart();
  const { user } = useUser();

  console.log('this is user', user);
  console.log('this is cart',cart)
  const {name, email, _id} = user;
  const [formData, setFormData] = useState({
    id: _id,
    name: name,
    country: "India",
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: email
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const makePayment = async () => {
    try {
      const stripe = await loadStripe("pk_test_51POuOeP3sgwHNtEnYNUF4QtNAnMbwgYMM5xGNKp5azf8BEK3G25xVP5RyVQbT2ld6Wx2NLohxFOZR9LzxK8ydaBb005zdaKWgO");

      const body = {
        products: cart,
        total,
        totalItems,
        customerDetails: formData
      };
      console.log('this is a body', body)
      const headers = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user?.token}`
      };

     
    const response = await axios.post('http://localhost:3002/checkout', body, { headers });

    const session = response.data;
    console.log('this is session--->', session);

      const saveOrderResponse = await axios.post('http://localhost:3002/save-order', body);

      if (saveOrderResponse.status !== 200){
        console.error('Failed to save order:', saveOrderResponse.status, saveOrderResponse.statusText);
        return;
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });
      if (result.error) {
        console.log(`this is error--->`, result.error);
      }
    } catch (error) {
      console.error('Error making payment:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div className="w-full">
            <h2 className="text-2xl font-semibold">Billing Details</h2>
            <form className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" name="firstName" value={formData.name} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div> */}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input type="text" name="country" value={formData.country} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Town/City</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country/State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Postcode / ZIP</label>
                  <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
              </div>
            </form>
          </div>
          <div className="w-full max-w-sm bg-gray-50 shadow-md rounded-lg p-6 ml-10">
            <h2 className="text-2xl font-semibold">Your Order</h2>
            <ul className="mt-4 space-y-2">
              {cart.map((value, index) => (
                <li className="flex justify-between" key={index}>
                  <span>{value.title}</span>
                  <span>{value.price}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>{total}</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <input type="radio" name="payment" className="mr-2" />
                <label>Check Payment</label>
              </div>
              <div className="flex items-center">
                <input type="radio" name="payment" className="mr-2" />
                <label>Paypal</label>
              </div>
            </div>
            <button className="mt-4 w-full bg-black text-white p-2 rounded-md" onClick={makePayment}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;

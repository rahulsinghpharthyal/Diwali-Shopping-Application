import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h2>
        <p className="text-gray-700 mb-6">
          Your transaction was not completed. If you encountered an issue, please try again or contact support.
        </p>
        <div className="flex justify-center space-x-4">
          <p className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200" onClick={()=>navigate('/')}>
            Go to Home
          </p>
          <p className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition duration-200" onClick={navigate('/checkout')}>
            Retry Payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;

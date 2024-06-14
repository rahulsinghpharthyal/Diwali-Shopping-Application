import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext,  useUser } from '../navbar/UserProvider';


const Sidebar = () => {
const navigate = useNavigate();
const { adminuser } = useContext(UserContext);
const { user } = useUser();
// console.log('this is adminuser-->', adminuser);
// console.log('this is user-->', user);

  const [isKidsDropdownOpen, setIsKidsDropdownOpen] = useState(false);

  const toggleKidsDropdown = () => {
    setIsKidsDropdownOpen(!isKidsDropdownOpen);
  };

  return (
    <div className="w-1/4 p-4 border-r">
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-8">
        <h3 className="font-bold mb-2">Categories</h3>
        <ul>
          <li className="my-2">
            <a className="text-gray-700 hover:text-gray-900 cursor-pointer" onClick={()=> navigate('/shop/man')}>Men</a>
          </li>
          <li className="my-2">
            <a className="text-gray-700 hover:text-gray-900 cursor-pointer" onClick={()=> navigate('/shop/woman')}>Women</a>
          </li>
          <li className="my-2">
            <div onClick={toggleKidsDropdown} className="cursor-pointer text-gray-700 hover:text-gray-900 flex justify-between items-center">
              <span>Kids</span>
              <svg className={`w-4 h-4 transition-transform ${isKidsDropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            {isKidsDropdownOpen && (
              <ul className="ml-4 mt-2">
                <li className="my-2">
                  <a  className="text-gray-700 hover:text-gray-900 cursor-pointer" onClick={()=> navigate('/shop/boy')}>Boys</a>
                </li>
                <li className="my-2">
                  <a className="text-gray-700 hover:text-gray-900 cursor-pointer" onClick={()=> navigate('/shop/girl')}>Girls</a>
                </li>
              </ul>
            )}
          </li>
          {adminuser?.role === user?.userRole && (
            <li className="my-2">
              <a className="text-gray-700 hover:text-gray-900 cursor-pointer" onClick={()=> navigate('/shop/seller')}>Seller</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

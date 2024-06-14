import React from 'react';
import ProductListing from './ProductListing';
import { mans } from '../constantdata/manData';
import Sidebar from './Sidebar';
import useFetchProducts from '../../hooks/fetchProductHook';

const Man = () => {
  const { data, loading, error } = useFetchProducts('http://localhost:3002/girls');
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <div className='flex flex-row'>
        <Sidebar/>
        <ProductListing mans={data.men}/>
      </div>
    </>
  )
}

export default Man;
import React from 'react';
import ProductListing from '../ProductListing';
import Sidebar from '../Sidebar';
import useFetchProducts from '../../../hooks/fetchProductHook';

const Girls = () => {
  const { data, loading, error } = useFetchProducts('http://localhost:3002/girls');
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <div className='flex flex-row'>
        <Sidebar/>
        <ProductListing girls={data.girls}/>
      </div>
    </>
  )
}

export default Girls;
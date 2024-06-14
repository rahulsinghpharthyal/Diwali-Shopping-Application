import React from 'react';
import ProductListing from './ProductListing';
import { woman } from '../constantdata/womanData';
import Sidebar from './Sidebar';

const Woman = () => {
  return (
    <>
      <div className='flex flex-row'>
        <Sidebar/>
        <ProductListing woman={woman}/>
      </div>
    </>
  )
}

export default Woman;
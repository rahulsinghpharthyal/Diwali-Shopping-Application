import React from 'react';
import ProductListing from '../ProductListing';
import { boys } from '../../constantdata/boyData';
import Sidebar from '../Sidebar';

const Boy = () => {
  return (
    <>
      <div className='flex flex-row'>
        <Sidebar/>
        <ProductListing boys={boys}/>
      </div>
    </>
  )
}

export default Boy;
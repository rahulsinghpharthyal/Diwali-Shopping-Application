import React from 'react';
import Product from './Product';


const ProductListing = ({products, girls, mans, boys, woman}) => {
  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-4xl font-bold text-center mb-8">Product Listing</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products &&
           products?.map((product, index) => (
          <Product
            key={index}
            title={product.title}
            price={product.price}
            image={product.image}
            sale={product.sale}
            rating={product.rating}
          />
        ))}
        {girls &&
           girls.map((product, index) => (
          <Product
            key={index}
            id={product._id}
            title={product.title}
            price={product.price}
            image={product.image}
            sale={product.sale}
            rating={product.rating}
           
          />
        ))}
        {mans &&
           mans.map((product, index) => (
          <Product
            key={index}
            id={product._id}
            title={product.title}
            price={product.price}
            image={product.image}
            sale={product.sale}
            rating={product.rating}
           
          />
        ))}
        {woman &&
           woman.map((product, index) => (
          <Product
            key={index}
            title={product.title}
            price={product.price}
            image={product.image}
            sale={product.sale}
            rating={product.rating}
           
          />
        ))}
        {boys &&
           boys.map((product, index) => (
          <Product
            key={index}
            title={product.title}
            price={product.price}
            image={product.image}
            sale={product.sale}
            rating={product.rating}
           
          />
        ))}
      </div>
    </div>
  );  
};

// export default ProductListing;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Product from './Product';

// const ProductListing = ({products}) => {
//   // const [products, setProducts] = useState([]);

//   // useEffect(() => {
//   //   const fetchProducts = async () => {
//   //     try {
//   //       const response = await axios.get('http://localhost:3002/girls'); // Replace with your backend API endpoint
//   //       setProducts(response.data); // Assuming your backend returns an array of products
//   //     } catch (error) {
//   //       console.error('Error fetching products:', error);
//   //     }
//   //   };

//   //   fetchProducts();
//   // }, []);
// // console.log('this is products', products);
//   return (
//     <div className="container mx-auto p-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products &&
//         products?.map((product, index) => (
//           <Product
//             key={index}
//             title={product.title}
//             price={product.price}
//             image={product.image}
//             sale={product.sale}
//             rating={product.rating}
//           />
//         ))}
//         {products &&
//         products?.men?.map((product, index) => (
//           <Product
//             key={index}
//             title={product.title}
//             price={product.price}
//             image={product.image}
//             sale={product.sale}
//             rating={product.rating}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

export default ProductListing;


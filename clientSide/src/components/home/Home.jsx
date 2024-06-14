import React from 'react';
import Carousel from '../home/Carousel';
import CollectionsGrid from './CollectionsGrid';
import CarouselSecond from './CarouselSecond';
import banner1 from '../../assets/Cracker_Assets/Hero-image.jpg';
import banner2 from '../../assets/Cracker_Assets/price-List.jpg';

const Home = () => {
  const images = [
    banner1,
    banner2,
  ];

  return (
    <>
      <div className="container mx-auto p-4">
        <Carousel />
        <CollectionsGrid />
        <CarouselSecond images={images} />
      </div>
    </>
  );
};

export default Home;

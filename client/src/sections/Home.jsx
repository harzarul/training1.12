import React, { useState, useEffect} from 'react';
import { Card, FormField, Loader } from "../components";

const Home = () => {
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-white text-[32px]'>
          The Community Showcase
        </h1>
        <p className='mt-2 text-yellow text-[14px] max-w-[500px]'>
          Browse through a collection of image
        </p>
      </div>
    </section>
  )
}

export default Home
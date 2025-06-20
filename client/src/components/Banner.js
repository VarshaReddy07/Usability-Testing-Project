import React from 'react';
import { HiArrowRight, HiArrowLeft } from 'react-icons/hi';

const Banner = () => {
  const data = [
    'https://i.ibb.co/SRk3wGK/banner1exp-1.png',
    'https://amazonproone.vercel.app/static/media/img5.aa945e25375bfdee385f.jpg',
    'https://amazonproone.vercel.app/static/media/img3.c80809bb40bee5c34372.jpg',
    'https://amazonproone.vercel.app/static/media/img1.efb3d39101f7ef77d616.jpg',
  ];

  return (
    <div className="w-full h-auto overflow-x-hidden">
      <div className="w-screen h-[650px] relative">
        <img
          className="w-screen h-full object-cover"
          src={data[0]}
          alt="Banner Image"
          loading="priority"
        />
        <div className="absolute w-fit left-0 right-0 mx-auto flex gap-8 bottom-44">
          {/* Navigation buttons can be added if needed */}
        </div>
      </div>
    </div>
  );
};

export default Banner;

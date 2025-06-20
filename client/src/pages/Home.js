import React, { useEffect, useState } from 'react';
import Banner from "../components/Banner";
import Products from '../components/Products';
import { useLoaderData } from 'react-router';

const Home = () => {
  const [products, setProducts] = useState([]);
  const data = useLoaderData();

  useEffect(() => {
    setProducts(data.data);
  }, [data]);

  return (
    <div>
      <Banner/>
      <Products
        products={products}
        title="For every season"
        description="Here at Everest Clothing, we value the ability to wear all of your favorite clothing, all of the time. Our goal is to provide stylish clothing that can be worn anywhere, any time - without sacrificing your favorite looks."
      />
    </div>
  );
};

export default Home;

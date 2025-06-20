import React, { useEffect, useState } from 'react';
import Products from '../components/Products';
import { useLoaderData } from 'react-router';

const Men = () => {
  const [products, setProducts] = useState([]);
  const data = useLoaderData();

  useEffect(() => {
    const menProducts = data.data.filter(product => product.category === 'men');
    setProducts(menProducts);
  }, [data]);

  return (
    <div>
      <Products
        products={products}
        title="Men's Collection"
        description="Discover the latest trends in men's fashion at Everest Clothing. From casual wear to formal attire, we have a wide range of stylish options to suit every occasion."
      />
    </div>
  );
};

export default Men;

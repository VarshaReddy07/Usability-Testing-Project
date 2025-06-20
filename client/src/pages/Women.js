import React, { useEffect, useState } from 'react';
import Products from '../components/Products';
import { useLoaderData } from 'react-router';

const Women = () => {
  const [products, setProducts] = useState([]);
  const data = useLoaderData();

  useEffect(() => {
    // Filter products with category 'women'
    const womenProducts = data.data.filter(product => product.category === 'women');
    setProducts(womenProducts);
  }, [data]);

  return (
    <div>
      <Products
        products={products}
        title="Women's Collection"
        description="Explore the latest trends in women's fashion at Everest Clothing. From elegant dresses to casual wear, we offer a diverse selection to complement your style for every occasion."
      />
    </div>
  );
};

export default Women;

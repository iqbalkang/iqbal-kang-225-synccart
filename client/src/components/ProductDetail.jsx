import React from 'react';
import Rating from './Rating';

const ProductDetail = ({ product }) => {
  const { product_id: id, image, price, rating, description, name, num_reviews: numReviews } = product;

  return (
    <article className='grid xl:grid-cols-2 gap-8 items-center'>
      <img src={image} alt={name} className='h-80 mx-auto' />

      <div className='mt-4'>
        <h3 className='mb-2 text-3xl'>{name}</h3>

        <div className='flex gap-2'>
          <Rating rating={rating} />
          <span className='text-sm'>{numReviews} Reviews</span>
        </div>

        <p className='mt-4 mb-2'>
          Price: $<span className='font-bold'>{price} </span>{' '}
        </p>

        <p className='mb-8'>Description: {description}</p>
      </div>
    </article>
  );
};

export default ProductDetail;

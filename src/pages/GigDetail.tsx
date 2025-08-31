import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from './ProductDetail';

const GigDetail = () => {
  // This component redirects to ProductDetail for consistency
  // Both /gig/:id and /product/:id routes work
  return <ProductDetail />;
};

export default GigDetail;
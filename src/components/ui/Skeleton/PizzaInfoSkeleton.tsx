import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaInfoSkeleton = () => (
  <ContentLoader
    speed={2}
    width={350}
    height={350}
    viewBox="0 0 350 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="179" cy="175" r="161" />
  </ContentLoader>
);

export default PizzaInfoSkeleton;

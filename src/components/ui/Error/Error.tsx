import React from 'react';

const Error = () => {
  return (
    <div className="content__error-info">
      <h2>
        Something went wrong... <i>😕</i>
      </h2>
      <p>Unfortunately your request failed...</p>
      <p>Please try again later.</p>
    </div>
  );
};

export default Error;

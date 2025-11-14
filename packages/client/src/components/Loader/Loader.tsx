import React from 'react';
import './Loader.scss';

export const Loader = (): JSX.Element => {
  return (
    <section className="loader">
      <div className="loader__circle"></div>
      <h3 className="loader__title">Loading...</h3>
    </section>
  );
};

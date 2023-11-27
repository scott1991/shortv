import React, { useState } from 'react';
import Short from './Short.js';
import './ShortsContainer.css';


const ShortsContainer = ({ shorts }) => {

  return (
    <div
      className="prevent-select container"
    >
      {shorts.map((short, index) => (
        <Short key={index} {...short} />
      ))}
    </div>

  );
};

export default ShortsContainer;

import React, { useRef, useEffect } from 'react';
import Short from './Short.js';
import './ShortsContainer.css';

const ShortsContainer = ({ shorts, handleScroll, scrollPosition, handleProgress, playProgress }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollPosition;
    }
  }, []);

  const onScroll = () => {
    if (containerRef.current) {
      handleScroll(containerRef.current.scrollTop);
    }
  };

  return (
    <div ref={containerRef} className="prevent-select container" onScroll={onScroll}>
      {shorts.map((short, index) => (
        <Short key={index} {...short} handleProgress={handleProgress} playProgress={playProgress}/>
      ))}
    </div>
  );
};

export default ShortsContainer;

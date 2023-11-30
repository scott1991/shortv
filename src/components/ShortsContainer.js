import React, { useRef, useEffect, useState } from 'react';
import Short from './Short.js';
import './ShortsContainer.css';

const ShortsContainer = ({ listName, shorts, scrollPositionsRef, progressRef }) => {
  const containerRef = useRef(null);

  const [firstScroll, setFirstScroll] = useState(true); // prevent first scroll reset time

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollPositionsRef.current[listName];
      setFirstScroll(false);
    }
  }, []);

  const onScroll = () => {
    if (containerRef.current && !firstScroll) {
      scrollPositionsRef.current[listName] = containerRef.current.scrollTop;
      // handleProgress(0); // when scroll reset progress
    }
  };

  return (
    <div ref={containerRef} className="prevent-select container" onScroll={onScroll}>
      {shorts.map((short, index) => (
        <Short key={index} {...short} listName={listName} progressRef={progressRef}/>
      ))}
    </div>
  );
};

export default ShortsContainer;

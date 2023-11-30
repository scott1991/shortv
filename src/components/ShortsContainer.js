import React, { useRef, useEffect, useState } from 'react';
import Short from './Short.js';
import './ShortsContainer.css';

const ShortsContainer = ({ listName, shorts, scrollPositionsRef, progressRef }) => {
  const containerRef = useRef(null);
  const firstScrollRef = useRef(true); // prevent first scroll reset time
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    let timeoutId;
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollPositionsRef.current[listName];
  
      timeoutId = setTimeout(() => {
        firstScrollRef.current = false;
      }, 0); // next event cycle
    }
  
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const onScroll = () => {
    if (containerRef.current && !firstScrollRef.current) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      progressRef.current[listName] = 0; // reset progress
      debounceTimerRef.current = setTimeout(() => {
        scrollPositionsRef.current[listName] = containerRef.current.scrollTop;
      }, 300);
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

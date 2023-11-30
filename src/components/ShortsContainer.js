import React, { useRef, useEffect } from 'react';
import Short from './Short.js';
import PropTypes from 'prop-types';
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
      }, 100);
    }
  };

  return (
    <div ref={containerRef} className="prevent-select container" onScroll={onScroll}>
      {shorts.map((short, index) => (
        <Short key={index} {...short} listName={listName} progressRef={progressRef} />
      ))}
    </div>
  );


};

ShortsContainer.propTypes = {
  listName: PropTypes.string.isRequired,
  shorts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      cover: PropTypes.string,
      play_url: PropTypes.string
    })
  ).isRequired,
  scrollPositionsRef: PropTypes.shape({
    following: PropTypes.number,
    forYou: PropTypes.number
  }).isRequired,
  progressRef: PropTypes.shape({
    following: PropTypes.number,
    forYou: PropTypes.number
  }).isRequired
};


export default ShortsContainer;

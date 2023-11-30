import React, { useState, useRef } from 'react';
import ShortsContainer from "./ShortsContainer.js";
import useFetchData from '../useFetchData.js';
import './Main.css';


const Main = () => {
  const [activeList, setActiveList] = useState('following');
  const scrollPositionsRef = useRef({ following: 0, forYou: 0 });
  const progressRef = useRef({ following: 0, forYou: 0 });
  const lists = useFetchData();

  return (
    <div className="main">
      <div className="button-container">
        <span className={`tab-button ${activeList === 'following' ? 'active' : ''}`}
          onClick={() => setActiveList('following')}>Following</span>
        <span className={`tab-button ${activeList === 'forYou' ? 'active' : ''}`}
          onClick={() => setActiveList('forYou')}>For You</span>
      </div>
      {activeList === 'following' && lists.following &&
        <ShortsContainer
          listName='following'
          scrollPositionsRef={scrollPositionsRef}
          progressRef={progressRef}
          shorts={lists.following}
        />}
      {activeList === 'forYou' && lists.forYou &&
        <ShortsContainer
          listName='forYou'
          scrollPositionsRef={scrollPositionsRef}
          progressRef={progressRef}
          shorts={lists.forYou}
        />}
    </div>
  );
}

export default Main;

import React, { useEffect, useState, useRef } from 'react';
import ShortsContainer from "./ShortsContainer.js";
import setting from '../setting.js';
import './Main.css';

const { setting_host: host, setting_port: port } = setting;

const Main = () => {
  const [activeList, setActiveList] = useState('following');
  const scrollPositionsRef = useRef({ following: 0, forYou: 0 });
  const progressRef = useRef({ following: 0, forYou: 0 });



  const [lists, setLists] = useState({ following: [], forYou: [] });

  useEffect(() => {
    fetch(`http://${host}:${port}/following_list`)
      .then(response => response.json())
      .then(data => setLists(prevLists => ({
        ...prevLists,
        following: data.items
      })))
      .catch(error => console.error(error))

    fetch(`http://${host}:${port}/for_you_list`)
      .then(response => response.json())
      .then(data => setLists(prevLists => ({
        ...prevLists,
        forYou: data.items
      })))
      .catch(error => console.error(error))
  }, []);


  return (
    <div className="main">
      <div className="button-container">
        <span className={`tab-button ${activeList === 'following' ? 'active' : ''}`}
          onClick={() => setActiveList('following')}>Following</span>
        <span className={`tab-button ${activeList === 'forYou' ? 'active' : ''}`}
          onClick={() => setActiveList('forYou')}>For You</span>
      </div>

      {activeList === 'following' && lists.following.length > 0 &&
        <ShortsContainer
          listName='following'
          scrollPositionsRef={scrollPositionsRef}
          progressRef={progressRef}
          shorts={lists.following}
        />}
      {activeList === 'forYou' && lists.forYou.length > 0 &&
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

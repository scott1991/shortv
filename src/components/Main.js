import React, { useEffect, useState } from 'react';
import ShortsContainer from "./ShortsContainer.js";
import setting from '../setting.js';
import './Main.css';

const { setting_host: host, setting_port: port } = setting;

const Main = () => {
  const [activeList, setActiveList] = useState('following');
  const [scrollPositions, setScrollPositions] = useState({ following: 0, forYou: 0 });
  const [porgress, setPorgress] = useState({ following: 0, forYou: 0 })

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



  const handleScrollImpl = (listName, scrollPosition) => {
    setScrollPositions((prevScrollPositions) => ({
      ...prevScrollPositions,
      [listName]: scrollPosition
    }))
  }

  const handleProgressImpl = (listName, currentTime) => {
    setPorgress((prevProgress) => ({
      ...prevProgress,
      [listName]: currentTime
    }))
  };

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
          handleScroll={(scrollPosition) => handleScrollImpl('following', scrollPosition)}
          scrollPosition={scrollPositions.following}
          handleProgress={(currentTime) => handleProgressImpl('following', currentTime)}
          playProgress={porgress.following}
          shorts={lists.following}
        />}
      {activeList === 'forYou' && lists.forYou.length > 0 &&
        <ShortsContainer
          handleScroll={(scrollPosition) => handleScrollImpl('forYou', scrollPosition)}
          scrollPosition={scrollPositions.forYou}
          handleProgress={(currentTime) => handleProgressImpl('forYou', currentTime)}
          playProgress={porgress.forYou}
          shorts={lists.forYou}

        />}
    </div>
  );
}

export default Main;

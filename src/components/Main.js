import React, { useState } from 'react';
import ShortsContainer from "./ShortsContainer.js";
import './Main.css';


const Main = () => {
  const [activeList, setActiveList] = useState('following');
  const [scrollPositions, setScrollPositions] = useState({ following: 0, forYou: 0 });

  const following = [
    {
      "title": "Audi_A4_S4",
      "cover": "http://192.168.2.116:8088/images/Audi_A4_S4.png",
      "play_url": "http://192.168.2.116:8088/media/Audi_A4_S4.m3u8"
    },
    {
      "title": "Bugatti_Chiron",
      "cover": "http://192.168.2.116:8088/images/Bugatti_Chiron.png",
      "play_url": "http://192.168.2.116:8088/media/Bugatti_Chiron.m3u8"
    },
    {
      "title": "Range_Rover_Sport_L322",
      "cover": "http://192.168.2.116:8088/images/Range_Rover_Sport_L322.png",
      "play_url": "http://192.168.2.116:8088/media/Range_Rover_Sport_L322.m3u8"
    }
  ];

  const forYou = [
    {
      "title": "Rolls_Royce_Ghost",
      "cover": "http://192.168.2.116:8088/images/Rolls_Royce_Ghost.png",
      "play_url": "http://192.168.2.116:8088/media/Rolls_Royce_Ghost.m3u8"
    },
    {
      "title": "Toyota_Camry_XV70",
      "cover": "http://192.168.2.116:8088/images/Toyota_Camry_XV70.png",
      "play_url": "http://192.168.2.116:8088/media/Toyota_Camry_XV70.m3u8"
    },
    {
      "title": "Volkswagen_Golf_7",
      "cover": "http://192.168.2.116:8088/images/Volkswagen_Golf_7.png",
      "play_url": "http://192.168.2.116:8088/media/Volkswagen_Golf_7.m3u8"
    }
  ];

  const handleScrollImpl = (listName, scrollPosition) => {
    setScrollPositions((prevScrollPositions) => ({
      ...prevScrollPositions,
      [listName]: scrollPosition
    }))
  }


  return (
    <div className="main">
      <div className="button-container">
        <span className="tab-button" onClick={() => setActiveList('following')}>Following</span>
        <span className="tab-button" onClick={() => setActiveList('forYou')}>For You</span>
      </div>

      {activeList === 'following' &&
        <ShortsContainer handleScroll={(scrollPosition) => handleScrollImpl('following', scrollPosition)}
          shorts={following}
          scrollPosition={scrollPositions.following}
        />}
      {activeList === 'forYou' &&
        <ShortsContainer handleScroll={(scrollPosition) => handleScrollImpl('forYou', scrollPosition)}
          shorts={forYou}
          scrollPosition={scrollPositions.forYou}
        />}
    </div>
  );
}

export default Main;

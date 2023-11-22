import React, { useState } from 'react';
import Short from './Short';
import './ShortsContainer.css';


const ShortsContainer = () => {
  const shorts = [
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleStart = (clientY) => {
    setStartY(clientY);
  };

  const handleEnd = (clientY) => {
    const deltaY = clientY - startY;
    if (deltaY > 0) { // scroll down
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (deltaY < 0) { // scroll up
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, shorts.length - 1));
    }
  };

  const handleMouseDown = (e) => {
    // e.preventDefault();
    handleStart(e.clientY);
  };

  const handleMouseUp = (e) => {
    handleEnd(e.clientY);
  };

  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    handleEnd(e.changedTouches[0].clientY);
  };

  return (
    <div
      className="prevent-select"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ height: '100vh', overflow: 'hidden', cursor: 'grab' }}
    >
      <Short title={shorts[currentIndex].title} cover={shorts[currentIndex].cover} />
    </div>
  );
};

export default ShortsContainer;

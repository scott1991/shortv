import './Short.css'
import { useEffect, useRef } from 'react';


const Short = ({ title, cover, play_url }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.ondragstart = () => false;
    }
  }, []); // disable pic drag

  return (
    <div ref={imgRef}
      className='short'
    >
      {/* <img src={cover} alt={title} style={{ minHeight: '100svh', objectFit: 'cover' }} /> */}
      <video playsInline webkit-playsinline="true" src={play_url} controls autoPlay muted loop style={{ minHeight: '100svh', objectFit: 'cover' }} 
      type="application/x-mpegURL" />
      <p className="short-title">{title}</p>
    </div>
  );
};

export default Short;
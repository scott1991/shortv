import './Short.css'
import { useEffect, useRef } from 'react';


const Short = ({ title, cover }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.ondragstart = () => false;
    }
  }, []);

  return (
    <div ref={imgRef}
      className='short'
    >
      <img src={cover} alt={title} style={{ minHeight: '100svh', objectFit: 'cover' }} />
      <p className="short-title">{title}</p>
    </div>
  );
};

export default Short;
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
    <div ref={imgRef} style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <img src={cover} alt={title} style={{ minHeight: '100%', objectFit: 'cover' }} />
      <p className="short-title">{title}</p>
    </div>
  );
};

export default Short;
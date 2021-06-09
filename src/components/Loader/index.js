import React from 'react';
import loading from './loading.svg';

const Loader = () => {
  const style = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    height: '10vh',
    width: '10vw',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 5,
    margin: 'auto',
  };

  return (
    <div style={style}>
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Loader;

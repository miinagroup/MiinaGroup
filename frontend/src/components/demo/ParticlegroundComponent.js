import React, { useEffect } from 'react';
import $ from 'jquery';
import 'path/to/particleground.js'; 

function ParticlegroundComponent({ dotColor, lineColor }) {
  useEffect(() => {
    if ($.fn.particleground) {
      $('#particleground').particleground({
        dotColor: dotColor,
        lineColor: lineColor,
      });
    }
  }, [dotColor, lineColor]); 

  return <div id="particleground" style={{ position: 'relative', width: '100%', height: '100%' }}></div>;
}

export default ParticlegroundComponent;

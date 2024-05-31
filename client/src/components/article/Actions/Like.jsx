import React from 'react';
import { PiHandsClappingDuotone } from 'react-icons/pi';

const Like = () => {
  return (
    <button className=" btn  d-flex  align-items-center gap-1 text-sm">
      <PiHandsClappingDuotone className="text-x1" />
      <span>2.2K</span>
      
    </button>
  );
};

export default Like; 
import React from "react";

const footer = () => {
  return (
    <div className="flex flex-col bg-[#fffcf4] p-4">
      <div className="top-row flex  ">
        <div>Heading + Button</div>
        <div>Email</div>
        <div>Location</div>
      </div>
      <div className="middle-row">
        <nav>...</nav>
        <div>...</div>
        <div>...</div>
      </div>
      <div className="logo-row">
        <h1>LEEOS</h1>
      </div>
      <div className="bottom-row">
        <p>copyright</p>
        <p>studio</p>
        <button>back to top</button>
      </div>
    </div>
  );
};

export default footer;

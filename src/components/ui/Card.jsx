import React from "react";

const Card = (props) => {
  return (
    <div className="w-125 h-60 flex flex-row items-center gap-7.5 ml-2.5 mt-2.5 shadow-card border-gray-300 border-2 rounded-2xl hover:-translate-y-2 hover:translate-x-16 hover:scale-105 transition-transform duration-300 ease-out">
      <div className="pl-7">
        <img
          className=" shadow-card w-45 h-45 rounded-[10px]"
          alt={props.title}
          src={props.url}
        />
      </div>
      <div class="flex flex-col justify-center">
        <span class="text-[23px] font-medium">{props.title}</span>
        <span class="font-semibold text-[#0ba8e6]">{props.desc}</span>
        <span class="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
          {/* process tags */}Tags
        </span>
      </div>
    </div>
  );
};

export default Card;

//maths: 1unit=0.25rem(4px) 2unit-0.5rem(8px) hence 2.5unit=0.625rem(10px) saransh: 1 unit has 4px
//remember 1rem: 16px
//2.5: 10px well, certain that mt-2.5 is mt-[10px] and gap-7.5 is gap-[30px]
//w-125: w-[500px]
//h-60: h-[240px]
//pl-7: 28px
//

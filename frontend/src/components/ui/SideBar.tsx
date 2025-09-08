import React from 'react'
import SideBarItem from './SideBarItem';
import XIcon from '../../icons/XIcon';
import YouTubeIcon from '../../icons/YouTubeIcon';
import BrainIcon from '../../icons/BrainIcon';

function SideBar() {
  return (
    <div className="bg-neutral-600 h-screen w-72 border-r-2 text-white">
      <div className="flex text-2xl justify-center items-center p-4 ">
        Second Brain
        <span className='ml-3 '>
          <BrainIcon />
        </span>{" "}
      </div>
      <SideBarItem text="Twitter" icon={<XIcon />} />
      <SideBarItem text="YouTube" icon={<YouTubeIcon />} />
    </div>
  );
}

export default SideBar

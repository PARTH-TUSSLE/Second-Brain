import React, { type ReactElement } from 'react'

function SideBarItem( {text, icon}: {
  text: string,
  icon: ReactElement
} ) {
  return (
    <div className="flex items-center pl-10 hover:bg-gray-500 m-3 p-3 rounded-xl transition-all duration-200">
      <div className="mr-2 text-white">{icon}</div>

      <div className="">{text}</div>
    </div>
  );
}

export default SideBarItem

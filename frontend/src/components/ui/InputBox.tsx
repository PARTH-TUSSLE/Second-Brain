import React from 'react';

function InputBox({ onChange, placeholder }: any) {
  return (
    <div>
      <input
        className="px-4 py-2 border rounded-md m-3"
        placeholder={placeholder}
        onChange={onChange}
        type="text"
      />
      
    </div>
  );
}

export default InputBox

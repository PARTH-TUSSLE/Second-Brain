import React from 'react';

function InputBox({ onChange, placeholder, type }: {
  onChange: () => void,
  placeholder: string,
  type: string
}) {
  return (
    <div>
      <input
        className="px-4 py-2 border rounded-md "
        placeholder={placeholder}
        onChange={onChange}
        type={type}
      />
      
    </div>
  );
}

export default InputBox

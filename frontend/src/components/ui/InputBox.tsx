import React from 'react';

function InputBox({ reference, placeholder, type }: {
  reference: any
  placeholder: string,
  type: string
}) {
  return (
    <div>
      <input
        ref={reference}
        className="px-4 py-2 border rounded-md "
        placeholder={placeholder}
        type={type}
      />
      
    </div>
  );
}

export default InputBox

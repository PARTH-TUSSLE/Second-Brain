import React from 'react'
import CrossIcon from '../../icons/CrossIcon';
import InputBox from './InputBox';
import Button from "./Button";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}


function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  return (
    <div>
      {open && (
        <div className="h-screen w-screen bg-white fixed top-0 left-0 opacity-70 flex justify-center">
          <div className="flex justify-center items-center opacity-100">
            <span className="bg-slate-700 text-white p-8 rounded-xl">
              <div onClick={onClose} className="flex justify-end">
                <CrossIcon variant="md" />
              </div>
              <InputBox placeholder="title" />
              <InputBox placeholder="link" />
              <div className="flex justify-center mt-3">
                <Button variant="primary" size="md" text="Submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateContentModal

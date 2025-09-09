import React, { useRef, useState } from "react";
import CrossIcon from "../../icons/CrossIcon";
import InputBox from "./InputBox";
import Button from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../../config";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

enum ContentType {
  YouTube = "youtube",
  Twitter = "twitter",
}

function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Twitter);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(`${BACKEND_URL}/api/v1/content`, {
      title,
      link,
      type
    }, {
      headers: {
        "Authorization" : localStorage.getItem("token")
      }
    })
      alert("Content added successfully!");
  }

  return (
    <div>
      {open && (
        <div>
          <div className="h-screen w-screen bg-white fixed top-0 left-0 opacity-70 flex justify-center">
            <div className="flex justify-center items-center opacity-100"></div>
          </div>
          <div className="h-screen w-screen bg-transparent fixed top-0 left-0 opacity-100 flex justify-center">
            <div className="flex justify-center items-center opacity-100">
              <span className="bg-slate-700 text-white p-8 rounded-xl">
                <div onClick={onClose} className="flex justify-end">
                  <CrossIcon variant="md" />
                </div>

                <div className="m-8">
                  <InputBox
                    reference={titleRef}
                    type="text"
                    placeholder="title"
                  />
                </div>
                <div className="m-8">
                  <InputBox
                    reference={linkRef}
                    type="text"
                    placeholder="link"
                  />
                </div>
                <h1 className="text-xl">Type</h1>
                <div className="flex">
                  <Button
                    text="YouTube"
                    variant={
                      type === ContentType.YouTube ? "primary" : "secondary"
                    }
                    size="sm"
                    onClick={() => {
                      setType(ContentType.YouTube);
                    }}
                  />
                  <Button
                    text="Twitter"
                    variant={
                      type === ContentType.Twitter ? "primary" : "secondary"
                    }
                    size="sm"
                    onClick={() => {
                      setType(ContentType.Twitter);
                    }}
                  />
                </div>

                <div className="flex justify-center mt-3">
                  <Button
                    onClick={addContent}
                    variant="primary"
                    size="md"
                    text="Submit"
                  />
                </div>
              </span>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateContentModal;


import { useState } from "react";

import Button from "../components/ui/Button";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import Card from "../components/ui/Card";
import CreateContentModal from "../components/ui/CreateContentModal";
import SideBar from "../components/ui/SideBar";
import UseContent from "../hooks/UseContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const contents = UseContent();

  async function shareBrain () {
    const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
      share: true
    }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }) ;
    const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
    alert(shareUrl);
  }

  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="bg-neutral-800 w-screen h-screen p-4">
          <CreateContentModal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
            }}
          />
          <div className="flex justify-end gap-4">
            <Button
              onClick={() => {
                setModalOpen(true);
              }}
              variant="primary"
              text="Add Content"
              size="sm"
              startIcon={<PlusIcon variant="md" />}
            />
            <Button
              onClick={ shareBrain}
              variant="secondary"
              text="Share Brain"
              size="sm"
              startIcon={<ShareIcon variant="md" />}
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            {contents.map(({ title, type, link }) => <Card title={title} link={link} type={type} /> )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

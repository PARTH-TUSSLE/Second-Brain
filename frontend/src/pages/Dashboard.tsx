import { useState } from "react";

import Button from "../components/ui/Button";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import Card from "../components/ui/Card";
import CreateContentModal from "../components/ui/CreateContentModal";
import SideBar from "../components/ui/SideBar";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

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
              variant="secondary"
              text="Share Brain"
              size="sm"
              startIcon={<ShareIcon variant="md" />}
            />
          </div>

          <div className="flex gap-4">
            <Card
              type="twitter"
              title="first tweet"
              link="https://x.com/krisharma_955/status/1964216513314844737"
            />
            <Card
              type="youtube"
              title="first video"
              link="https://www.youtube.com/watch?v=YeooYLMozzw"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

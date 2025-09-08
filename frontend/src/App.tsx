import Button from "./components/ui/Button"
import PlusIcon from "./icons/PlusIcon";
import ShareIcon from "./icons/ShareIcon";
import Card from "./components/ui/Card";
import CreateContentModal from './components/ui/CreateContentModal';
import { useState } from "react";

function App() {

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="bg-neutral-900 h-screen p-4">
        <CreateContentModal open={modalOpen} onClose={ ()=>{
          setModalOpen(false);
        } } />
        <div className="flex justify-end gap-4">
          <Button
          onClick={ () => {
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
            link="https://x.com/parthgartan/status/1931648947786764786"
          />
          <Card
            type="youtube"
            title="first video"
            link="https://www.youtube.com/watch?v=YeooYLMozzw"
          />
        </div>
      </div>
    </>
  );
}

export default App

import Button from "./components/ui/Button"
import PlusIcon from "./icons/PlusIcon";
import ShareIcon from "./icons/ShareIcon";

function App() {

  return (
    <>
      <div className="bg-neutral-900 h-screen overflow-hidden">
        <Button variant="primary" text="Click Me 1" size="sm" startIcon={<PlusIcon variant="md" />} endIcon={<ShareIcon variant="md" />} />
        <Button variant="secondary" text="Click Me 2" size="md" />
        <Button variant="primary" text="Click Me 1" size="lg" />
      </div>
    </>
  );
}

export default App

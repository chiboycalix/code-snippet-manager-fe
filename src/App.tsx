import React from "react";
import Snippets from "./pages/Snippets";
import "./App.css";
import Modal from "./components/Modal";
import HighlightingContent from "./components/Highlight";

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState("");


  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  const onSelectLanguage = () => {};

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  const handleChange = (event: any) => {
    setValue(event.target.value);
    handleSyncScroll(event.target)
  };

  const handleSyncScroll = (element: any) => {
    let result_element = document.querySelector("#highlighting") as any;
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Tab") {
      event.preventDefault();

      const element = event.target;
      let code = element.value;
      let cursorStart = element.selectionStart;
      let cursorEnd = element.selectionEnd;

      let beforeTab = code.slice(0, cursorStart);
      let afterTab = code.slice(cursorEnd, code.length);
      let cursorPos = cursorStart + 1;

      let updatedValue = beforeTab + "\t" + afterTab;

      element.value = updatedValue;
      element.selectionStart = cursorPos;
      element.selectionEnd = cursorPos;
      setValue(element.value);
    }
  };

  return (
    <div className="app-wrapper">
      <h1>Code Snippets Manager</h1>
      <button onClick={openModal}>New Snippet</button>
      <Snippets />
      <Modal isOpen={isOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit}>
          <select id="language" name="language" onChange={onSelectLanguage}>
            <option value="">Select language</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">Javascript</option>
            <option value="php">PHP</option>
            <option value="ruby">Ruby</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="java">Java</option>
          </select>
          <textarea
            placeholder="Describe your snippet"
            rows={4}
            className="description"
          ></textarea>

          {/* code editor */}
          <textarea
            name="snippet"
            placeholder="Enter Source Code"
            id="editing"
            spellCheck="false"
            value={value}
            onChange={handleChange}
            onScroll={(event) =>handleSyncScroll(event.target)}
            onKeyDown={handleKeyDown}
          ></textarea>
          <HighlightingContent value={value} />
          <button type="submit" id="submit">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default App;

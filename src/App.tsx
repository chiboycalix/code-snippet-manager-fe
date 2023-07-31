import React from "react";
import Snippets from "./pages/Snippets";
import "./App.css";
import Modal from "./components/Modal";
import HighlightingContent from "./components/Highlight";

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [language, setLanguage] = React.useState("html");
  const [theme, setTheme] = React.useState([{label: 'Monakai', value: 'monakai'}, {label: "Solarized Dark", value:"solarized-dark"}]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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

  const handleChangeTheme = (event: any) => {
    console.log({ event: event.target })
    setTheme([])
  }

  return (
    <div className="w-full p-2">
      <h1 className="text-center text-xl my-4 sm:text-4xl">Code Snippet Manager</h1>
      <div className="flex flex-col gap-4 justify-between items-center
                      sm:flex-row
      ">
      <button onClick={openModal} className="bg-green-700 py-2 px-3 rounded-md w-full my-4
        sm:w-60
      ">Create Snippet</button>
      <select className="w-full py-2 px-3 sm:w-60">
        {theme.map((theme) => {
          return <option value={theme.value} key={theme.label} onChange={(value) => handleChangeTheme(value)}>{theme.label}</option>
        })}
      </select>
      </div>
      <Snippets />
      <Modal isOpen={isOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit}>
          <select id="language" name="language" onChange={(event) => setLanguage(event.target.value)} className="">
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
            name="description"
          ></textarea>

          <textarea
            name="snippet"
            placeholder="Enter Source Code"
            id="editing"
            spellCheck="false"
            value={value}
            onChange={handleChange}
            onScroll={(event) =>handleSyncScroll(event.target)}
            onKeyDown={handleKeyDown}
            // className="mt-8 absolute w-full"
          ></textarea>
          <HighlightingContent value={value} language={language}/>
          <button type="submit" id="submit">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default App;

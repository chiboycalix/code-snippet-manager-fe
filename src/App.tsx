import React from "react";
import Snippets from "./pages/Snippets";
// import "./App.css";
import Modal from "./components/Modal";
import CodeEditor from '@uiw/react-textarea-code-editor';

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [theme, setTheme] = React.useState('monakai');
  const [language, setLanguage] = React.useState('js')
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChangeTheme = (event: any) => {
    setTheme(event.target.value)
  }

  const handleSelect = (event: any) => {
    setLanguage(event.target.value)
  }
  return (
    <div className="w-full p-2">
      <h1 className="text-center text-xl my-4 sm:text-4xl">Code Snippet Manager</h1>
      <div className="flex flex-col gap-4 justify-between items-center
                      sm:flex-row">
        <button onClick={openModal} className="bg-indigo-500/100 py-2 px-3 rounded-md w-full my-4
        sm:w-60
      ">Create Snippet</button>
        <select className="w-full py-2 px-3 sm:w-72 border-2 border-indigo-500/100 bg-input-bg-color rounded-md" onChange={(value) => handleChangeTheme(value)}>
          <option value="monakai" >Monakai</option>
          <option value="solarized-dark">Solarized Dark</option>
        </select>
      </div>
      <Snippets />
      <Modal isOpen={isOpen} onClose={closeModal}>
        <p>Enter Snippet</p>
        <form className="mt-4" action="#">
          <select className="w-full py-2 px-3 bg-input-bg-color border-2 border-indigo-500/100 rounded-md" onChange={handleSelect}>
            <option value="js">Javascript</option>
            <option value="python">Python</option>
          </select>
          <textarea className="w-full bg-input-bg-color border-2 border-indigo-500/100 mt-4 py-2 px-3 rounded-md" placeholder="Enter snippet description" />
          <CodeEditor
            value={code}
            language={language}
            placeholder="Please enter code."
            onChange={(evn) => setCode(evn.target.value)}
            padding={15}
            data-color-mode="dark"
            className="text-sm  border-2 border-indigo-500/100 mt-4 h-5/6 rounded-md"
            style={{
              fontFamily: 'fira code, ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          />
          <button className="bg-indigo-500/100 mt-4 py-2 rounded-sm w-full">Submit</button>
        </form>
      </Modal>
    </div>
  );
}

export default App;

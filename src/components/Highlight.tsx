import { useEffect } from 'react';
import './styles/highlight.css';
import hljs from 'highlight.js';

const HighlightingContent = ({ value, resultRef }: any) => {

  useEffect(() => {
    let updatedText = value;

    if (updatedText[updatedText.length - 1] === '\n') {
      updatedText += ' ';
    }

    const highlightedText = updatedText.replace(new RegExp('&', 'g'), '&amp;').replace(new RegExp('<', 'g'), '&lt;');
    if (resultRef.current) {
      resultRef.current.innerHTML = highlightedText;
    }
    hljs.highlightElement(resultRef.current);
  }, [value, resultRef]);

  return (
    <div>
      <pre id="highlighting" aria-hidden="true">
        <code className='language-html' id="highlighting-content" ref={resultRef}></code>
      </pre>
    </div>
  );
};

export default HighlightingContent;
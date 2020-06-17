import { useState } from 'react';

const useCopy = () => {
  const [copyMessage, setCopyMessage] = useState(null);

  /*
   * @description: Copy text to clipboard
   * @link: https://github.com/feross/clipboard-copy/blob/master/index.js
   */
  const handleCopy = (copyText) => {
    const span = document.createElement('span');
    span.textContent = copyText;

    // Preserve consecutive spaces and newlines
    span.style.whiteSpace = 'pre';

    // Add the <S> to the page
    document.body.appendChild(span);

    // Make a selection object representing the range of text selected by the user
    const selection = window.getSelection();
    const range = window.document.createRange();
    selection.removeAllRanges();
    range.selectNode(span);
    selection.addRange(range);

    // Copy text to the clipboard
    try {
      window.document.execCommand('copy');
      // Cleanup
      selection.removeAllRanges();
      window.document.body.removeChild(span);
      setCopyMessage('Copied!');
      return 'Copied!';
    } catch (err) {
      setCopyMessage('Unable to copy');
      return 'Unable to copy';
    }
  };
  return { handleCopy, copyMessage };
};

export default useCopy;

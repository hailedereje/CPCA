// Toolbar.js
import { toggleBold, toggleItalic, toggleUnderline } from './TextFormate';

const Toolbar = ({ editor }) => {
  return (
    <div>
      <button onMouseDown={() => toggleBold(editor)}>Bold</button>
      <button onMouseDown={() => toggleItalic(editor)}>Italic</button>
      <button onMouseDown={() => toggleUnderline(editor)}>Underline</button>
    </div>
  );
};

export default Toolbar;

// TextFormat.js
import { Editor, Transforms } from 'slate';

export const toggleBold = editor => {
  const isActive = isFormatActive(editor, 'bold');
  Transforms.setNodes(
    editor,
    { bold: isActive ? null : true },
    { match: n => Editor.isText(editor, n), split: true }
  );
};

export const toggleItalic = editor => {
  const isActive = isFormatActive(editor, 'italic');
  Transforms.setNodes(
    editor,
    { italic: isActive ? null : true },
    { match: n => Editor.isText(editor, n), split: true }
  );
};

export const toggleUnderline = editor => {
  const isActive = isFormatActive(editor, 'underline');
  Transforms.setNodes(
    editor,
    { underline: isActive ? null : true },
    { match: n => Editor.isText(editor, n), split: true }
  );
};

const isFormatActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

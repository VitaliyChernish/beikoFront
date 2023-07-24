import { Editor } from "react-draft-wysiwyg";
import s from './textEditor.module.scss';
import './textEditor.scss'

const TextEditor = ({ handleEditorChange, editorState }) => {
  return (
      <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName={s.editorWrapper}
          editorClassName={s.editor}
          toolbarClassName={s.toolbar}
      />
  )
}

export default TextEditor;
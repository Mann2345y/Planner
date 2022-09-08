import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditorWrapper = styled(ReactQuill)`
  height: 400px;
  width: 100%;
  .ql-container {
    padding: 25px;
    border: 2px solid #ff9371;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .ql-toolbar {
    border: 2px solid #ff9371;
    display: flex;
    justify-content: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`;

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const Editor = ({ content, setContent }) => {
  return (
    <EditorWrapper
      modules={modules}
      theme="snow"
      value={content}
      onChange={setContent}
      placeholder="Content goes here..."
    />
  );
};

export default Editor;

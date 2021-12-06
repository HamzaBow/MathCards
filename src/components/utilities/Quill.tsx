import ReactQuill from "react-quill";
import React from "react";
import "react-quill/dist/quill.snow.css";
import { CardFormActions } from "components/cardform/CardForm";

interface Props {
  id: string | number;
  htmlContent: string;
  fieldsDispatch: Function;
  face: "front" | "back";
}

const Quill: React.FC<Props> = ({ id, htmlContent, fieldsDispatch, face }) => {
  const quillContainerStyle = {
    width: "22rem",
    // maxHeight: '5rem',
    margin: "0.5rem",
  };

  const quillStyle: any = {
    maxHeight: "15rem",
    overflowY: "auto",
  };

  return (
    <div style={quillContainerStyle}>
      <ReactQuill
        modules={{
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
          ],
        }}
        theme="snow"
        style={quillStyle}
        value={htmlContent}
        onChange={(htmlText) => {
          fieldsDispatch({
            type: CardFormActions.UpdateHtmlContent,
            payload: { id: id, htmlContent: htmlText, face: face },
          });
        }}
      />
    </div>
  );
};

export default Quill;

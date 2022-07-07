import ReactQuill from "react-quill";
import React from "react";
import "react-quill/dist/quill.snow.css";
import { CardFormActions } from "components/cardform/CardForm";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  textQuill: {
    backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[50] : theme.palette.background.default
  }
}))
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

  const classes = useStyles();
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
        className={classes.textQuill}
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

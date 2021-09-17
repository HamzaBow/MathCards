// import { useState, useEffect } from "react";
import { addStyles, EditableMathField } from "react-mathquill";
import { CARD_FORM_ACTIONS } from "../../Constants"

// inserts the required css to the <head> block.
// you can skip this, if you want to do that by yourself.
addStyles();
interface Props {
  id: string | number;
  latex: string;
  fieldsDispatch: Function;
  face: 'front' | 'back';
}

const MathField: React.FC<Props> = ({ id, latex, fieldsDispatch, face }) => {

  // const [latex, setLatex] = useState("")

  // latexString = latexString ?? "";
  const mathFieldStyle = {
    fontSize: "1.5rem",
    backgroundColor: "rgb(240, 245, 245)",
    width: "30rem",
    padding: "0.4rem 1rem",
    maxWidth: "40rem",
  };

  return (
    <div style={{ margin: "0.5rem" }}>
      <EditableMathField
        style={mathFieldStyle}
        latex={latex}
        onChange={(mathField) => {
          // setLatex(mathField.latex());
          fieldsDispatch({ type: CARD_FORM_ACTIONS.UPDATE_LATEX, payload: { id: id, latex: mathField.latex(), face: face }})
        }}
      />
    </div>
  );
};

export default MathField;

import { useState } from "react";
import { addStyles, EditableMathField } from "react-mathquill";

// inserts the required css to the <head> block.
// you can skip this, if you want to do that by yourself.
addStyles();

const CustomMathField = ({ field, latexFormula }) => {
  const [latex, setLatex] = useState("");

  const mathFieldStyle = {
    fontSize: "1.5rem",
    backgroundColor: "rgb(240, 245, 245)",
    width: "30rem",
    padding: "0.4rem 1rem",
    maxWidth: "40rem",
  };

  return (
    <div style={{margin: "0.5rem"}}>
      <EditableMathField
        id={field}
        style={mathFieldStyle}
        latex={latex}
        onChange={(mathField) => {
          setLatex(mathField.latex());
        }}
      />
      <p id={latexFormula} style={{ display: "none" }}>
        {latex}
      </p>
    </div>
  );
};

export default CustomMathField;

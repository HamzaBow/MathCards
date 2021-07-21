import React, { useState } from "react";
import { addStyles, EditableMathField } from "react-mathquill";

// inserts the required css to the <head> block.
// you can skip this, if you want to do that by yourself.
addStyles();

const CustomMathField = ({ field, latexFormula }) => {
  const [latex, setLatex] = useState("");

  return (
    <div>
      <EditableMathField
        id={field}
        style={{ backgroundColor: "white", minWidth: "120px" }}
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

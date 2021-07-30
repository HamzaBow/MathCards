import React from "react";
import { EditableMathField } from "react-mathquill";
import CustomMathField from "../CustomMathField";

const NewCardForm = () => {

  const addButtonClick = () => {
    const frontText = document.getElementById("front-text").value
    console.log('frontText:', frontText)
    const frontFormulaLatex = document.getElementById("front-formula-latex").textContent
    console.log('frontFormulaLatex:', frontFormulaLatex)

    const backFormulaLatex = document.getElementById("back-formula-latex").textContent
    console.log('backFormulaLatex:', backFormulaLatex)
    const backText = document.getElementById("back-text").value
    console.log('backText:', backText)

  }

  return (
    <div id="new-card-form">
      <center><h2>Add a new Card</h2></center>
      <fieldset>
        <legend>Front</legend>
        <br />

        <label htmlFor="question">Question</label>
        <input type="text" id="front-text"></input>
        <br />
        <br />

        <label htmlFor="front-formula">Question Formula</label>
        <CustomMathField field={"front-formula"} latexFormula={"front-formula-latex"} />

      </fieldset>
      <br />
      <br />
      <hr ></hr>
      <br />
      <br />
      <fieldset>
        <legend>Back</legend>
        <label htmlFor="back-formula-latex">Answer Formula</label>
        <CustomMathField field={"back-formula"} latexFormula={"back-formula-latex"} />
        <br />
        <br />

        <label htmlFor="answer-comment">Comment</label>
        <input type="text" id="back-text" placeholder="comment..."></input>
        <br />
        <br />

      </fieldset>
      <br />
      <button type="reset" value="Add" style={addButtonStyle}>
        Clear
      </button>
      <button type="button" value="Add" style={addButtonStyle} onClick={() => addButtonClick()}>
        Add
      </button>
    </div >
  );
};


const addButtonStyle = {
  float: "right",
  fontSize: "1.5em",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: "10px",
  paddingBottom: "10px",
  marginRight: "10px",
}

export default NewCardForm;

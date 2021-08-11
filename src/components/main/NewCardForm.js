import React from "react";
import { addStyles } from "react-mathquill";
import CustomMathField from "../CustomMathField";

addStyles();

const NewCardForm = ({ cardFormActive }) => {

  const addButtonClick = () => {
  }

  const cardFormStyle = {
    visibility: cardFormActive ? "visible" : "hidden",
    opacity: cardFormActive ? "1" : "0",
  }

  return (
    <div id="new-card-form" style={cardFormStyle}>
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

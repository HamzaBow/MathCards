import { addStyles } from "react-mathquill";
import CustomMathField from "../CustomMathField";

addStyles();

const NewCardForm = () => {

  const addButtonClick = () => {
  }

  const cardFormStyle = {
    visibility: "visible",
    opacity: "1",
  }

  return (
    <div id="new-card-form" style={cardFormStyle}>
      <center>
        <h1>Add a new Card</h1>
        <h2>Front</h2>
      </center>


      <textarea id="front-text" rows={3} cols={30} placeholder="Write the question here..."></textarea>
      <br />
      <br />

      <label htmlFor="front-formula">Question Formula</label>
      <CustomMathField field={"front-formula"} latexFormula={"front-formula-latex"} />

      <label htmlFor="back-formula-latex">Answer Formula</label>
      <CustomMathField field={"back-formula"} latexFormula={"back-formula-latex"} />

      <textarea id="back-text" rows={3} cols={30} placeholder="Write a Comment here (optional)"></textarea>

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

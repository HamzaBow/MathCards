import { addStyles } from "react-mathquill";
import Quill from "../utilities/Quill";
import CustomMathField from "../utilities/CustomMathField";
import { useReducer, useState } from "react";
import { CARD_FORM_ACTIONS, FIELD_TYPE } from "../../Constants";

addStyles();

const CardForm = () => {
  const [fields, dispatch] = useReducer(reducer, []);
  const [prompFieldType, setPromptFieldType] = useState(false);

  function newField(fieldType) {
    return {
      type: fieldType,
    };
  }
  console.log("render");

  function reducer(fields, action) {
    switch (action.type) {
      case CARD_FORM_ACTIONS.ADD_TEXT_QUILL:
        return [...fields, newField(FIELD_TYPE.TEXT)];
      case CARD_FORM_ACTIONS.ADD_MATH_QUILL:
        return [...fields, newField(FIELD_TYPE.MATH)];
      default:
        return fields;
    }
  }

  const togglePromptFieldType = () => {
    setPromptFieldType((prev) => !prev);
  };

  const addFieldHandle = () => {
    togglePromptFieldType();
  };

  const addTextQuill = () => {
    togglePromptFieldType();
    dispatch({ type: CARD_FORM_ACTIONS.ADD_TEXT_QUILL });
  };

  const addMathQuill = () => {
    togglePromptFieldType();
    dispatch({ type: CARD_FORM_ACTIONS.ADD_MATH_QUILL });
  };

  const saveButtonHandle = () => {};

  const fieldsContainerStyle = {
    
  }

  return (
    <div id="new-card-form">
      <h1>Add a new Card</h1>
      <h2>Front</h2>

      <br />
      <br />

      {/* <label htmlFor="front-formula">Question Formula</label>
      <CustomMathField
        field={"front-formula"}
        latexFormula={"front-formula-latex"}
      />

      <Quill /> */}
      <div style={fieldsContainerStyle}>
        {fields.map((field) => {
          if (field.type === FIELD_TYPE.MATH) {
            console.log("math");
            return (
              <CustomMathField
                field={"front-formula"}
                latexFormula={"front-formula-latex"}
              />
            );
          }
          if (field.type === FIELD_TYPE.TEXT) {
            console.log("text");
            return <Quill />;
          }
          throw new TypeError(
            "type of the field should be either text or math"
          );
        })}
      </div>
      <button
        style={{ marginTop: "3rem", display: "block" }}
        onClick={addFieldHandle}
      >
        Add a field
      </button>
      {(() => {
        if (prompFieldType) {
          return (
            <>
              <button onClick={addTextQuill}>text</button>
              <button onClick={addMathQuill}>math formula</button>
            </>
          );
        }
      })()}

      <button type="reset" value="Add" style={buttonStyle}>
        Clear
      </button>
      <button
        type="button"
        value="Save"
        style={buttonStyle}
        onClick={() => saveButtonHandle()}
      >
        Add
      </button>
    </div>
  );
};

const buttonStyle = {
  float: "right",
  fontSize: "1.5em",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: "10px",
  paddingBottom: "10px",
  marginRight: "10px",
  marginTop: "10rem",
};

export default CardForm;

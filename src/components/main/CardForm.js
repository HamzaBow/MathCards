import { addStyles } from "react-mathquill";
import Quill from "../utilities/Quill";
import CustomMathField from "../utilities/CustomMathField";
import { useReducer, useState } from "react";
import { CARD_FORM_ACTIONS, FIELD_TYPE } from "../../Constants";

import { Button } from "@material-ui/core"
import { ButtonGroup } from "@material-ui/core";

import {IoTriangleSharp} from "react-icons/io5"

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


  return (
    <div id="card-form__face">
      <h1>Add a new Card</h1>
      <h2>Front</h2>

      {/* <label htmlFor="front-formula">Question Formula</label>
      <CustomMathField
        field={"front-formula"}
        latexFormula={"front-formula-latex"}
      />

      <Quill /> */}
      <div class="fields-container">
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
      <div class="cardform__face__buttons-container">
        <Button variant="contained" color="primary" onClick={addFieldHandle}>
          Add a field
        </Button>
        {(() => {
          if (prompFieldType) {
            return (
              <>
                <IoTriangleSharp color="#3f51b5" style={{ marginBottom: "-2px" }}/>
                <ButtonGroup className="cardform__face__field-prompt">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={addTextQuill}
                  >
                    text
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={addMathQuill}
                  >
                    math
                  </Button>
                </ButtonGroup>
              </>
            );
          }
        })()}
      </div>
    </div>
  );
};


export default CardForm;

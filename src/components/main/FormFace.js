import React from "react";

import { addStyles } from "react-mathquill";
import Quill from "../utilities/Quill";
import CustomMathField from "../utilities/CustomMathField";
import { useReducer, useState } from "react";
import { CARD_FORM_ACTIONS, FIELD_TYPE } from "../../Constants";

import { Button } from "@material-ui/core"
import { ButtonGroup } from "@material-ui/core";

import {IoTriangleSharp} from "react-icons/io5"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import FunctionsIcon from '@material-ui/icons/Functions';
import TextFormatIcon from '@material-ui/icons/TextFormat';

addStyles();

const FormFace = ({ face, next, prev }, ref) => {

  face = face ?? "front";

  const [fields, dispatch] = useReducer(reducer, []);
  const [prompFieldType, setPromptFieldType] = useState(false);

  function newField(fieldType) {
    return {
      type: fieldType,
    };
  }

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
    <div className={`card-form__face card-form--${face}`} ref={ref}>
      <div>
        <h1 style={{ marginTop: "0px" }}>Add a new Card</h1>
        <h2 style={{ textAlign: "center" }}>
          {face.charAt(0) + face.toLowerCase().slice(1)}
        </h2>
      </div>

      {fields.length !== 0 ? (
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
      ) : (
        ""
      )}

      <div class="card-form__face__prompt-buttons-container">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={addFieldHandle}
        >
          New
        </Button>
        {(() => {
          if (prompFieldType) {
            return (
              <>
                <IoTriangleSharp
                  color="#3f51b5"
                  // backgroundColor=""
                  style={{ marginBottom: "-2px" }}
                />
                <ButtonGroup className="card-form__face__field-prompt">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={addTextQuill}
                    startIcon={<TextFormatIcon />}
                  >
                    text
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={addMathQuill}
                    startIcon={<FunctionsIcon />}
                  >
                    math
                  </Button>
                </ButtonGroup>
              </>
            );
          }
        })()}
      </div>

      <ButtonGroup>
        {prev ? (
          <Button
            className="card-form__next-btn"
            variant="outlined"
            color="primary"
            startIcon={<ArrowBackIcon />}
            style={{ alignSelf: "end" }}
            onClick={() => prev()}
          >
            Prev
          </Button>
        ) : (
          ""
        )}
          <Button
            className="card-form__next-btn"
            variant="outlined"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            style={{ alignSelf: "end" }}
            onClick={() => next()}
          >
            next
          </Button>
      </ButtonGroup>
    </div>
  );
};


export default React.forwardRef(FormFace);

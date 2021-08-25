import React from "react";

import { addStyles } from "react-mathquill";
// import { useReducer, useState } from "react";

import { Button } from "@material-ui/core"
import { ButtonGroup } from "@material-ui/core";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

addStyles();

const FormOther = ({ prev }, ref) => {


  // const [fields, dispatch] = useReducer(reducer, []);
  // const [fieldTypePrompt, setFieldTypePrompt] = useState(false);

  // function newField(fieldType) {
  //   return {
  //     type: fieldType,
  //   };
  // }

  // function reducer(fields, action) {
  //   switch (action.type) {
  //     case CARD_FORM_ACTIONS.ADD_TEXT_QUILL:
  //       return [...fields, newField(FIELD_TYPE.TEXT)];
  //     case CARD_FORM_ACTIONS.ADD_MATH_QUILL:
  //       return [...fields, newField(FIELD_TYPE.MATH)];
  //     default:
  //       return fields;
  //   }
  // }

  // const togglePromptFieldType = () => {
  //   setFieldTypePrompt((prev) => !prev);
  // };

  // const addFieldHandle = () => {
  //   togglePromptFieldType();
  // };

  // const addTextQuill = () => {
  //   togglePromptFieldType();
  //   dispatch({ type: CARD_FORM_ACTIONS.ADD_TEXT_QUILL });
  // };

  // const addMathQuill = () => {
  //   togglePromptFieldType();
  //   dispatch({ type: CARD_FORM_ACTIONS.ADD_MATH_QUILL });
  // };

  const save = () => {

  }

  return (
    <div className={'card-form__face card-form--other'} ref={ref}>
      <div>
        <h1 style={{ marginTop: "0px" }}>Add a new Card</h1>
        <h2 style={{ textAlign: "center" }}>
        </h2>
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
            variant="contained"
            color="primary"
            style={{ alignSelf: "end" }}
            onClick={() => save()}
          >
            save
          </Button>
      </ButtonGroup>
    </div>
  );
};


export default React.forwardRef(FormOther);

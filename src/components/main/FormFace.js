import React from "react";
import { useReducer, useState } from "react";

import { addStyles } from "react-mathquill";
import Quill from "../utilities/Quill";
import MathField from "../utilities/MathField";
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

  // const [faceData, setFaceData] = useState([]);

  // **************************** FIELDS ****************************
  function fieldsReducer(fields, action) {
    switch (action.type) {
      case CARD_FORM_ACTIONS.ADD_TEXT_QUILL:
        return [...fields, newField(action.payload.id, FIELD_TYPE.TEXT)];

      case CARD_FORM_ACTIONS.ADD_MATH_QUILL:
        return [...fields, newField(action.payload.id, FIELD_TYPE.MATH)];

      case CARD_FORM_ACTIONS.UPDATE_LATEX:
        return fields.map((field) => {
          if(field.id === action.payload.id){
            return { ...field, latex: action.payload.latex };
          }
          return field;
        })

      case CARD_FORM_ACTIONS.UPDATE_HTML_CONTENT:
        return fields.map((field) => {
          if(field.id === action.payload.id){
            return { ...field, htmlContent: action.payload.htmlContent };
          }
          return field;
        })

      default:
        return fields;
    }
  }

  const [fields, fieldsDispatch] = useReducer(fieldsReducer, []);
  // *************************** END FIELDS *************************


  const [prompFieldType, setPromptFieldType] = useState(false);

  function newField(id, fieldType) {
    if (fieldType === FIELD_TYPE.TEXT) {
      return {
        id,
        type: fieldType,
        htmlContent: "",
      };
    }

    if (fieldType === FIELD_TYPE.MATH) {
      return {
        id,
        type: fieldType,
        latex: "",
      };
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
    fieldsDispatch({ type: CARD_FORM_ACTIONS.ADD_TEXT_QUILL, payload: { id: Date.now() } });
  };

  const addMathQuill = () => {
    togglePromptFieldType();
    fieldsDispatch({ type: CARD_FORM_ACTIONS.ADD_MATH_QUILL, payload: { id: Date.now() } });
  };

  return (
    <div className={"card-form__step"} ref={ref}>
      <h1 style={{ marginTop: 0 }}>
        {face.charAt(0) + face.toLowerCase().slice(1)}
      </h1>

      {fields.length !== 0 && (
        <div className="fields-container">
          {fields.map((field, key) => {
            if (field.type === FIELD_TYPE.MATH){
              return (
                <MathField
                  key={key}
                  id={field.id}
                  latex={field.latex}
                  fieldsDispatch={fieldsDispatch}
                />
              );
            }

            if (field.type === FIELD_TYPE.TEXT){
              return (
                <Quill
                  key={key}
                  id={field.id}
                  htmlContent={field.htmlContent}
                  fieldsDispatch={fieldsDispatch} 
                />
              );
            }
            if (
              field.type !== FIELD_TYPE.MATH &&
              field.type !== FIELD_TYPE.TEXT
            ) {
              throw new TypeError(
                "type of the field should be either text or math"
              );
            }
            return <></>;
          })}
        </div>
      )}

      <div className="card-form__face__prompt-buttons-container">
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

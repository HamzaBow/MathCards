import React from "react";
import { useState } from "react";

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

const FormFace = ({ face, next, prev, fields, fieldsDispatch }, ref) => {
  face = face ?? "front";

  // const [faceData, setFaceData] = useState([]);



  const [prompFieldType, setPromptFieldType] = useState(false);

  const togglePromptFieldType = () => {
    setPromptFieldType((prev) => !prev);
  };

  const addFieldHandle = () => {
    togglePromptFieldType();
  };

  const addTextQuill = () => {
    togglePromptFieldType();
    fieldsDispatch({ type: CARD_FORM_ACTIONS.ADD_TEXT_QUILL, payload: { id: Date.now(), face: face } });
  };

  const addMathQuill = () => {
    togglePromptFieldType();
    fieldsDispatch({ type: CARD_FORM_ACTIONS.ADD_MATH_QUILL, payload: { id: Date.now(), face: face } });
  };

  return (
    <div className={"card-form__step"} ref={ref}>
      <h1 style={{ marginTop: 0 }}>
        {face.charAt(0) + face.toLowerCase().slice(1)}
      </h1>

      {fields.length !== 0 && (
        <div className="fields-container">
          {fields[face].map((field, key) => {
            if (field.type === FIELD_TYPE.MATH){
              return (
                <MathField
                  key={key}
                  id={field.id}
                  latex={field.latex}
                  fieldsDispatch={fieldsDispatch}
                  face={face}
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
                  face={face}
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

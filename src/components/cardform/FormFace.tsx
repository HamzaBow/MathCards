import React from "react";

import { addStyles } from "react-mathquill";
import Quill from "../utilities/Quill";
import MathField from "../utilities/MathField";
import { CARD_FORM_ACTIONS, FIELD_TYPE } from "../../Constants";

import { Button } from "@material-ui/core"
import { ButtonGroup } from "@material-ui/core";

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { BiText } from 'react-icons/bi/'
import { ImSigma } from 'react-icons/im/'
import { FrontNBackFields } from './CardForm'

addStyles();

interface OtherProps {
  face: "front" | "back";
  next: Function;
  prev?: Function;
  frontNBackFields: FrontNBackFields;
  fieldsDispatch: Function;
}


const FormFace: React.ForwardRefRenderFunction<HTMLDivElement, OtherProps> = ({ face, next, prev, frontNBackFields, fieldsDispatch }, ref) => {
  face = face ?? "front";

  const addTextQuill = () => {
    fieldsDispatch({ type: CARD_FORM_ACTIONS.ADD_TEXT_QUILL, payload: { id: Date.now(), face: face } });
  };

  const addMathQuill = () => {
    fieldsDispatch({ type: CARD_FORM_ACTIONS.ADD_MATH_QUILL, payload: { id: Date.now(), face: face } });
  };

  return (
    <div className={"card-form__step"} ref={ref}>
      <h1 style={{ marginTop: 0 }}>
        {face.charAt(0) + face.toLowerCase().slice(1)}
      </h1>

        <div className="fields-container">
          {frontNBackFields[face].map((field, key) => {
            if (field.type === FIELD_TYPE.MATH){
              return (
                <MathField
                  key={key}
                  id={field.id}
                  latex={field.latex || ''}
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
                  htmlContent={field.htmlContent || ''}
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

      <div className="card-form__face__prompt-buttons-container">
              <div style={{display: "flex", flexDirection: "row", gap: "1rem"}}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addTextQuill}
                    startIcon={<BiText size={25}/>}
                  >
                    Text
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addMathQuill}
                    startIcon={<ImSigma />}
                  >
                    Math
                  </Button>
              </div>
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

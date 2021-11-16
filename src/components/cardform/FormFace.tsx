import React from "react";

import { addStyles } from "react-mathquill";
import Quill from "../utilities/Quill";
import MathField from "../utilities/MathField";
import { CARD_FORM_ACTIONS, FIELD_TYPE } from "../../Constants";

import { Button, Paper } from "@mui/material";
import { ButtonGroup } from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { FrontNBackFields } from "./CardForm";
import { Add } from "@mui/icons-material";

addStyles();

interface OtherProps {
  face: "front" | "back";
  next: Function;
  prev?: Function;
  frontNBackFields: FrontNBackFields;
  fieldsDispatch: Function;
}

const FormFace: React.ForwardRefRenderFunction<HTMLDivElement, OtherProps> = (
  { face, next, prev, frontNBackFields, fieldsDispatch },
  ref
) => {
  face = face ?? "front";

  const addTextQuill = () => {
    fieldsDispatch({
      type: CARD_FORM_ACTIONS.ADD_TEXT_QUILL,
      payload: { id: Date.now(), face: face },
    });
  };

  const addMathQuill = () => {
    fieldsDispatch({
      type: CARD_FORM_ACTIONS.ADD_MATH_QUILL,
      payload: { id: Date.now(), face: face },
    });
  };

  return (
    <Paper className={"card-form__step"} ref={ref}>
      <h1 style={{ marginTop: 0 }}>
        {face.charAt(0) + face.toLowerCase().slice(1)}
      </h1>

      <div className="fields-container">
        {frontNBackFields[face].map((field, key) => {
          if (field.type === FIELD_TYPE.MATH) {
            return (
              <MathField
                key={key}
                id={field.id}
                latex={field.latex || ""}
                fieldsDispatch={fieldsDispatch}
                face={face}
              />
            );
          }

          if (field.type === FIELD_TYPE.TEXT) {
            return (
              <Quill
                key={key}
                id={field.id}
                htmlContent={field.htmlContent || ""}
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
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={addTextQuill}
            startIcon={<Add />}
          >
            Text
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={addMathQuill}
            startIcon={<Add />}
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
    </Paper>
  );
};

export default React.forwardRef(FormFace);

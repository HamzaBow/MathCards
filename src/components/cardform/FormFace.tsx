import React from "react";

import { addStyles } from "react-mathquill";
import Quill from "../utilities/Quill";
import MathField from "../utilities/MathField";

import { Button, cardActionAreaClasses, IconButton, Paper, Tooltip } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DeleteIcon from '@mui/icons-material/Delete';

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { CardFormActions, FrontNBackFields } from "./CardForm";
import { Add } from "@mui/icons-material";
import { FieldType } from "./CardForm";
import useEventListener from "hooks/useEventListener";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

addStyles();

interface OtherProps {
  face: "front" | "back";
  activeStep: number
  next: Function;
  prev?: Function;
  frontNBackFields: FrontNBackFields;
  fieldsDispatch: Function;
}

const FormFace: React.ForwardRefRenderFunction<HTMLDivElement, OtherProps> = (
  { face, activeStep, next, prev, frontNBackFields, fieldsDispatch },
  ref
) => {
  face = face ?? "front";
  const capitalizedFace =
    face.charAt(0).toUpperCase() + face.toLowerCase().slice(1);

  const addTextQuill = () => {
    fieldsDispatch({
      type: CardFormActions.AddTextQuill,
      payload: { id: Date.now(), face: face },
    });
  };

  const addMathQuill = () => {
    fieldsDispatch({
      type: CardFormActions.AddMathQuill,
      payload: { id: Date.now(), face: face },
    });
  };

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (
      (activeStep === 1 && face === "front") ||
      (activeStep === 0 && face === "back")
    )
      return;
    if (e.ctrlKey && e.key === "m") {
      addMathQuill()
    }
    if (e.ctrlKey && e.key === "e") {
      addTextQuill()
    }
  });
  const dragEnd = (result:any) => {
    const { destination, source, draggableId } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    const newItems = [...frontNBackFields[face]];
    const item = newItems.find((i) => i.id.toString() === draggableId)
    newItems.splice(source.index, 1)
    // @ts-ignore
    newItems.splice(destination.index, 0, item)
    fieldsDispatch({
      type: CardFormActions.SetFields,
      payload: {
        frontNBackFields: {
          front: face === "front" ? newItems : frontNBackFields.front,
          back: face === "back" ? newItems : frontNBackFields.back,
        },
      },
    });
    // setItems(newItems)
  }
  const handleDelQuill = (id: number) => {
    fieldsDispatch({
      type: CardFormActions.DelQuill,
      payload: {
        face,
        id
      }
    })
  }

  return (
    <Paper className={"card-form__step"} ref={ref}>
      <div>
        <Tooltip title={`${capitalizedFace} face of the card`} placement="top">
          <h1 style={{ marginTop: 0, textAlign: "center" }}>
            {capitalizedFace}
          </h1>
        </Tooltip>
        <div className="card-form__face__prompt-buttons-container">
          <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <Tooltip
              title="Add a text field to this card"
              enterDelay={800}
              placement="top"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={addTextQuill}
                startIcon={<Add />}
              >
                Text
              </Button>
            </Tooltip>

            <Tooltip
              title="Add a math field to this card"
              enterDelay={800}
              placement="top"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={addMathQuill}
                startIcon={<Add />}
              >
                Math
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
      <DragDropContext onDragEnd={dragEnd}>
        <Droppable droppableId="1">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="fields-container"
            >
              {frontNBackFields[face].map((field, key) => {
                    if (field.type === FieldType.Math) {
                      return (
                        <Draggable key={field.id} draggableId={field.id.toString()} index={key}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="draggable-son"
                            >
                              <IconButton {...provided.dragHandleProps}>
                                <DragHandleIcon />
                              </IconButton>
                              <MathField
                                key={key}
                                id={field.id}
                                latex={field.latex || ""}
                                fieldsDispatch={fieldsDispatch}
                                face={face}
                              />
                              <Tooltip title="Delete field" placement="right" >
                                <IconButton onClick={() => handleDelQuill(field.id)} >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </div>
                          )}
                        </Draggable>
                      );
                    }

                    if (field.type === FieldType.Text) {
                      return (
                        <Draggable key={field.id} draggableId={field.id.toString()} index={key}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="draggable-son"
                            >
                              <IconButton {...provided.dragHandleProps}>
                                <DragHandleIcon />
                              </IconButton>
                              <Quill
                                key={key}
                                id={field.id}
                                htmlContent={field.htmlContent || ""}
                                fieldsDispatch={fieldsDispatch}
                                face={face}
                              />
                              <Tooltip title="Delete field" placement="right" >
                                <IconButton onClick={() => handleDelQuill(field.id)} >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </div>
                          )}
                        </Draggable>
                      );
                    }
                    if (field.type !== FieldType.Math && field.type !== FieldType.Text) {
                      throw new TypeError(
                        "type of the field should be either text or math"
                      );
                    }
                    return <></>;
                  })
                }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

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
          Next
        </Button>
      </ButtonGroup>
    </Paper>
  );
};

export default React.forwardRef(FormFace);

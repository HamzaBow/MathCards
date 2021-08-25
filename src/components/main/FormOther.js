import React from "react";

import DifficultyLevels from "./DifficultyLevels";

import { addStyles } from "react-mathquill";
// import { useReducer, useState } from "react";

import { Button } from "@material-ui/core"
import { ButtonGroup } from "@material-ui/core";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TopicTags from "./TopicTags";

addStyles();

const FormOther = ({ prev }, ref) => {

  const save = () => {

  }

  return (
    <div className={'card-form__step'} ref={ref}>
        <h1 style={{ marginTop: 0 }}>Other Info</h1>
        <DifficultyLevels />
        <TopicTags />
        <ButtonGroup>
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

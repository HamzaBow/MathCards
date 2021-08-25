import React from "react";

import DifficultyLevels from "./DifficultyLevels";

import { Button } from "@material-ui/core"
import { ButtonGroup } from "@material-ui/core";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TopicTags from "./TopicTags";

const FormOther = ({ prev }, ref) => {

  const save = () => {

  }

  const hrStyle = {
    width: "32rem",
    opacity: "0.3",
  }
  return (
    <div className={'card-form__step'} ref={ref}>
        <h1 style={{ margin: 0 }}>Other Info</h1>
        <hr style={hrStyle}/>
        <DifficultyLevels />
        <hr style={hrStyle}/>
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

import React from "react";

import DifficultyLevels from "./DifficultyLevels";

import { Button } from "@material-ui/core"
import { ButtonGroup } from "@material-ui/core";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TopicTags from "./TopicTags";
import { useState } from "react";

const FormOther = ({ operationType, prev, activeStep, setActiveStep, setFinished, difficultyLevels, setDifficultyLevels, tags, setTags, addCard, updateCard }, ref) => {

  const [saveDisabled, setSaveDisabled] = useState(false);

  if(activeStep === 3){
  }

  const save = () => {
    if(activeStep !== 3){
      setSaveDisabled(true);
      
      setFinished(true);
      if(operationType === 'create'){
        addCard();
      } else {
        updateCard();
      }
      

      return;
    }
    throw new RangeError("activeStep is 3 !!!. It should have the value 2 in this step.")
  }

  const previous = () => {
    prev()
    if(activeStep === 3){
      setActiveStep(prevStep => prevStep - 1) // prev() is going to decrement activeStep by one (total -2 decrement)
    }
    if(activeStep > 3){
      throw new RangeError(`value of activeStep shouldn't be greater than 3. activeStep has value ${activeStep}`)
    }
  }

  const hrStyle = {
    width: "32rem",
    opacity: "0.3",
  }



  return (
    <div className={'card-form__step'} ref={ref}>
        <h1 style={{ margin: 0 }}>Other Info</h1>
        <hr style={hrStyle}/>
        <DifficultyLevels difficultyLevels={difficultyLevels} setDifficultyLevels={setDifficultyLevels}/>
        <hr style={hrStyle}/>
        <TopicTags tags={tags} setTags={setTags} />
        <ButtonGroup>
            <Button
              className="card-form__next-btn"
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIcon />}
              style={{ alignSelf: "end" }}
              onClick={() => previous()}
            >
              Prev
            </Button>

            <Button
              className="card-form__next-btn"
              variant="contained"
              color="primary"
              style={{ alignSelf: "end" }}
              onClick={() => save()}
              disabled={saveDisabled}
            >
              {operationType === 'create' ? "save" : "save changes"}
            </Button>
        </ButtonGroup>

    </div>
  );
};


export default React.forwardRef(FormOther);

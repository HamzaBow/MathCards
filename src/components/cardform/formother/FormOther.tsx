import React, { useState, useEffect } from "react";

import DifficultyLevels from "./DifficultyLevels";

import { Button } from "@material-ui/core"
import { ButtonGroup } from "@material-ui/core";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TopicTags from "./TopicTags";
import { OperationType, DifficultyLevelsInterface } from '../CardForm'
import { TagOption } from './TopicTags'

interface OtherProps {
  operationType: OperationType;
  prev: Function;
  activeStep: number;
  setActiveStep(step: number | Function): void;
  setFinished(finished: boolean): void;
  difficultyLevels: DifficultyLevelsInterface;
  setDifficultyLevels(difficultyLevels: DifficultyLevelsInterface): void;
  tags: string[];
  setTags(tagsToSet: string[]): void;
  addCard: Function;
  updateCard: Function;
}

const FormOther: React.ForwardRefRenderFunction<HTMLDivElement, OtherProps> = ({ operationType, prev, activeStep, setActiveStep, setFinished, difficultyLevels, setDifficultyLevels, tags, setTags, addCard, updateCard }, ref) => {

  const [saveDisabled, setSaveDisabled] = useState(false);

  const [tagOptions, setTagOptions] = useState<TagOption[]>([])

  useEffect(() => {
    const getTagOptions = async () => {
      const tagsFromServer = await fetchTagOptions();
      setTagOptions(tagsFromServer);
    }
    getTagOptions();
  }, [])

  const fetchTagOptions = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/tagoptions`);
    const data = await res.json();
    return data;
  }

  function getNewTags() {
    const newTags = tags.filter((tag) => !tagOptions.map((tagOption) => tagOption.tag).includes(tag))
    return newTags
  }

  const saveNewTags = async (newTags: string[]) => {
    await Promise.all(newTags.map( async (tag) => {
        await fetch(`${process.env.REACT_APP_API_URL}/tagoptions`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ id: `${Date.now().toString()}-${Math.random().toString().slice(2, 6)}`, tag: tag })})
    }))
  }


  if (activeStep === 3) {
  }

  const save = () => {

    saveNewTags(getNewTags());

    if (activeStep !== 3) {
      setSaveDisabled(true);

      setFinished(true);
      if (operationType === 'create') {
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
    if (activeStep === 3) {
      setActiveStep((prevStep: number ) => prevStep - 1) // prev() is going to decrement activeStep by one (total -2 decrement)
    }
    if (activeStep > 3) {
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
      <hr style={hrStyle} />
      <DifficultyLevels difficultyLevels={difficultyLevels} setDifficultyLevels={setDifficultyLevels} />
      <hr style={hrStyle} />
      <TopicTags tags={tags} setTags={setTags} tagOptions={tagOptions} />
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

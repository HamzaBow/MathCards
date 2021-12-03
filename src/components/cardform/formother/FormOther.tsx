import React, { useState, useEffect, Dispatch } from "react";

import DifficultyLevels from "./DifficultyLevels";

import { Button, Paper } from "@mui/material"
import { ButtonGroup } from "@mui/material";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TopicTags from "./TopicTags";
import { OperationType, DifficultyLevelsInterface, FrontNBackFields } from '../CardForm'
import { TagOption } from './TopicTags'
import { fetchCreateCard, fetchUpdateCardPUT } from "api/cardAPI"
import { Action } from "App";
import { CARDS_ACTIONS } from "Constants";
import { useUser } from "contexts/UserContext";
import { useSnackbar } from "contexts/SnackbarContext";
import { useUpdateCards } from "contexts/CardsContext";

interface OtherProps {
  operationType: OperationType;
  prev: Function;
  activeStep: number;
  setActiveStep(step: number | Function): void;
  difficultyLevels: DifficultyLevelsInterface;
  setDifficultyLevels(difficultyLevels: DifficultyLevelsInterface): void;
  tags: string[];
  setTags(tagsToSet: string[]): void;
  frontNBackFields: FrontNBackFields;
  cardId?: string;
  handleCloseCardForm: Function
}

const FormOther: React.ForwardRefRenderFunction<HTMLDivElement, OtherProps> = (
  {
    operationType,
    prev,
    activeStep,
    setActiveStep,
    difficultyLevels,
    setDifficultyLevels,
    tags,
    setTags,
    frontNBackFields,
    cardId,
    handleCloseCardForm,
  },
  ref
) => {

  const cardsDispatch = useUpdateCards();

  const [saveDisabled, setSaveDisabled] = useState(false);

  const [tagOptions, setTagOptions] = useState<TagOption[]>([]);

  const user = useUser()

  const displaySnackbar = useSnackbar();

  useEffect(() => {
    const getTagOptions = async () => {
      const tagsFromServer = await fetchTagOptions();
      setTagOptions(tagsFromServer);
    };
    getTagOptions();
  }, []);

  const fetchTagOptions = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/tags`);
    const data = await res.json();
    return data;
  };

  const save = async () => {

    if (activeStep !== 3) {
      setSaveDisabled(true);

      const { front, back } = frontNBackFields
      const cardData = { ownerId: user._id ,front, back, difficultyLevels, tags  };
      if (operationType === "create") {
        const card = await fetchCreateCard(cardData)
        cardsDispatch({type: CARDS_ACTIONS.NEW_CARD, payload: { card }})
      } else {
        const card = await fetchUpdateCardPUT(cardId as string, cardData)
        cardsDispatch({type: CARDS_ACTIONS.UPDATE_CARD, payload: { card }})
      }
      handleCloseCardForm();
      displaySnackbar("success", "Card saved successfully")
      return;
    }
    throw new RangeError(
      "activeStep is 3 !!!. It should have the value 2 in this step."
    );
  };

  const previous = () => {
    prev();
    if (activeStep === 3) {
      setActiveStep((prevStep: number) => prevStep - 1); // prev() is going to decrement activeStep by one (total -2 decrement)
    }
    if (activeStep > 3) {
      throw new RangeError(
        `value of activeStep shouldn't be greater than 3. activeStep has value ${activeStep}`
      );
    }
  };

  const hrStyle = {
    width: "32rem",
    opacity: "0.3",
  };

  return (
    <Paper className={"card-form__step"} ref={ref}>
      <h1 style={{ margin: 0 }}>Other Info</h1>
      <hr style={hrStyle} />
      <DifficultyLevels
        difficultyLevels={difficultyLevels}
        setDifficultyLevels={setDifficultyLevels}
      />
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
          {operationType === "create" ? "save" : "save changes"}
        </Button>
      </ButtonGroup>
    </Paper>
  );
};


export default React.forwardRef(FormOther);

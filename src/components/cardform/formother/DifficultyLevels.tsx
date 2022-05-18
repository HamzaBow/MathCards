import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { DifficultyLevelsInterface } from "../CardForm";

const labelStyle = {

    fontSize:   "1.2rem",
    fontWeight: 600,

    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "1rem",

}
interface Props {
  difficultyLevels: DifficultyLevelsInterface;
  setDifficultyLevels: Function;
}

export const DifficultyLevels : React.FC<Props> = ({ difficultyLevels, setDifficultyLevels }) => {

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" style={labelStyle}>Difficulty Levels</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          // value="veryEasy"
          control={<Checkbox color="primary"  checked={difficultyLevels.veryEasy} onChange={(event) => { setDifficultyLevels({...difficultyLevels, veryEasy: event.target.checked }) } } />}
          label="Very easy"
          labelPlacement="bottom"
        />
        <FormControlLabel
          // value="easy"
          control={<Checkbox color="primary"  checked={difficultyLevels.easy} onChange={(event) => { setDifficultyLevels({...difficultyLevels, easy: event.target.checked }) } } />}
          label="Easy"
          labelPlacement="bottom"
        />
        <FormControlLabel
          // value="medium"
          control={<Checkbox color="primary"  checked={difficultyLevels.medium} onChange={(event) => { setDifficultyLevels({...difficultyLevels, medium: event.target.checked }) } } />}
          label="Medium"
          labelPlacement="bottom"
        />
        <FormControlLabel
          // value="hard"
          control={<Checkbox color="primary"  checked={difficultyLevels.hard} onChange={(event) => { setDifficultyLevels({...difficultyLevels, hard: event.target.checked }) } } />}
          label="Hard"
          labelPlacement="bottom"
        />
        <FormControlLabel
          // value="veryHard"
          control={<Checkbox color="primary"  checked={difficultyLevels.veryHard} onChange={(event) => { setDifficultyLevels({...difficultyLevels, veryHard: event.target.checked }) } } />}
          label="Very hard"
          labelPlacement="bottom"
        />
      </FormGroup>
    </FormControl>
  );
};

export default DifficultyLevels;

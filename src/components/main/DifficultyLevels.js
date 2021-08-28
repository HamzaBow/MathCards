import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { labelStyle } from "./labelStyle";
import { useState } from "react";

export const DifficultyLevels = () => {

  const [veryEasy, setVeryEasy] = useState(false);
  const [easy,     setEasy]     = useState(false);
  const [medium,   setMedium]   = useState(false);
  const [hard,     setHard]     = useState(false);
  const [veryHard, setVeryHard] = useState(false);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" style={labelStyle}>Difficulty Levels</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          // value="veryEasy"
          control={<Checkbox color="primary"  checked={veryEasy} onChange={(event) => { setVeryEasy(event.target.checked) } } />}
          label="Very Easy"
          labelPlacement="bottom"
        />
        <FormControlLabel
          // value="easy"
          control={<Checkbox color="primary"  checked={easy} onChange={(event) => { setEasy(event.target.checked) } } />}
          label="Easy"
          labelPlacement="bottom"
        />
        <FormControlLabel
          // value="medium"
          control={<Checkbox color="primary"  checked={medium} onChange={(event) => { setMedium(event.target.checked) } } />}
          label="Medium"
          labelPlacement="bottom"
        />
        <FormControlLabel
          // value="hard"
          control={<Checkbox color="primary"  checked={hard} onChange={(event) => { setHard(event.target.checked) } } />}
          label="Hard"
          labelPlacement="bottom"
        />
        <FormControlLabel
          // value="veryHard"
          control={<Checkbox color="primary"  checked={veryHard} onChange={(event) => { setVeryHard(event.target.checked) } } />}
          label="Very Hard"
          labelPlacement="bottom"
        />
      </FormGroup>
    </FormControl>
  );
};

export default DifficultyLevels;

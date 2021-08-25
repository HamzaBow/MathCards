import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const DifficultyLevels = () => {

  const legendStyle = {
    fontSize:   "1.2rem",
    fontWeight: 600,

    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "1.5rem",

    color: "rgba(0, 0, 0, 0.7)",
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" style={legendStyle}>Difficulty Levels</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="veryEasy"
          control={<Checkbox color="primary" />}
          label="Very Easy"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="easy"
          control={<Checkbox color="primary" />}
          label="Easy"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="medium"
          control={<Checkbox color="primary" />}
          label="Medium"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="hard"
          control={<Checkbox color="primary" />}
          label="Hard"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="veryHard"
          control={<Checkbox color="primary" />}
          label="Very Hard"
          labelPlacement="bottom"
        />
      </FormGroup>
    </FormControl>
  );
};

export default DifficultyLevels;

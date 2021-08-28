import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { labelStyle } from "./labelStyle.js"

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function TopicTags() {
  const classes = useStyles();

  const [tags, setTags] = useState([tagOptions[2].topic])

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" style={labelStyle}>
        Choose Topics
      </FormLabel>
      <div className={classes.root}>
        {/* TODO: FIXME: this Autocomplete tag causes the first translation of FormFront not to happend, figure out how to fix it. */}
        <Autocomplete
          multiple
          id="tags-outlined"
          options={tagOptions.map((option) => option.topic)}
          // freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                // variant="outlined"
                color="primary"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              // label="freeSolo"
              placeholder="Type here"
            />
          )}


          value={tags}
          
          onChange={(event, value) => { setTags(value); console.log(tags) }}
        />
      </div>
    </FormControl>
  );
}

const tagOptions = [
  { topic: 'Complex Analysis', year: 2016 },
  { topic: 'Abstract Algebra', year: 2009 },
  { topic: 'Group Theory', year: 1973 },
  { topic: 'Linear Algebra', year: 1968 },
  { topic: 'Calculus', year: 1952 },
  { topic: 'Multivariable Calculus', year: 1995 },
  { topic: 'Topology', year: 1948 },
  { topic: 'Category Theory', year: 1921 },
  { topic: 'Mathematical Physics', year: 2000 },
  { topic: 'Number Theory', year: 2009 },
  { topic: 'Combinatorics', year: 1975 },
];


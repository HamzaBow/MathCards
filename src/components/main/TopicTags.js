import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { labelStyle } from "./labelStyle.js"

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" style={labelStyle}>
        Choose Topics
      </FormLabel>
      <div className={classes.root}>
        {/* TODO: FIXME: this Autocomplete tag causes the first translation of FormFront not to happend, figure out how to fix it. */}
        {/* <Autocomplete color="primary"
            multiple
            id="tags-standard"
            options={tags}
            getOptionLabel={(option) => option.title}
            // defaultValue={[tags[13]]}
            renderInput={(params) => (
            <TextField
                {...params}
                variant="standard"
                // label=""
                placeholder="Type here"
            />
            )}
        /> */}
        <Autocomplete
          multiple
          id="tags-standard"
          options={tags.map((option) => option.title)}
          defaultValue={[tags[5].title]}
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
        />
      </div>
    </FormControl>
  );
}

const tags = [
  { title: 'Complex Analysis', year: 2016 },
  { title: 'Abstract Algebra', year: 2009 },
  { title: 'Group Theory', year: 1973 },
  { title: 'Linear Algebra', year: 1968 },
  { title: 'Calculus', year: 1952 },
  { title: 'Multivariable Calculus', year: 1995 },
  { title: 'Topology', year: 1948 },
  { title: 'Category Theory', year: 1921 },
  { title: 'Mathematical Physics', year: 2000 },
  { title: 'Number Theory', year: 2009 },
  { title: 'Combinatorics', year: 1975 },
];


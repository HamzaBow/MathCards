import React, { useEffect, useState } from 'react';
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

export default function TopicTags({ tags, setTags}) {
  const classes = useStyles();
  const [tagOptions, setTagOptions] = useState([])

  useEffect(() => {
    const getTagOptions = async () => {
      const tagsFromServer = await fetchTags();
      setTagOptions(tagsFromServer);
    }
    getTagOptions();
  }, [])

  const fetchTags = async () => {
    const res = await fetch("http://localhost:5000/tags");
    const data = await res.json();
    return data;
  }

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
          options={tagOptions}
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
          
          onChange={(event, value) => { setTags(value)}}
        />
      </div>
    </FormControl>
  );
}


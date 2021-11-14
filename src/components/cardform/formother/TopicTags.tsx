import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip'
import makeStyles from '@mui/styles/makeStyles';
import TextField from '@mui/material/TextField';

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

const labelStyle = {

    fontSize:   "1.2rem",
    fontWeight: 600,

    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "1rem",

    color: "rgba(0, 0, 0, 0.7)",
}
export interface TagOption {
  id: string;
  tag: string;
}

interface Props {
  tags: string[];
  setTags: (value: string[]) => void;
  tagOptions: TagOption[];
}
const TopicTags : React.FC<Props> = ({ tags, setTags, tagOptions}) => {
  const classes = useStyles();

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" style={labelStyle}>
        Choose Topics
      </FormLabel>
      <div className={classes.root}>
        {/* TODO: FIXME: this Autocomplete tag causes the first translation of FormFront not to happend, figure out how to fix it. */}
        <Autocomplete
          freeSolo
          multiple
          id="tags-outlined"
          options={tagOptions.map((tagOption) => tagOption.tag)}
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
          
          onChange={(event, value: string[]) => { setTags(value)}}
        />
      </div>
    </FormControl>
  );
}

export default TopicTags;
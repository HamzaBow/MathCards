/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useTheme } from './../../contexts/ThemeContext'

interface Props {
  searchOptions: any;
}

const SearchBar: React.FC<Props> = ({ searchOptions }) => {
  const darkTheme = useTheme()

  const searchIconStyle = {
    color: darkTheme ? 'white' : 'inherit', 
  }
  return (
    <div style={{ flexGrow: 1 }}>
      {/* <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField {...params} label="freeSolo" margin="normal" variant="outlined" />
        )}
      /> */}
      <Autocomplete
        
        size="small"
        freeSolo
        id="free-solo-2-demo"
        // disableClearable
        options={searchOptions.map((option: any) => option.tag)}
        renderInput={(params) => (
            <div style={{ display: "flex"}}>{/*, border: "1px solid red"}}>*/}
                <TextField
                    {...params}
                    // label="Search input"
                    margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search' }}
                    style={{ margin: "0", borderRight: '0px' }}
                    placeholder="Search"
                />
                <IconButton size="small" style={{ borderRadius: "0", paddingLeft: '0.6rem', paddingRight: '0.6rem' }}>
                    {/* <Search style={{ width: "1rem", height: "1rem" }} /> */}
                    <Search style={searchIconStyle}/>
                </IconButton>
            </div>
        )}
      />
    </div>
  );
}
export default SearchBar;
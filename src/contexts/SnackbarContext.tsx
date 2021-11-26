import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import React, { MouseEventHandler, useContext } from 'react'
export interface State extends SnackbarOrigin {
  open: boolean;
}

const SnackbarContext = React.createContext({})

export function useSnackbar() {
  return useContext(SnackbarContext) as MouseEventHandler<HTMLButtonElement>
}

interface Props {
  children: JSX.Element;
}
const SnackbarProvider : React.FC<Props> = ({ children }) => {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const displaySnackbar = () => {
    setState({ ...state, open: true });
  }
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <SnackbarContext.Provider value={displaySnackbar}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="This is a notification"
        key={vertical + horizontal}
      />
      {children}
    </SnackbarContext.Provider>    
  )
}

export default SnackbarProvider


import Alert, { AlertColor } from '@mui/material/Alert'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import React, { MouseEventHandler, useContext, useState } from 'react'
export interface State extends SnackbarOrigin {
  open: boolean;
}

const SnackbarContext = React.createContext({})

export function useSnackbar() {
  return useContext(SnackbarContext) as (variant: AlertColor, msg: string) => MouseEventHandler<HTMLButtonElement>
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

  const [message, setMessage] = useState<String>("")
  const [severity, setSeverity] = useState<AlertColor>("info")

  const displaySnackbar = (variant: AlertColor, msg: string) => {
    setMessage(msg)
    setSeverity(variant)
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
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled" >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>    
  )
}

export default SnackbarProvider


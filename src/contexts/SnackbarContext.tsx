import Alert, { AlertColor } from '@mui/material/Alert'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import React, { useContext, useState } from 'react'
export interface State extends SnackbarOrigin {
  open: boolean;
}

const SnackbarContext = React.createContext({})

export function useSnackbar() {
  return useContext(SnackbarContext) as  (variant: AlertColor, msg: string, duration?: number | null | undefined) => void
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
  const [duration, setDuration] = useState<number | null | undefined>(null);

  const displaySnackbar = (
    variant: AlertColor,
    msg: string,
    duration: number | null | undefined = null
  ) => {
    setMessage(msg);
    setSeverity(variant);
    setDuration(duration);
    setState({ ...state, open: true });
  };
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
        autoHideDuration={duration}
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


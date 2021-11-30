import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Front', 'Back', 'Other Info'];
}

interface Props {
  activeStep: number;
}

const CardFormStepper : React.FC<Props> = ({ activeStep }) => {
  const classes = useStyles();

  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default CardFormStepper;
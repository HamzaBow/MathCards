import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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

// function getStepContent(stepIndex) {
//   switch (stepIndex) {
//     case 0:
//       return 'Front';
//     case 1:
//       return 'Back';
//     case 2:
//       return 'Other Info';
//     default:
//       return 'Unknown stepIndex';
//   }
// }

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
      {/* <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
        </div> */}
    </div> 
  );
}

export default CardFormStepper;
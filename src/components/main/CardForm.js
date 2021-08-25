import React, { useState, useRef, useEffect } from 'react'
import FormFace from './FormFace'
import FormOther from './FormOther'

import CardFormHeader from './CardFormHeader'
import HorizontalLabelPositionBelowStepper from './Stepper'

const CardForm = () => {

    //TODO: what if by mistake two properties are both true !!!, must figure out a better way to do this.
    const [formState, setFormState] = useState({
        front: true,
        back: false,
        other: false,
    })

    const front = useRef()
    const back = useRef()
    const other = useRef()

    const [activeStep, setActiveStep] = React.useState(0);

    useEffect(() => {
        front.current.style.transform = "translate(  -50%, -150vh )";
        front.current.style.animation = "transition: transform 0.2s ease-in-out";
    },[])

    //TODO: FIXME: refactor the inside of this useEffect hook (probably requires refactoring the whole page)
    useEffect(() => {

      console.log('use effect 2')

      if (formState.front === true) {
        front.current.style.transform = "translate(  -50%, -50% )";
        
        back.current.style.transform = "translate( 100vw, -50% )";

        other.current.style.transform = "translate( 100vw, -50% )";
      }

      if (formState.back === true) {
        front.current.style.transform = "translate(  -100vw, -50% )";

        back.current.style.transform  = "translate(  -50%, -50% )";

        other.current.style.transform = "translate( 100vw, -50% )";
      }


      if (formState.other === true) {
        front.current.style.transform = "translate(  -100vw, -50% )";

        back.current.style.transform  = "translate(  -100vw,  -50% )";

        other.current.style.transform = "translate(  -50%, -50% )";
      }

    }, [formState]);
    


    //TODO: use useReducer instead of useState (dispatch instead of two functions)
    function next(){
        if(formState.front === true){
            setFormState({front: false, back: true, other: false})            
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        if(formState.back === true){
            setFormState({front: false, back: false, other: true})            
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }

    function prev(){
        if(formState.back === true){
            setFormState({front: true, back: false, other: false})            
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
        if(formState.other === true){
            setFormState({front: false, back: true, other: false})            
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    }
// className="card-form__face card-form--other"

    return (
        <>
            <CardFormHeader />
            <FormFace  ref={front} face="front" next={next} />
            <FormFace  ref={back}  face="back"  next={next} prev={prev}/>
            <FormOther ref={other} prev={prev} activeStep={activeStep} setActiveStep={setActiveStep} />
            <div style={{position:"fixed", bottom: "0", left: "25%", right: "0", width: "50%"}}>
                <HorizontalLabelPositionBelowStepper activeStep={activeStep} />
            </div>
        </>
    )
}

export default CardForm

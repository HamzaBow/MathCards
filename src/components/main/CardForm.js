import React, { useState, useRef, useEffect, useReducer } from 'react'
import FormFace from './FormFace'
import FormOther from './FormOther'

import CardFormHeader from './CardFormHeader'
import CardFormStepper from './CardFormStepper'
import SuccessSnackBar from "./SuccessSnackBar";
import Overlay from '../utilities/Overlay'
import { CARD_FORM_ACTIONS, FIELD_TYPE } from "../../Constants";

const CardForm = ( { operationType } ) => {

    operationType = operationType ?? "create";

    // ******************************************* FIELDS *******************************************
    function newField(id, fieldType) {
        if (fieldType === FIELD_TYPE.TEXT) {
        return {
            id,
            type: fieldType,
            htmlContent: "",
        };
        }

        if (fieldType === FIELD_TYPE.MATH) {
        return {
            id,
            type: fieldType,
            latex: "",
        };
        }
    }

    function fieldsReducer(fields, action) {
        switch (action.type) {
        case CARD_FORM_ACTIONS.ADD_TEXT_QUILL:
            return [...fields, newField(action.payload.id, FIELD_TYPE.TEXT)];

        case CARD_FORM_ACTIONS.ADD_MATH_QUILL:
            return [...fields, newField(action.payload.id, FIELD_TYPE.MATH)];

        case CARD_FORM_ACTIONS.UPDATE_LATEX:
            return fields.map((field) => {
            if(field.id === action.payload.id){
                return { ...field, latex: action.payload.latex };
            }
            return field;
            })

        case CARD_FORM_ACTIONS.UPDATE_HTML_CONTENT:
            return fields.map((field) => {
            if(field.id === action.payload.id){
                return { ...field, htmlContent: action.payload.htmlContent };
            }
            return field;
            })

        default:
            return fields;
        }
    }

    const [fields, fieldsDispatch] = useReducer(fieldsReducer, []);

    // ****************************************** END FIELDS ****************************************



    // ****************************************** Difficulty Level ****************************************
    const [difficultyLevels, setDifficultyLevels] = useState({veryEasy: false, easy: false, medium: false, hard: false, veryHard: false})
    // *************************************** End Difficulty Level ****************************************

    //TODO: what if by mistake two properties are both true !!!, must figure out a better way to do this.
    const [formState, setFormState] = useState({
        front: true,
        back: false,
        other: false,
    })

    const [finished, setFinished] = useState(false);

    const front = useRef()
    const back = useRef()
    const other = useRef()  // other is the last form where the user adds tags and difficulty levels to the new card.

    const [activeStep, setActiveStep] = React.useState(0);

    useEffect(() => {
        front.current.style.transform = "translate(  -50%, -150vh )";
        front.current.style.animation = "transition: transform 0.2s ease-in-out";
    },[])

    useEffect(() => {

        if(operationType === 'create'){
            document.title = 'New Card';
        }
        if(operationType === 'update'){
            document.title = 'Update Card';
        }
        return () => {
            document.title = 'Math Cards';
        }
    },[operationType])

    //TODO: FIXME: refactor the inside of this useEffect hook (probably requires refactoring the whole page)
    useEffect(() => {

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
            <Overlay />
            { !finished ?
            <>
                <CardFormHeader />
                <FormFace  ref={front} face="front" next={next}             fields={fields} fieldsDispatch={fieldsDispatch} />
                <FormFace  ref={back}  face="back"  next={next} prev={prev} fields={fields} fieldsDispatch={fieldsDispatch} />
                <FormOther ref={other} prev={prev} activeStep={activeStep} setActiveStep={setActiveStep}  setFinished={setFinished} difficultyLevels={difficultyLevels} setDifficultyLevels={setDifficultyLevels}/>
                <div style={{position:"fixed", bottom: "0", left: "25%", right: "0", width: "50%"}} >
                    <CardFormStepper activeStep={activeStep}  />
                </div>
            </>
            :
            <SuccessSnackBar />
            }
        </>
    )
}

export default CardForm

import React, { useState, useRef, useEffect, useReducer, Dispatch } from 'react'
import { useParams } from 'react-router-dom'
import FormFace from './FormFace'
import FormOther from './formother/FormOther'

import CardFormStepper from './CardFormStepper'
import SuccessSnackBar from "./SuccessSnackBar";
import Overlay from '../utilities/Overlay'
import { CARDS_ACTIONS, CARD_FORM_ACTIONS, FIELD_TYPE } from "../../Constants";

interface Action {
  type: string;
  payload: any;
}

export type FieldType = "MATH" | "TEXT";

export interface Field {
  id: number;
  type: FieldType;
  htmlContent?: string;
  latex?: string;
}

export interface FrontNBackFields {
  front: Field[];
  back: Field[]
}

export interface DifficultyLevelsInterface {
  veryEasy: boolean;
  easy: boolean;
  medium: boolean;
  hard: boolean;
  veryHard: boolean;
}

export interface CardInterface {
  _id: string;
  front: Field[];
  back: Field[];
  difficultyLevels: DifficultyLevelsInterface; 
  tags: string[];
}
export type OperationType = 'edit' | 'create';
interface Props {
  operationType: OperationType; 
  cards?: CardInterface[];
  cardsDispatch: Dispatch<Action> 
}

const CardForm: React.FC<Props>  = ( { operationType, cards, cardsDispatch } ) => {

    interface RouteParams {
      id: string;
    }
    const params = useParams<RouteParams>();

    // ******************************************* FIELDS *******************************************
    function newField(id: number, fieldType: "MATH" | "TEXT") {
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

    function frontNBackFieldsReducer(frontNBackFields: FrontNBackFields, action: Action) {
        type Face = "front" | "back";

        let face: Face = "front";
        let otherFace: Face = "back";

        if(action.payload.face === 'back'){
            face = 'back';
            otherFace = 'front';
        }

        switch (action.type) {
            case CARD_FORM_ACTIONS.ADD_TEXT_QUILL:
                return { [otherFace]: frontNBackFields[otherFace], [face]: [...frontNBackFields[face], newField(action.payload.id, 'TEXT')]};

            case CARD_FORM_ACTIONS.ADD_MATH_QUILL:
                return { [otherFace]: frontNBackFields[otherFace], [face]: [...frontNBackFields[face], newField(action.payload.id, 'MATH')]};

            case CARD_FORM_ACTIONS.UPDATE_LATEX:
                return {[otherFace]: [...frontNBackFields[otherFace]], [face]: frontNBackFields[face].map((field) => {
                if(field.id === action.payload.id){
                    return { ...field, latex: action.payload.latex };
                }
                return field;
                })}

            case CARD_FORM_ACTIONS.UPDATE_HTML_CONTENT:
                return {[otherFace]: frontNBackFields[otherFace], [face]: frontNBackFields[face].map((field) => {
                if(field.id === action.payload.id){
                    return { ...field, htmlContent: action.payload.htmlContent };
                }
                return field;
                })}
            case CARD_FORM_ACTIONS.SET_FIELDS:
                return action.payload.frontNBackFields;

            default:
                return frontNBackFields;
        }
    }

    const [frontNBackFields, frontNBackFieldsDispatch] = useReducer(frontNBackFieldsReducer, {front: [], back: [], other: []});



    // ****************************************** Difficulty Levels ****************************************
    const [difficultyLevels, setDifficultyLevels] = useState({veryEasy: false, easy: false, medium: false, hard: false, veryHard: false})

    // ************************************************* Tags *********************************************
    const [tags, setTags] = useState<string[]>([])


    // *************************************** END OF NEW CARD-RELATED STATES ****************************************

    useEffect(() => {
        if(operationType === 'edit'){
            const card: CardInterface = cards?.find((card: CardInterface) => card?._id === params.id) as CardInterface; 
            frontNBackFieldsDispatch({type: CARD_FORM_ACTIONS.SET_FIELDS, payload: {frontNBackFields: {front: card?.front, back: card?.back} }})
            setDifficultyLevels(card.difficultyLevels)
            setTags(card.tags)
        }
    }, [])


    //TODO: what if by mistake two properties are both true !!!, must figure out a better way to do this.
    const [formState, setFormState] = useState({
        front: true,
        back: false,
        other: false,
    })

    const [finished, setFinished] = useState(false);

    const front = useRef<HTMLDivElement>(null)
    const back = useRef<HTMLDivElement>(null)
    const other = useRef<HTMLDivElement>(null)  // other is the last form where the user adds tags and difficulty levels to the new card.

    const [activeStep, setActiveStep] = React.useState(0);

    useEffect(() => {
      if(front !== null && front.current !== null){
        front.current.style.transform = "translate(  -50%, -150vh )";
        front.current.style.animation = "transition: transform 0.2s ease-in-out";
      } else {
        console.error("front or front.current is null")
      }
    },[])

    useEffect(() => {

        if(operationType === 'create'){
            document.title = 'New Card';
        }
        if(operationType === 'edit'){
            document.title = 'Edit Card';
        }
        return () => {
            document.title = 'MathCards';
        }
    },[operationType])

    //TODO: FIXME: refactor the inside of this useEffect hook (probably requires refactoring the whole page)
    useEffect(() => {

      if(front !== null && front.current !== null &&
         back !== null && back.current !== null &&
         other !== null && other.current !== null){
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
    } else {
      console.error("`front`, `back` or `other` refs are null (or their current property is null)")
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
    const addCard = async () =>{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/cards`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({...frontNBackFields, difficultyLevels, tags})
        })
        const data = await res.json()
        cardsDispatch({type: CARDS_ACTIONS.NEW_CARD, payload: { card: data}})
    }

    const updateCard = async () =>{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/cards/${params.id}`,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({...frontNBackFields, difficultyLevels, tags})
        })
        const data = await res.json()
        cardsDispatch({type: CARDS_ACTIONS.UPDATE_CARD, payload: { data: data }})
    }

    return (
      <>
        <Overlay />
        {!finished ? (
          <>
            {/* <CardFormHeader > {operationType === "create" ? "New Card" : "Edit Card"}</CardFormHeader> */}
            <FormFace
              ref={front}
              face="front"
              next={next}
              frontNBackFields={frontNBackFields}
              fieldsDispatch={frontNBackFieldsDispatch}
            />
            <FormFace
              ref={back}
              face="back"
              next={next}
              prev={prev}
              frontNBackFields={frontNBackFields}
              fieldsDispatch={frontNBackFieldsDispatch}
            />
            <FormOther
              operationType={operationType}
              ref={other}
              prev={prev}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              setFinished={setFinished}
              difficultyLevels={difficultyLevels}
              setDifficultyLevels={setDifficultyLevels}
              tags={tags}
              setTags={setTags}
              frontNBackFields={frontNBackFields}
              cardsDispatch={cardsDispatch}
              addCard={addCard}
              updateCard={updateCard}
            />
            <div
              style={{
                position: "fixed",
                bottom: "0",
                left: "25%",
                right: "0",
                width: "50%",
              }}
            >
              <CardFormStepper activeStep={activeStep} />
            </div>
          </>
        ) : (
          <SuccessSnackBar />
        )}
      </>
    );
}

export default CardForm

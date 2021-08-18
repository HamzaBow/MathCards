import { addStyles, StaticMathField } from "react-mathquill"
import { ACTIONS } from "../../App"

addStyles();

// const Card = ({ setDisplay, card, setShowAll, setFrontIsShown, cards, setChosenCardId, setDarkBgActive, setMainCardActive }) => {
const Card = ({ card, dispatch }) => {
    // TODO: use useReducer to CRUD cards
    // FIXME: sle

    const displayMainCard = (id) => {

        // setDisplay({ mainCard: true, cardForm: false })
        dispatch({ type: ACTIONS.SET_MAIN_CARD, payload: { cardId: card.id } })


        // setShowAll(false);
        // setFrontIsShown(true);
        // setChosenCardId(key)
        // setMainCardActive(true);
        // setDarkBgActive(true);
    }
    return (
        <div className="container-item" style={{ boxShadow: "3px 5px 20px gray" }} onClick={() => displayMainCard(card.id)}>
            <div className="card">
                <div className="front">
                    <h2>{card.front.question}</h2>
                    <StaticMathField style={{ fontSize: "2em" }} >{card.front.formula}</StaticMathField>
                </div>

                <div className="back">
                    <StaticMathField style={{ fontSize: "2em" }} >{card.back.formula}</StaticMathField>
                    <h2>{card.back.comment}</h2>
                </div>
            </div>
        </div>
    )
}

export default Card

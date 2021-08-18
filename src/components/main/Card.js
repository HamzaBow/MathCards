import {useContext} from "react"
import { addStyles, StaticMathField } from "react-mathquill"
import { ACTIONS, THEME_COLORS } from "../../App"
import {ThemeContext} from "../../App"

addStyles();

// const Card = ({ setDisplay, card, setShowAll, setFrontIsShown, cards, setChosenCardId, setDarkBgActive, setMainCardActive }) => {
const Card = ({ card, dispatch }) => {
    // TODO: use useReducer to CRUD cards

    const darkTheme = useContext(ThemeContext)


    const displayMainCard = (id) => {

        // setDisplay({ mainCard: true, cardForm: false })
        dispatch({ type: ACTIONS.SET_MAIN_CARD, payload: { cardId: card.id } })


        // setShowAll(false);
        // setFrontIsShown(true);
        // setChosenCardId(key)
        // setMainCardActive(true);
        // setDarkBgActive(true);
    }
    const containerItemStyle = {
        boxShadow:       darkTheme ? "none"                  : "3px 5px 20px gray", 
        color:           darkTheme ? THEME_COLORS.GRAY.LIGHT : THEME_COLORS.GRAY.DARK,
        backgroundColor: darkTheme ? THEME_COLORS.GRAY.DARKER  : THEME_COLORS.GRAY.LIGHT
    }
    return (
        <div className="container-item" style={containerItemStyle} onClick={() => displayMainCard(card.id)}>
            <div className="card">
                <div className="front">
                    <h3>{card.front.question}</h3>
                    <StaticMathField style={{ fontSize: "2em" }} >{card.front.formula}</StaticMathField>
                </div>

                <div className="back">
                    <StaticMathField style={{ fontSize: "2em" }} >{card.back.formula}</StaticMathField>
                    <h3>{card.back.comment}</h3>
                </div>
            </div>
        </div>
    )
}

export default Card

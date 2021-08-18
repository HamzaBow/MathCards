import {useContext} from "react"
import { addStyles, StaticMathField } from "react-mathquill"
import { ACTIONS, THEME_COLORS } from "../../Constants"
import {ThemeContext} from "../../App"

addStyles();

const Card = ({ card, dispatch }) => {

    const darkTheme = useContext(ThemeContext)

    const displayMainCard = (id) => {
        dispatch({ type: ACTIONS.SET_MAIN_CARD, payload: { cardId: card.id } })
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

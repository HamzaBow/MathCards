import { useContext } from "react"
import { addStyles, StaticMathField } from "react-mathquill"
import { ACTIONS, COLORS } from "../../Constants"
import { ThemeContext } from "../../App"
import { BsFillCaretDownFill } from "react-icons/bs"

addStyles();

const Card = ({ card, dispatch }) => {

    const darkTheme = useContext(ThemeContext)

    const displayMainCard = (id) => {
        dispatch({ type: ACTIONS.SET_MAIN_CARD, payload: { cardId: card.id } })
    }

    const containerItemStyle = {
        boxShadow: darkTheme ? "none" : "3px 5px 20px gray",
        color: darkTheme ? COLORS.GRAY_LIGHT : COLORS.GRAY_DARK,
        backgroundColor: darkTheme ? COLORS.GRAY_DARKER : COLORS.GRAY_LIGHT
    }
    return (
        <div className="container-item" style={containerItemStyle} onClick={() => displayMainCard(card.id)}>
            <div className="card">
                {/* TODO: show Caret only on hover */}
                <BsFillCaretDownFill style={{ float: "right", marginTop: "0.5rem", marginRight: "1rem" }} />
                <div className="front">
                    <h3>{card.front.question}</h3>
                    <StaticMathField style={{ fontSize: "2em" }} >{card.front.formula}</StaticMathField>
                </div>

                {/* <div className="back">
                    <BsFillCaretDownFill />
                    <StaticMathField style={{ fontSize: "2em" }} >{card.back.formula}</StaticMathField>
                    <h3>{card.back.comment}</h3>
                </div> */}
            </div>
        </div>
    )
}

export default Card

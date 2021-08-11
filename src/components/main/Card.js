import { addStyles, StaticMathField } from "react-mathquill"

addStyles();

const Card = ({ card, setShowAll, setFrontIsShown, cards, setChosenCardId, setDarkBgActive }) => {

    const showOpenedCard = (key) => {
        setShowAll(false);
        setFrontIsShown(true);
        setChosenCardId(key)
        const mainCard = document.getElementById("opened-card");
        mainCard.style = "visibility: visible; opacity: 1;"
        setDarkBgActive(true);


    }
    return (
        <div className="container-item" style={{ boxShadow: "3px 5px 20px gray" }} onClick={() => showOpenedCard(card.id)}>
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

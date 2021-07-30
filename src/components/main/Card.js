import { addStyles, StaticMathField } from "react-mathquill"

addStyles();

const Card = ({ card, setShowAll, setFrontIsShown, cards, setChosenCardId }) => {

    const showOpenedCard = (key) => {
        setShowAll(false);
        setFrontIsShown(true);
        setChosenCardId(key)
        const mainCard = document.getElementById("opened-card");
        const backGr = document.getElementById("dark-backgr");


        // const myCard = cards.filter((card) => card.id == key)[0];

        // mainCard.innerHTML = `<div class="card">
        //                       <div class="front">
        //                           <h2>${myCard.front.question}</h2>
        //                           <h2>${myCard.front.formula}</h2>
        //                       </div>

        //                       <div class="back">
        //                           <h2>${myCard.back.formula}</h2>
        //                           <h2>${myCard.back.comment}</h2>
        //                       </div>
        //                   </div>`

        mainCard.style = "visibility: visible; opacity: 1;"
        backGr.style = "visibility: visible; opacity: 0.5;"

    }
    return (
        <div className="container-item" onClick={() => showOpenedCard(card.id)}>
            <div className="card">
                <div className="front">
                    <h2>{card.front.question}</h2>
                    {/* <h2>{card.front.formula}</h2> */}
                    <StaticMathField style={{ fontSize: "2em" }} >{card.front.formula}</StaticMathField>
                </div>

                <div className="back">
                    {/* <h2>{card.back.formula}</h2> */}
                    <StaticMathField style={{ fontSize: "2em" }} >{card.back.formula}</StaticMathField>
                    <h2>{card.back.comment}</h2>
                </div>
            </div>
        </div>
    )
}

export default Card

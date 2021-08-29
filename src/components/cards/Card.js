import React from 'react'
import { StaticMathField } from "react-mathquill"
import { CARD_LAYOUT, CARD_SIZE } from '../../Constants'; 
import { COLORS } from "../../Constants"
import { BsFillCaretDownFill } from "react-icons/bs"
import { useTheme } from "../../ThemeContext"
import { useHistory } from 'react-router';


const Card = ({card, size, layout, dimentions, flippable}) => {
    const history = useHistory();

    const darkTheme = useTheme();

    // ********************* Smart Defaults.**********************
    layout    = layout    ?? CARD_LAYOUT.HUG_CONTENT;
    size      = size      ?? CARD_SIZE.MEDIUM; 
    flippable = flippable ?? false;

    card      = (typeof card === "object" && card !== null) ? card : {}

    if (layout === CARD_LAYOUT.FIXED_SIZE){
        switch (size) {

            case CARD_SIZE.SMALL:
                dimentions = dimentions ?? { width: "10rem", height: "15rem"}
                break;

            case CARD_SIZE.MEDIUM:
                dimentions = dimentions ?? { width: "20rem", height: "30rem"}
                break;

            case CARD_SIZE.LARGE:
                dimentions = dimentions ?? { width: "30rem", height: "45rem"}
                break;

            default: // set it to medium
                dimentions = dimentions ?? { width: "20rem", height: "30rem"}
                break;
        }
    }
    // ****************** End of Smart Defaults ******************

    let width  = "auto";
    let height = "auto";

    if (layout === CARD_LAYOUT.FIXED_SIZE) {
        width  = dimentions.width;
        height = dimentions.height;
    }

    // TODO: 
    const containerItemStyle = {
      width,
      height,

      boxShadow: darkTheme ? "none" : "3px 5px 20px gray",
      color: darkTheme ? COLORS.GRAY_LIGHT : COLORS.GRAY_DARK,
      backgroundColor: darkTheme ? COLORS.GRAY_DARKER : COLORS.GRAY_LIGHT,
    };
    

    // TODO: the rest of the code is to be refactored, it was copied and pasted from the old Card.js component
    const displayMainCard = (id) => {
        history.push(`/maincard/${card.id}`)
    }
    return (
      <div
        className="container-item"
        style={containerItemStyle}
        onClick={() => displayMainCard(card.id)}
      >
        <div className="card">
          <BsFillCaretDownFill
            className="card-caret-down"
            style={{
              float: "right",
              marginTop: "0.5rem",
              marginRight: "1rem",
              visibility: "hidden",
            }}
          />

          {/* <div className="front">
            <h3>{card.front?.question}</h3>
            <StaticMathField style={{ fontSize: "2em" }}>
              {card.front?.formula}
            </StaticMathField>
          </div> */}


          <div className="front">
            {card.front.map((field, key) => {
                if(field.type === 'MATH'){
                  return <StaticMathField key={key} style={{ fontSize: "2rem" }}>{field.latex}</StaticMathField>
                }
                if(field.type === 'TEXT'){
                  return <div key={key} dangerouslySetInnerHTML={{__html: field.htmlContent}}></div>
                }
                return <></>
              })
            }
          </div>

          {(() => {
            if (flippable) {
              return (
                <div className="face back">
                  <h3>{card.back?.question}</h3>
                  <StaticMathField style={{ fontSize: "2em" }}>
                    {card.front?.formula}
                  </StaticMathField>
                </div>
              );
            }
          })()}

        </div>
      </div>
    );
}

export default Card

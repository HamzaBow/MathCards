import { addStyles, StaticMathField } from "react-mathquill";
import { useState, useEffect, useRef } from "react";
import { HiLightBulb } from "react-icons/hi";
import Overlay from "../utilities/Overlay";
import { useParams } from "react-router-dom";
import { CardInterface } from '../cardform/CardForm'
import { Paper } from "@material-ui/core";
addStyles();

interface Props {
  cards: CardInterface[];
}

const Maincard: React.FC<Props> = ({ cards }) => {
  interface RouteParams {
    id: string;
  }
  const params = useParams<RouteParams>();
  
  const chosenCard = cards.find(card => card.id === params.id)


  const [frontDisplayed, setFrontDisplayed] = useState(true);
  const divToRotate = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(divToRotate?.current){
      if (frontDisplayed) {
        divToRotate.current.style.transform = "rotateY(0deg)";
      } else {
        divToRotate.current.style.transform = "rotateY(180deg)";
      }
    } else {
      console.error('cant rotate card, check divToRotate');
    } 
  }, [frontDisplayed]);

  useEffect(() => {
    document.title = 'Main Card';
    return () => {
      document.title = 'MathCards';
    }
  })

  // TODO: useEffect( ... , []) which is on mount, press <space> flips the card, addEventListener

  // const mainCardStyle = {
  //   visibility: mainCardActive ? "visible" : "hidden",
  //   opacity: mainCardActive ? "1" : "0",
  // };
  const cardIconStyle: any = {
    color: "yellow",
    width: "3rem",
    height: "3rem",
    position: "absolute",
    top: "-3.5rem",
  };

  return (
    <>
      <Overlay />
      <div
        id="opened-card"
        className="container-item"
        // style={mainCardStyle}
        onClick={() => {
          // setFrontIsShown((shown) => !shown);
          setFrontDisplayed((displayed) => !displayed);
        }}
      >
        <div ref={divToRotate} className="card">
          <Paper className="front">
            {chosenCard?.front.map((field, key) => {
              if (field.type === "MATH") {
                return (
                  <StaticMathField key={key} style={{ fontSize: "2rem" }}>
                    {field.latex}
                  </StaticMathField>
                );
              }
              if (field.type === "TEXT") {
                return (
                  <div
                    key={key}
                    dangerouslySetInnerHTML={{
                      __html: field.htmlContent || "",
                    }}
                  ></div>
                );
              }
              return <></>;
            })}
          </Paper>

          <Paper className="back">
            <HiLightBulb style={cardIconStyle} />
            {chosenCard?.back.map((field, key) => {
              if (field.type === "MATH") {
                return (
                  <StaticMathField key={key} style={{ fontSize: "2rem" }}>
                    {field.latex}
                  </StaticMathField>
                );
              }
              if (field.type === "TEXT") {
                return (
                  <div
                    key={key}
                    dangerouslySetInnerHTML={{
                      __html: field.htmlContent || "",
                    }}
                  ></div>
                );
              }
              return <></>;
            })}
          </Paper>
        </div>
      </div>
    </>
  );
};

export default Maincard;

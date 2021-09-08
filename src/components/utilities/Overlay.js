// const DarkBackGr = ({ showAllCards, darkBgActive }) => {
import { Link } from "react-router-dom";

const Overlay = () => {
  const overlayStyle = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
    backgroundColor: "rgb(0, 0, 0)",
    visibility: "visible",
    opacity: "0.6",
    transition: "visibility 0.2s, opacity 0.2s linear",
  };
  return (
    <Link to='/' draggable="false" style={{cursor: 'default'}}>
      <div style={overlayStyle}></div>
    </Link>
  );
};

export default Overlay;

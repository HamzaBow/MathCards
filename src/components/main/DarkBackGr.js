const DarkBackGr = ({ showAllCards, darkBgActive }) => {
  const darkBgStyle = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
    backgroundColor: "rgb(0, 0, 0)",
    visibility: darkBgActive ? "visible" : "hidden",
    opacity: darkBgActive ? "0.6" : "0",
    transition: "visibility 0.2s, opacity 0.2s linear",
  };
  return <div style={darkBgStyle} onClick={() => showAllCards()}></div>;
};

export default DarkBackGr;

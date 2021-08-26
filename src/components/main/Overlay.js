// const DarkBackGr = ({ showAllCards, darkBgActive }) => {
const Overlay = ({ display, setDisplay }) => {
  const darkBgStyle = {
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
    <div
      style={darkBgStyle}
      onClick={() => setDisplay({ mainCard: false, cardForm: false })}
    ></div>
  );
};

export default Overlay;

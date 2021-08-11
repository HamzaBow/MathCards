const NewCardButton = ({ setShowAll, setDarkBgActive }) => {
  const openNewCardForm = () => {
    setShowAll(false);
    document.getElementById("new-card-form").style =
      "visibility: visible; opacity: 1;";
    setDarkBgActive(true);
  };

  return (
    <div style={newCardContainerStyle}>
      <div>
        <button
          className="btn-new-card-form"
          // style={newCardButtonStyle}
          onClick={() => openNewCardForm()}
        >
          Add a New Card
        </button>
      </div>
    </div>
  );
};

const newCardContainerStyle = {
  display: "flex",
  justifyContent: "center",
  paddingTop: "20px",
  paddingBottom: "20px",
};

// const newCardButtonStyle = {
//   cursor: "pointer",
//   fontSize: "1.5em",
//   backgroundColor: "lightblue",
//   borderColor: "lightblue",
//   borderRadius: "15px",
//   PaddingLeft: "15px",
//   PaddingRight: "15px",
//   height: "100px",
//   width: "300px",
// };

export default NewCardButton;

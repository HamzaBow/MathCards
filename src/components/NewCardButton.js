const NewCardButton = ({ setShowAll, setDarkBgActive, setCardFormActive }) => {
  const openNewCardForm = () => {
    setShowAll(false);
    setCardFormActive(true);
    setDarkBgActive(true);
  };

  return (
    <div style={newCardContainerStyle}>
      <div>
        <button className="btn-new-card-form" onClick={() => openNewCardForm()}>
          Add a New Card
        </button>
      </div>
    </div>
  );
};

const newCardContainerStyle = {
  display: "flex",
  justifyContent: "center",
  paddingTop: "1.5rem",
  paddingBottom: "1.5rem",
};

export default NewCardButton;

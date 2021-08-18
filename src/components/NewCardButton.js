const NewCardButton = ({ setDisplay }) => {
  return (
    <div style={newCardContainerStyle}>
      <div>
        <button
          className="btn-new-card-form"
          onClick={() => setDisplay({ mainCard: false, cardForm: true })}
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
  paddingTop: "1.5rem",
  paddingBottom: "1.5rem",
};

export default NewCardButton;

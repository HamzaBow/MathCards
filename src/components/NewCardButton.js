import { BsFillPlusSquareFill } from 'react-icons/bs'
import { COLORS } from '../Constants';

const NewCardButton = ({ setDisplay }) => {
  const addButtonStyle = {
    width: "3rem",
    height: "3rem",
    color: COLORS.PRIMARY_DARK,
    backgroundColor: "white",
    borderRadius: "0.5rem",
    cursor: "pointer"
  }
  return (
    <div style={newCardContainerStyle}>
      <div>
        {/* <button
          className="btn-new-card-form"
          onClick={() => setDisplay({ mainCard: false, cardForm: true })}
        >
          Add a New Card
        </button> */}
        <BsFillPlusSquareFill style={addButtonStyle}
          onClick={() => setDisplay({ mainCard: false, cardForm: true })}
        />
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

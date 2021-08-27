import { BsFillPlusSquareFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';

import { COLORS } from '../Constants';

const NewCardButton = () => {
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
        <Link to='/cardform'>
          <BsFillPlusSquareFill style={addButtonStyle} />
        </Link>
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

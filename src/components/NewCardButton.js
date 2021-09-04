import { BsFillPlusSquareFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';

import { COLORS } from '../Constants';
import { useTheme } from '../ThemeContext';

const NewCardButton = () => {
  const darkTheme = useTheme();

  const newCardContainerStyle = {
    display: "flex",
    justifyContent: "center",
    paddingTop: "6rem",
    // paddingBottom: "1.5rem",
    backgroundColor: darkTheme ? '#010409' : "#f0f2f5",
  };

  const addButtonStyle = {
    width: "3rem",
    height: "3rem",
    color: COLORS.PRIMARY_DARK,
    
    cursor: "pointer"
  }
  return (
    <div style={newCardContainerStyle}>
      <div>
        <Link to='/cardform/new'>
          <BsFillPlusSquareFill style={addButtonStyle} />
        </Link>
      </div>
    </div>
  );
};


export default NewCardButton;

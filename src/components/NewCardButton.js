const NewCardButton = () => {
    return (
        <div style={newCardContainerStyle}>
            <div>
                <button style={newCardButtonStyle}>Add a New Card</button> 
            </div>
        </div>
    )
}

const newCardContainerStyle = {
    display: "flex",
    justifyContent: "center",
    paddingTop: "20px",
    paddingBottom: "20px",
}


const newCardButtonStyle = {
    fontSize: "1.5em",
    backgroundColor: "lightblue",
    borderColor: "lightblue",
    borderRadius: "15px",
    PaddingLeft: "15px",
    PaddingRight: "15px",
    height: "100px",
    width: "300px",
}

export default NewCardButton



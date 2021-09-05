import React from 'react'

const headerStyle = {
    position: "fixed",
    left: "0",
    right:"0",
    top: "0",
    height: "10%",

    backgroundColor: "#fff",
    margin: "0",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

}
const CardFormHeader = ({children}) => {
    return (
        <h1 style={headerStyle}>
            {children}
        </h1>
    )
}

export default CardFormHeader

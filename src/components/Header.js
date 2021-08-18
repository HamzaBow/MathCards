const Header = ( { toggleTheme }) => {
    return (
        <header>
            <h1 style={headingStyle}>Math Cards</h1>            
            <button onClick={toggleTheme} style={{ display: "block", marginLeft: "auto", marginRight: "auto", padding: "1rem 1.5rem", fontSize: "1.5rem", borderRadius: "3rem" }}>Toggle theme</button>
        </header>
    )
}

const headingStyle = {
    textAlign: "center",
    backgroundColor: "gray",
    paddingTop: "30px",
    paddingBottom: "30px",
}

export default Header

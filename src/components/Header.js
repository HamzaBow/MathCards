import { ImSigma } from "react-icons/im";
import { BsMoon, BsBellFill, BsList, BsGearFill } from "react-icons/bs";
import { COLORS } from "../Constants";
import { useTheme, useThemeUpdate } from "../ThemeContext";
import SearchBar from "material-ui-search-bar"
import { useState } from "react";

const Header = () => {
    const toggleTheme = useThemeUpdate()
    const darkTheme = useTheme() 

    const [searchString, setSearchString] = useState('');
    const headerStyle = {
        fontFamily: "Roboto",
        backgroundColor: darkTheme ? 'rgb(30, 30, 30)' : 'white', //COLORS.PRIMARY_LIGHT,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        alignItems: 'center',
    }

    const headingStyle = {
        fontSize: "1.5rem",
        fontFamily: "Ubuntu",
        fontWeight: "400",
        display: "inline",
        margin: 0,

        color: darkTheme ? 'white' : 'black',
    }

    const iconStyle = {
        width: "1.3rem",
        height: "1.3rem",
        padding: "0.4rem",
        margin: "0.5rem",
        borderRadius: "2rem",
        cursor: "pointer",
        alt: "Toggle Dark Theme",
        // backgroundColor: darkTheme ? COLORS.GRAY_DARK : COLORS.GRAY_LIGHT,
        color: darkTheme ? COLORS.GRAY_LIGHT : COLORS.GRAY_DARK,
    }
    const sigmaContainerStyle = {
        width: '2rem',
        height: '2rem',
        borderRadius: "0.5rem",
        display: 'inline-grid',
        placeItems: 'center',
        backgroundColor: COLORS.PRIMARY_DARK
    }

    const SigmaIconStyle = {
        width: "1rem",
        height: "1rem",
        transform: "rotate(-20deg)",
        color: "white"
    }

    const headerMiddleStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.7rem',

        marginTop: "0.5rem",
        marginBottom: "0.5rem",
    }

    const logoStyle = {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.7rem',

        marginTop: "0.5rem",
        marginBottom: "0.5rem",
    }

    return (
        <header style={headerStyle}>
            <div style={{ justifySelf: 'start', marginLeft: '1rem' }}>

                <div style={logoStyle}>
                    <BsList style={{ ...iconStyle, margin: "0 0.8rem", padding: "0", width: '2rem', height:'2rem' }} />
                    <span style={sigmaContainerStyle}>
                        <ImSigma style={SigmaIconStyle} />
                    </span>
                    <h1 style={headingStyle} >Math Cards</h1>
                </div>

            </div>

            <div style={headerMiddleStyle}>
                <SearchBar
                    value={searchString}
                    onChange={(newValue) => setSearchString(newValue)}
                    // onRequestSearch={() => doSomethingWith(this.state.value)}
                />
            </div>

            <div style={{ justifySelf: 'end' }}>
                <BsMoon     style={{ ...iconStyle, marginRight: '1rem' }} onClick={toggleTheme} />
                <BsBellFill style={{ ...iconStyle, marginRight: '1rem' }} />
                <BsGearFill style={{ ...iconStyle, marginRight: '1rem' }} />
            </div>
        </header >
    )
}
export default Header

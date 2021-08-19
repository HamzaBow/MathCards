import { ImSigma } from "react-icons/im";
import { BsMoon, BsBellFill, BsList, BsGearFill } from "react-icons/bs";
import { COLORS } from "../Constants";
import { useTheme, useThemeUpdate } from "../ThemeContext";

const Header = () => {
    const toggleTheme = useThemeUpdate()
    const darkTheme = useTheme() 

    const headerStyle = {
        fontFamily: "Roboto",
        backgroundColor: COLORS.PRIMARY_LIGHT,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        alignItems: 'center',
    }

    const headingStyle = {
        fontSize: "2.5rem",
        fontWeight: "normal",
        display: "inline",
        margin: 0,
    }

    const iconStyle = {
        width: "1.5rem",
        height: "1.5rem",
        padding: "0.4rem",
        margin: "0.5rem",
        borderRadius: "2rem",
        cursor: "pointer",
        alt: "Toggle Dark Theme",
        backgroundColor: darkTheme ? COLORS.GRAY_LIGHT : COLORS.GRAY_DARK,
        color: darkTheme ? COLORS.GRAY_DARK : COLORS.GRAY_LIGHT,
    }
    const sigmaContainerStyle = {
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: "0.5rem",
        display: 'inline-grid',
        placeItems: 'center',
        backgroundColor: COLORS.PRIMARY_DARK
    }

    const SigmaIconStyle = {
        width: "1.7rem",
        height: "1.7rem",
        transform: "rotate(-20deg)",
        color: "white"
    }

    const headerMiddleStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1.5rem',

        marginTop: "0.5rem",
        marginBottom: "0.5rem",
    }

    return (
        <header style={headerStyle}>
            <div style={{ justifySelf: 'start', marginLeft: '1rem' }}>
                <BsList style={iconStyle} />
            </div>

            <div style={headerMiddleStyle}>
                <span style={sigmaContainerStyle}>
                    <ImSigma style={SigmaIconStyle} />
                </span>
                <h1 style={headingStyle} >Math Cards</h1>
            </div>

            <div style={{ justifySelf: 'end' }}>
                <BsMoon     style={{ ...iconStyle, marginRight: '2rem' }} onClick={toggleTheme} />
                <BsBellFill style={{ ...iconStyle, marginRight: '2rem' }} />
                <BsGearFill style={{ ...iconStyle, marginRight: '2rem' }} />
            </div>
        </header >
    )
}
export default Header

import { ImSigma } from "react-icons/im";
import { BsFillPlusSquareFill, BsMoon, BsBellFill, BsList, BsGearFill } from "react-icons/bs";
import { COLORS } from "../../Constants";
import { useTheme, useThemeUpdate } from "../../ThemeContext";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar"
import { Link } from "react-router-dom";

const darkColor = '#21262d';

const Header = () => {
    const toggleTheme = useThemeUpdate()
    const darkTheme = useTheme()

    const [searchOptions, setSearchOptions] = useState([])

    useEffect(() => {
        const getSearchOptions = async () => {
            const searchOptionsFromServer = await fetchSearchOptions();
            setSearchOptions(searchOptionsFromServer);
        }
        getSearchOptions();
    }, [])

    const fetchSearchOptions = async () => {
        const res = await fetch("http://localhost:5000/tagOptions");
        const data = await res.json();
        return data;
    }
    const headerStyle = {
        fontFamily: "Roboto",
        backgroundColor: darkTheme ? darkColor : 'white', //COLORS.PRIMARY_LIGHT,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        alignItems: 'center',

        position: 'fixed',
        left: 0,
        right: 0,
        boxShadow: darkTheme ? 'none' : '0px -2px 10px 5px lightgray '
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
                    <BsList style={{ ...iconStyle, margin: "0 0.8rem", padding: "0", width: '2rem', height: '2rem' }} />
                    <span style={sigmaContainerStyle}>
                        <ImSigma style={SigmaIconStyle} />
                    </span>
                    <h1 style={headingStyle} >MathCards</h1>
                </div>

            </div>

            <div style={headerMiddleStyle}>
                <SearchBar searchOptions={searchOptions} />
            </div>

            <div style={{ justifySelf: 'end' }}>
                <Link to='/cardform/new'>
                    <BsFillPlusSquareFill style={{ ...iconStyle, marginRight: '1.5rem', borderRadius: '5px' }} />
                </Link>
                <BsMoon style={{ ...iconStyle, marginRight: '1rem' }} onClick={toggleTheme} />
                <BsBellFill style={{ ...iconStyle, marginRight: '1rem' }} />
                <BsGearFill style={{ ...iconStyle, marginRight: '1rem' }} />
            </div>
        </header >
    )
}
export default Header

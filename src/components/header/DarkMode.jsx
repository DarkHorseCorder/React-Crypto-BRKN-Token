import React from 'react';
import { Link } from 'react-router-dom'
import imgsun from '../../assets/images/icon/sun.png'

const DarkMode = () => {
    let clickedClass = "clicked"
    const body = document.body
    const lightTheme = "light"
    const darkTheme = "is_dark"
    let theme

    if (localStorage) {
        theme = localStorage.getItem("theme")
    }
    if (theme === lightTheme || theme === darkTheme) {
        body.classList.add(theme)
    } else {
        body.classList.add(darkTheme)
    }

    const switchTheme = e => {
        if (theme === darkTheme) {
            body.classList.replace(darkTheme, lightTheme)
            e.target.classList.remove(clickedClass)
            localStorage.setItem("theme", "light")
            theme = lightTheme
        } else {
            body.classList.replace(lightTheme, darkTheme)
            e.target.classList.add(clickedClass)
            localStorage.setItem("theme", "is_dark")
            theme = darkTheme
        }
    }
    return (
        <div className="mode_switcher">
        <h6>Dark mode <strong>Available</strong></h6>
        <Link to="#" 
            onClick={e => switchTheme(e)}  >
            <img src={imgsun} alt="" />
        </Link>

    </div>
    );
}

export default DarkMode;

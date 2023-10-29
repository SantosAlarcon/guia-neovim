import React, { useEffect, useState } from "react"
import IconoSol from "./IconoSol"
import IconoLuna from "./IconoLuna"

const ThemeToggler = () => {
    const themes = ["light", "dark"]
    const [theme, setTheme] = useState(() => {
        if (import.meta.env.SSR) {
            return undefined
        }

        if (typeof localStorage !== undefined && localStorage.getItem("theme")) {
            return localStorage.getItem("theme")
        }

        // Si encuentra la propiedad "dark" en el "prefers-color-scheme", devuelve
        // "dark".
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark"
        }

        return "light"
    })
    
    const changeTheme = () => {
        const t = theme === "light" ? "dark" : "light"
        localStorage.setItem("theme", t)
        setTheme(t)
    }

    // Si no hay ninguna clave en el LocalStorage se crea una. Además se cambia el
    // esquema de colores.
    useEffect(() => {
        if (!localStorage.getItem("theme")) {
            localStorage.setItem("theme", theme)
        }

        document.documentElement.setAttribute("theme", theme)
    }, [theme])


    return (
        <div id="theme-toggle">
            {themes.map(t => {
                const checked = t === theme;
                return (
                    <button
                        aria-label="Cambiar tema"
                        className={checked ? "checked" : null}
                        key={t}
                        onClick={changeTheme}
                    >
                        {t === "light" ? <IconoSol /> : <IconoLuna />}
                    </button>
                )
            })}
        </div>
    )
}

export default ThemeToggler

import { useEffect, useState } from "react"
import IconoSol from "./IconoSol"
import IconoLuna from "./IconoLuna"

const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (import.meta.env.SSR) {
      return undefined
    }

    // Se comprueba si hay una clave en el LocalStorage. En caso de que la haya
    // recupera el valor.
    if (typeof localStorage !== undefined && localStorage.getItem("theme")) {
      return localStorage.getItem("theme")
    }

    // Si encuentra la propiedad "dark" en el "prefers-color-scheme", devuelve
    // "dark".
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark"
    }

    // Devuelve "light" en caso de que los casos anteriores no se cumplan.
    return "light"
  })

  const changeTheme = () => {
    const t = theme === "light" ? "dark" : "light"
    localStorage.setItem("theme", t)
    setTheme(t)
  }

  // Si no hay ninguna clave en el LocalStorage se crea una. Además se cambia el
  // esquema de colores, añadiendo el atributo "theme" al HTML.
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", theme)
    }

    document.documentElement.setAttribute("theme", theme)
  }, [theme])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    mounted && (
      <div
        id="theme-toggle"
        className={theme === "dark" ? "checked" : ""}
        onClick={changeTheme}
      >
        <i
          title={theme === "dark" ? "Modo oscuro" : "Modo claro"}
          className={`dot ${theme === "dark" ? "checked" : ""}`}
        >
          {theme === "light" ? <IconoSol /> : <IconoLuna />}
        </i>
      </div>
    )
  )
}

export default ThemeToggler

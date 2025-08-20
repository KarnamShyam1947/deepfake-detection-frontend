import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    if (theme === "dark") {
      return <Moon className="h-5 w-5" />
    } else if (theme === "light") {
      return <Sun className="h-5 w-5" />
    } else {
      // system theme
      return <Sun className="h-5 w-5" />
    }
  }

  const getTooltip = () => {
    if (theme === "light") {
      return "Switch to dark mode"
    } else if (theme === "dark") {
      return "Switch to system theme"
    } else {
      return "Switch to light mode"
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      title={getTooltip()}
      className="hover-lift"
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
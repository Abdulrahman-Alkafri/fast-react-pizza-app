import { Link } from "react-router-dom"

function Button({ children, disabled, to, type,onClick}) {
    const base = "inline-block text-xs bg-yellow-400 uppercase hover:bg-yellow-300 focus:bg-yellow-300 px-4 md:px-6 py-3 md:py-4 rounded-full focus:ring-yellow-300 font-semibold tracking-wide focus:outline-none focus:ring focus:ring-offset-2 disabled:cursor-not-allowed"
    
    const styles = {
        primary: base + " px-4 md:px-6 py-3 md:py-4",
        small: base + " px-3 md:px-3 py-1.5 md:py-1 text-xs",
        round:base +  "px-2 md:px-3 py-1 md:py-1.5 text-sm",
        secondary: `inline-block text-xs border-2 border-stone-300 text-stone-400 hover:bg-stone-300 focus:bg-stone-300 px-4
        hover:text-stone-800 focus:bg-stone-300
        md:px-6 py-2.5 md:py-3.5 rounded-full focus:ring-stone-300 font-semibold tracking-wide 
        focus:outline-none focus:ring focus:ring-offset-2 disabled:cursor-not-allowed uppercase`
    }
    
    if (to)
        return <Link className={styles[type]} to={to}>{children}</Link>
    if (onclick)
        return 
    <button
        onClick={onClick}
        disabled={disabled}
        className={styles[type]}>
        {children}
    </button>; 
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={styles[type]}>
            {children}
        </button>
    )
}

export default Button

import { useState } from "react"

const Togglable = (props) => {
    const [isVisible, setVisible] = useState(true)

    const toggleVisible = () => setVisible(!isVisible)

    if (isVisible) {
        return (
            <div>
                {props.children}
                <button onClick={toggleVisible}>cancel</button>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={toggleVisible}>create new blog</button>
            </div>
        )
    }
}
export default Togglable
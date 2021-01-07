import React from "react"
import TextField from "@material-ui/core/TextField"
import "./style.css"
const OptimizedField = ({
    name,
    type,
    placeholder,
    onChange,
    className,
    value,
    error,
    children,
    label,
    ...props
}) => {
    
    return (
        <>
            <TextField
                size="small"
                id="filled-basic"
                onChange={onChange}
                name={name}
                variant="filled"
                className="text-box"
                placeholder={placeholder}
                margin="normal"
                value={value}
                className="textbox-def"
            />
        </>
    )
}



export default OptimizedField
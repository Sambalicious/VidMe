import React from 'react'
import { options } from 'joi-browser'


const select = () => {
    return (
        <div className="for-group">
            <label htmlFor=""> {label} </label>
            <select name={name} id={name} {...rest} className="form-control">
                <option value="" />
                {options.map(option => (
                    <option key={option._Id} value={option._Id}>{option.name} </option>
                ))}
                </select>
                {error && <div className="alert alert-danger">{error}</div> }
        </div>
    )
}
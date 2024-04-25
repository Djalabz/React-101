import './FormInput.css'

function FormInput(props) {

    const { label, handleChange, ...otherProps } = props

    return (
        <div className="form-input">
            <label>{label}</label>
            <input {...otherProps} onChange={(e) => handleChange(e, props.id)} />
        </div>
    );
}

export default FormInput
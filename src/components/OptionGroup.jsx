import './OptionGroup.css'

// A group of radio buttons that look like pill-shaped chips.
const OptionGroup = ({label, name, options, value, onChange}) => {

    return (
        <fieldset className="OptionGroup">
            <legend>{label}</legend>
            <div className="chips">
                {options.map((option) =>
                    <label key={option} className="chip">
                        <input
                            type="radio"
                            name={name}
                            value={option}
                            checked={value === option}
                            onChange={onChange}
                        />
                        <span>{option}</span>
                    </label>
                )}
            </div>
        </fieldset>
    )
}

export default OptionGroup

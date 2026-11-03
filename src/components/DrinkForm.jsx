import DrinkCup from './DrinkCup'
import OptionGroup from './OptionGroup'
import { DRINK_TYPES, SUGAR_LEVELS, ICE_LEVELS, TOPPINGS } from '../options'
import './DrinkForm.css'

// The cup preview + order form, shared by the create and edit pages.
// `children` is where each page puts its own buttons.
const DrinkForm = ({title, drink, onChange, onSubmit, children}) => {

    return (
        <div className="DrinkForm">

            <div className="preview">
                <DrinkCup
                    drinkType={drink.drink_type}
                    sugar={drink.sugar}
                    ice={drink.ice}
                    topping={drink.topping}
                />
                <h3>{drink.drink_type}</h3>
                <p className="summary">
                    {drink.sugar} sugar · {drink.ice} ice · {drink.topping}
                </p>
            </div>

            <form onSubmit={onSubmit}>
                <h2>{title}</h2>

                <label className="nameLabel" htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={drink.name} onChange={onChange} placeholder="Who is this drink for?" required />

                <OptionGroup label="Drink" name="drink_type" options={DRINK_TYPES} value={drink.drink_type} onChange={onChange} />
                <OptionGroup label="Sugar" name="sugar" options={SUGAR_LEVELS} value={drink.sugar} onChange={onChange} />
                <OptionGroup label="Ice" name="ice" options={ICE_LEVELS} value={drink.ice} onChange={onChange} />
                <OptionGroup label="Topping" name="topping" options={TOPPINGS} value={drink.topping} onChange={onChange} />

                <div className="buttons">
                    {children}
                </div>
            </form>
        </div>
    )
}

export default DrinkForm

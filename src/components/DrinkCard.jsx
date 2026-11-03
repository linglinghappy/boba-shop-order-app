import { Link } from 'react-router-dom'
import DrinkCup from './DrinkCup'
import './DrinkCard.css'

const DrinkCard = ({drink}) => {

    return (
        <div className="DrinkCard">
            <Link to={'/drink/' + drink.id} className="cardLink">
                <DrinkCup
                    drinkType={drink.drink_type}
                    sugar={drink.sugar}
                    ice={drink.ice}
                    topping={drink.topping}
                    size={140}
                />
                <h3>{drink.name}</h3>
                <p className="drinkType">{drink.drink_type}</p>
                <p className="details">
                    {drink.sugar} sugar · {drink.ice} ice · {drink.topping}
                </p>
            </Link>
            <Link to={'/edit/' + drink.id}>
                <button className="editBtn">Edit</button>
            </Link>
        </div>
    )
}

export default DrinkCard

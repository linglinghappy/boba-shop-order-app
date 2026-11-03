import { Link } from 'react-router-dom'
import DrinkCup from './DrinkCup'
import { SUGAR_LEVELS, ICE_LEVELS } from '../options'
import { getPrice, getCalories, getOrderTime } from '../drinkInfo'
import './DrinkReceipt.css'

// A row of 4 bars: 100% lights all 4, "No ..." lights none
const LevelBars = ({levels, value}) => {
    const filled = levels.length - 1 - levels.indexOf(value)

    return (
        <span className="bars" aria-hidden="true">
            {[0, 1, 2, 3].map((i) =>
                <span key={i} className={i < filled ? 'bar on' : 'bar'} />
            )}
        </span>
    )
}

const DrinkReceipt = ({drink}) => {

    const orderNumber = String(drink.id).padStart(2, '0')
    const [dollars, cents] = getPrice(drink).slice(1).split('.')

    return (
        <article className="DrinkReceipt">

            <div className="hero">
                <div className="glow" />
                <DrinkCup
                    drinkType={drink.drink_type}
                    sugar={drink.sugar}
                    ice={drink.ice}
                    topping={drink.topping}
                    size={360}
                    showSugar={false}
                />
                <div className="floor" />
            </div>

            <div className="content">
                <p className="eyebrow">
                    <span>Order</span>
                    <span className="orderNumber">№{orderNumber}</span>
                </p>

                <h2 className="name">{drink.name}</h2>
                <p className="drinkType">{drink.drink_type}</p>

                <dl className="specs">
                    <div className="spec">
                        <dt>Sugar</dt>
                        <dd>
                            <LevelBars levels={SUGAR_LEVELS} value={drink.sugar} />
                            <span>{drink.sugar}</span>
                        </dd>
                    </div>
                    <div className="spec">
                        <dt>Ice</dt>
                        <dd>
                            <LevelBars levels={ICE_LEVELS} value={drink.ice} />
                            <span>{drink.ice}</span>
                        </dd>
                    </div>
                    <div className="spec">
                        <dt>Topping</dt>
                        <dd className="topping">{drink.topping}</dd>
                    </div>
                </dl>

                <div className="metrics">
                    <div className="metric">
                        <span className="metricLabel">Total</span>
                        <span className="metricValue">
                            <sup>$</sup>{dollars}<small>.{cents}</small>
                        </span>
                    </div>
                    <div className="metric">
                        <span className="metricLabel">Energy, est.</span>
                        <span className="metricValue">
                            {getCalories(drink)}<small>kcal</small>
                        </span>
                    </div>
                </div>

                <p className="timestamp">
                    <span>Ordered</span> {getOrderTime(drink)}
                </p>
            </div>

            <Link to={'/edit/' + drink.id} className="actionBar">
                <span className="actionLabel">Edit Order</span>
                <span className="actionArrow" aria-hidden="true">→</span>
            </Link>
        </article>
    )
}

export default DrinkReceipt

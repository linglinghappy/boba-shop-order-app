import { useId } from 'react'
import './DrinkCup.css'

// Color of the tea for each drink type
const LIQUID_COLORS = {
    'Fruit Tea': '#f3dc8a',
    'Milk Tea': '#c69c72',
    'Matcha': '#4f7d3c',
    'Tea': '#b5844f',
}

// How many ice cubes to draw for each ice level
const ICE_COUNT = {'100%': 8, '75%': 6, '50%': 4, '25%': 2, 'No Ice': 0}

// How many sugar bars to light up for each sugar level
const SUGAR_COUNT = {'100%': 4, '75%': 3, '50%': 2, '25%': 1, 'No Sugar': 0}

// Where each ice cube goes: [x, y, rotation]
const ICE_SPOTS = [
    [70, 86, -12], [108, 82, 8], [146, 90, -5], [86, 116, 15],
    [128, 114, -10], [62, 140, 6], [104, 146, -8], [146, 138, 12],
]

// Where each pearl or jelly goes at the bottom of the cup: [x, y]
const TOPPING_SPOTS = []
for (const [row, y] of [252, 238, 224].entries()) {
    for (let x = 60 + (row % 2) * 7; x <= 160; x += 15) {
        TOPPING_SPOTS.push([x, y])
    }
}

const Topping = ({type}) => {
    if (type === 'Pudding') {
        return <rect className="pudding" x="0" y="222" width="240" height="50" />
    }
    if (type === 'Boba' || type === 'Crystal Boba') {
        const className = type === 'Boba' ? 'pearl' : 'crystal'
        return TOPPING_SPOTS.map(([x, y]) =>
            <circle key={`${x}-${y}`} className={className} cx={x} cy={y} r="7" />
        )
    }
    if (type === 'Grass Jelly' || type === 'Coconut Jelly') {
        const className = type === 'Grass Jelly' ? 'grass-jelly' : 'coconut-jelly'
        return TOPPING_SPOTS.map(([x, y]) =>
            <rect key={`${x}-${y}`} className={className} x={x - 6} y={y - 6} width="12" height="12" rx="2" />
        )
    }
    return null
}

const DrinkCup = ({drinkType, sugar, ice, topping, size = 240, showSugar = true}) => {

    const clipId = useId()
    const cupShape = "M40 40 L180 40 L164 262 L56 262 Z"
    const iceCount = ICE_COUNT[ice] ?? 0
    const sugarCount = SUGAR_COUNT[sugar] ?? 0

    return (
        <svg
            className="DrinkCup"
            viewBox={showSugar ? "0 0 240 280" : "0 0 220 280"}
            width={size}
            role="img"
            aria-label={`${drinkType}, ${sugar} sugar, ${ice} ice, topping: ${topping}`}
        >
            <defs>
                <clipPath id={clipId}>
                    <path d={cupShape} />
                </clipPath>
            </defs>

            {/* Glass */}
            <path className="glass" d={cupShape} />

            {/* Straw (behind the tea, so only the top part shows) */}
            <rect className="straw" x="118" y="0" width="12" height="200" rx="2" transform="rotate(10 124 100)" />

            {/* Everything inside the cup is clipped to the cup shape */}
            <g clipPath={`url(#${clipId})`}>
                <rect x="0" y="76" width="240" height="200" style={{fill: LIQUID_COLORS[drinkType]}} />
                <rect className="shine" x="48" y="76" width="10" height="190" />
                <Topping type={topping} />
                {ICE_SPOTS.slice(0, iceCount).map(([x, y, angle]) =>
                    <rect
                        key={`${x}-${y}`}
                        className="ice"
                        x={x - 12} y={y - 12} width="24" height="24" rx="4"
                        transform={`rotate(${angle} ${x} ${y})`}
                    />
                )}
            </g>

            {/* Cup rim */}
            <line className="rim" x1="34" y1="40" x2="186" y2="40" />

            {/* Sugar gauge */}
            {showSugar && <>
                {[0, 1, 2, 3].map((i) =>
                    <rect
                        key={i}
                        className={i < sugarCount ? 'sugar-on' : 'sugar-off'}
                        x="206" y={232 - i * 26} width="14" height="20" rx="3"
                    />
                )}
                <text className="gauge-label" x="213" y="272" textAnchor="middle">SUGAR</text>
            </>}
        </svg>
    )
}

export default DrinkCup

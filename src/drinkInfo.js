// Extra info shown only on the detail page.
// Prices and calories are made-up estimates for this project.

const BASE_PRICE = {'Fruit Tea': 5.5, 'Milk Tea': 5.0, 'Matcha': 6.0, 'Tea': 4.0}
const TOPPING_PRICE = {'Boba': 0.75, 'Crystal Boba': 0.75, 'Pudding': 1.0, 'Grass Jelly': 0.75, 'Coconut Jelly': 0.75, 'None': 0}

const BASE_CALORIES = {'Fruit Tea': 60, 'Milk Tea': 180, 'Matcha': 150, 'Tea': 5}
const SUGAR_CALORIES = {'100%': 160, '75%': 120, '50%': 80, '25%': 40, 'No Sugar': 0}
const TOPPING_CALORIES = {'Boba': 150, 'Crystal Boba': 90, 'Pudding': 120, 'Grass Jelly': 30, 'Coconut Jelly': 70, 'None': 0}

export const getPrice = (drink) => {
    const price = (BASE_PRICE[drink.drink_type] ?? 0) + (TOPPING_PRICE[drink.topping] ?? 0)
    return '$' + price.toFixed(2)
}

export const getCalories = (drink) => {
    return (BASE_CALORIES[drink.drink_type] ?? 0)
        + (SUGAR_CALORIES[drink.sugar] ?? 0)
        + (TOPPING_CALORIES[drink.topping] ?? 0)
}

export const getOrderTime = (drink) => {
    return new Date(drink.created_at).toLocaleString()
}

import { useState } from 'react'
import { supabase } from '../client'
import DrinkForm from '../components/DrinkForm'

const CreateDrink = () => {

    const [drink, setDrink] = useState({
        name: "",
        drink_type: "Milk Tea",
        sugar: "100%",
        ice: "100%",
        topping: "Boba",
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setDrink( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createDrink = async (event) => {
        event.preventDefault();

        await supabase
            .from('Drinks')
            .insert(drink)
            .select();

        window.location = "/";
    }

    return (
        <DrinkForm title="Order a Drink" drink={drink} onChange={handleChange} onSubmit={createDrink}>
            <button type="submit" className="primaryBtn">Place Order</button>
        </DrinkForm>
    )
}

export default CreateDrink

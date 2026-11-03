import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'
import DrinkForm from '../components/DrinkForm'

const EditDrink = () => {

    const {id} = useParams()
    const [drink, setDrink] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // READ the current drink so the form starts with its values
        const fetchDrink = async () => {
            const {data} = await supabase
                .from('Drinks')
                .select()
                .eq('id', id)
                .single()

            setDrink(data)
            setLoading(false)
        }

        fetchDrink()
    }, [id])

    const handleChange = (event) => {
        const {name, value} = event.target
        setDrink( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    // UPDATE this drink
    const updateDrink = async (event) => {
        event.preventDefault();

        await supabase
            .from('Drinks')
            .update({
                name: drink.name,
                drink_type: drink.drink_type,
                sugar: drink.sugar,
                ice: drink.ice,
                topping: drink.topping,
            })
            .eq('id', id);

        window.location = "/";
    }

    // DELETE this drink
    const deleteDrink = async () => {
        if (!window.confirm(`Delete ${drink.name}'s order?`)) {
            return
        }

        await supabase
            .from('Drinks')
            .delete()
            .eq('id', id);

        window.location = "/";
    }

    if (loading) {
        return <p className="message">Loading...</p>
    }

    if (!drink) {
        return (
            <div className="message">
                <p>Drink not found 🫗</p>
                <Link to="/">Back to all orders</Link>
            </div>
        )
    }

    return (
        <DrinkForm title={`Edit Order #${drink.id}`} drink={drink} onChange={handleChange} onSubmit={updateDrink}>
            <button type="submit" className="primaryBtn">Save Changes</button>
            <button type="button" className="deleteBtn" onClick={deleteDrink}>Delete</button>
        </DrinkForm>
    )
}

export default EditDrink

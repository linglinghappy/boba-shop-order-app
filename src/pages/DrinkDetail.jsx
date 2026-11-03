import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'
import DrinkReceipt from '../components/DrinkReceipt'

const DrinkDetail = () => {

    const {id} = useParams()
    const [drink, setDrink] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // READ the one drink whose id matches the URL
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

    return <DrinkReceipt drink={drink} />
}

export default DrinkDetail

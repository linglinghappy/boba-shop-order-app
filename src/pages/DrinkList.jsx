import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import DrinkCard from '../components/DrinkCard'
import './DrinkList.css'

const DrinkList = () => {

    const [drinks, setDrinks] = useState([])

    useEffect(() => {
        // READ all drinks from table, newest first
        const fetchDrinks = async () => {
            const {data} = await supabase
                .from('Drinks')
                .select()
                .order('created_at', { ascending: false })

            // set state of drinks
            setDrinks(data)
        }

        fetchDrinks()
    }, [])

    return (
        <div className="DrinkList">
            <h2>All Orders</h2>

            {
                drinks && drinks.length > 0 ?
                <div className="grid">
                    {drinks.map((drink) =>
                        <DrinkCard key={drink.id} drink={drink} />
                    )}
                </div>
                :
                <div className="empty">
                    <p>No orders yet 🧋</p>
                    <Link to="/new"><button className="primaryBtn">Order a Drink</button></Link>
                </div>
            }
        </div>
    )
}

export default DrinkList

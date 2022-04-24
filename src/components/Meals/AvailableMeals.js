import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import {useEffect, useState} from "react";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
        const [meals, setMeals] = useState([])
        const [loading, setLoading] = useState(true)
        const [httpError, setHttpError] = useState()
        useEffect(() => {
            const fetchMeals = async () => {
                const response = await fetch('https://react-http-871a8-default-rtdb.firebaseio.com/meals.json')
                if (!response.ok) {
                    throw new Error('something went wrong!')
                }
                const responseData = await response.json()
                const loadedMeal = []

                for (const key in responseData) {
                    console.log(key)
                    loadedMeal.push({
                        id: key,
                        name: responseData[key].name,
                        description: responseData[key].description,
                        price: responseData[key].price
                    })
                }
                setMeals(loadedMeal)
                setLoading(false)
            }

            fetchMeals().catch((error)=>{
                setLoading(false)
                setHttpError(error.message)
            })

        }, [])
        if (loading) {
            return <section className={classes.mealsLoading}>
                <h2>is loading...</h2>
            </section>
        }
        if (httpError) {
            return <section className={classes.mealsError}>
                <h2>{httpError}</h2>
            </section>
        }
        const mealsList = meals.map((meal) => (
            <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        ));

        return (
            <section className={classes.meals}>
                <Card>
                    <ul>{mealsList}</ul>
                </Card>
            </section>
        );
    }
;

export default AvailableMeals;

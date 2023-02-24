import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  let [meals, setMeals] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [errorHttp, setErrorHttp] = useState(null);

  useEffect(() => {
    let fetchMeals = async () => {
      setIsLoading(true);
      let response = await fetch(
        "https://react-food-app-back-default-rtdb.firebaseio.com/meals.json"
      );
      console.log(response);

      let data = await response.json();
      console.log(data);
      if (!data) {
        setIsLoading(false);
        throw new Error("Something went wrong!");
      }
      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      // console.log(loadedMeals)
      setIsLoading(false);
    };

    fetchMeals().catch((err) => {
      setErrorHttp(err.message);
      console.error(err);
    });
    // console.log(meals);
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (errorHttp) {
    return (
      <section className={classes.mealsError}>
        <p>{errorHttp}</p>
      </section>
    );
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
};

export default AvailableMeals;

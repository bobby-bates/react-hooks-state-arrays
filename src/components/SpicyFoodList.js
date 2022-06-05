import { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState('All')

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    // console.log(newFood);

    // Add newFood to *copy of* foods array (using spread (...)):
    // const newFoodArray = [...foods, newFood]
    // setFoods(newFoodArray)

    // Revised:
    setFoods(() => [...foods, newFood])
  }
  // Remove an element that was clicked:
  // const handleClick = id => setFoods(() => foods.filter(food => food.id !== id))

  // Update an element that was clicked:
  // const handleClick = id => setFoods(() => foods.map(food => food.id === id ? [...food, {heatLevel: food.heatLevel++}] : food))

  const handleClick = id => setFoods(() => foods.map(food => {
    if (food.id === id) {
      // NOTE: Tried to do below but food.map is not a function
      // food.map(el=>el==='heatLevel' ? ++el : el)

      food.heatLevel++
      return food
    } else return food
  }))
  
  const foodsToDisplay = foods.filter(food => {
    return filterBy === 'All' ? true : food.cuisine === filterBy
  })

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value)
  }

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <>
      <button onClick={handleAddFood}>Add New Food</button>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </>
  );
}

export default SpicyFoodList;

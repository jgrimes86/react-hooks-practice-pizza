import React, {useState, useEffect} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const pizzaDatabase = "http://localhost:3001/pizzas"
  const [pizzas, setPizzas] = useState([]);
  const [pizzaDetails, setPizzaDetails] = useState({
    topping: "",
    size: "",
    vegetarian: false,
  });
  const [changingPizza, setChangingPizza] = useState([]);

  useEffect(() => {
    fetch(pizzaDatabase)
    .then(response => response.json())
    .then(pizzaData => setPizzas(pizzaData))
  }, [])

  function fillPizzaForm(pizza) {
    setChangingPizza(pizza)
    setPizzaDetails({
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian
    })
  }

  function changePizzaForm(name, value) {
    setPizzaDetails({
      ...pizzaDetails,
      [name]: value
    })
  }
  console.log(pizzaDetails)

  function updatePizza() {
    setPizzas(pizzas.map((pizza) => {
      if (pizza.id === changingPizza.id) {
        return {...pizzaDetails, "id": pizza.id}
      } else {return pizza}
    }))
  }

  return (
    <>
      <Header />
      <PizzaForm pizzaDetails={pizzaDetails} changePizzaForm={changePizzaForm} updatePizza={updatePizza} />
      <PizzaList pizzas={pizzas} fillPizzaForm={fillPizzaForm} />
    </>
  );
}

export default App;

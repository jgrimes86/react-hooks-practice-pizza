import React, {useState, useEffect} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const pizzaDatabase = "http://localhost:3001/pizzas"
  const [pizzas, setPizzas] = useState([]);
  const [pizzaDetails, setPizzaDetails] = useState({
    id: "",
    topping: "",
    size: "",
    vegetarian: false,
  });

  useEffect(() => {
    fetch(pizzaDatabase)
    .then(response => response.json())
    .then(pizzaData => setPizzas(pizzaData))
  }, [])

  function fillPizzaForm(pizza) {
    setPizzaDetails({
      id: pizza.id,
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
    fetch(pizzaDatabase+"/"+pizzaDetails.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pizzaDetails)
    })
    setPizzas(pizzas.map((pizza) => {
      if (pizza.id === pizzaDetails.id) {
        return pizzaDetails
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

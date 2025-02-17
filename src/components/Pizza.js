import React from "react";

function Pizza({pizza, fillPizzaForm}) {
  const {topping, size, vegetarian} = pizza;

  function handleClick() {
    fillPizzaForm(pizza)
  }

  return (
    <tr>
      <td>{topping}</td>
      <td>{size}</td>
      <td>{vegetarian ? "Yes" : "No"}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={handleClick}>
          Edit Pizza
        </button>
      </td>
    </tr>
  );
}

export default Pizza;

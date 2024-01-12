import React, { useState } from "react";

const InventoryForm = () => {
  const url = "http://localhost:3001/create";
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    quantity: "",
    category: "",
    ingredient: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("ERROR", error));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setInventory([...inventory, formData]);
    setFormData({
      quantity: "",
      category: "",
      ingredient: "",
    });
  };
  console.log(inventory);
  return (
    <>
      <form id="" onSubmit={(e) => handleAdd(e)}>
        <h3>Add Your Items</h3>
        <label>Quantity</label>
        <input
          id="quantity"
          type="number"
          placeholder="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        <label>Category:</label>
        <select
          name="category"
          id="category"
          onChange={handleChange}
          value={formData.category}
        >
          <option value="Protein">Protein</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Fruit">Fruit</option>
          <option value="Liquid">Liquid</option>
          <option value="Grain">Grain</option>
          <option value="Spice">Spice</option>
          <option value="Bread">Bread</option>
        </select>
        <label>Ingredient</label>
        <input
          id="ingredient"
          type="text"
          placeholder="Ingredient"
          name="ingredient"
          value={formData.ingredient}
          onChange={handleChange}
        />
        <button type="submit">Add Item</button>
      </form>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
      <div>
        <h2>Inventory</h2>
        <ul>
          {inventory &&
            inventory.map((item, idx) => {
              return (
                <li key={idx}>
                  {item.quantity} {item.category} {item.ingredient}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default InventoryForm;

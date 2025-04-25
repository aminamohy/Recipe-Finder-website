const recipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
const selectedRecipe = JSON.parse(localStorage.getItem("selectedRecipe"));

const caloriesPerIngredient = {
  "Chicken": 239, "Garlic Sauce": 100, "Pita Bread": 170,
  "Spaghetti": 158, "Tomato Sauce": 29, "Ground Beef": 250,
  "Fava Beans": 187, "Olive Oil": 119, "Lemon Juice": 4,
  "Onion": 40, "Garlic": 5, "Cilantro leaves": 1, "Basil": 1,
  "Ground Turkey": 135, "Taco Shell": 62, "Lettuce": 5,
  "Eggs": 78, "Black Beans": 114, "Tortilla": 140,
  "Beetroot": 43, "Carrot": 25, "Flour": 100
};

window.onload = function() {
  if (selectedRecipe) {
    document.getElementById("meal").value = selectedRecipe.name;
    calculateCalories();
  }
};

function showSuggestions() {
  const input = document.getElementById("meal").value.toLowerCase();
  const suggestionsDiv = document.getElementById("suggestions");
  suggestionsDiv.innerHTML = "";

  if (!input) return;

  recipes.forEach(recipe => {
    if (recipe.name.toLowerCase().includes(input)) {
      const div = document.createElement("div");
      div.className = "suggestion";
      div.textContent = recipe.name;
      div.onclick = () => {
        document.getElementById("meal").value = recipe.name;
        suggestionsDiv.innerHTML = "";
      };
      suggestionsDiv.appendChild(div);
    }
  });
}

function calculateCalories() {
  const input = document.getElementById("meal").value.trim().toLowerCase();
  const recipe = recipes.find(r => r.name.toLowerCase() === input) || selectedRecipe;
  const tableBody = document.getElementById("tableBody");
  const totalCaloriesElem = document.getElementById("totalCalories");

  if (!recipe) {
    alert("Recipe not found.");
    return;
  }

  tableBody.innerHTML = "";
  let totalCalories = 0;

  recipe.ingredients.forEach(ing => {
    const name = ing.name;
    const quantity = ing.quantity;
    const cal = caloriesPerIngredient[name] || 0;

    totalCalories += cal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${quantity}</td>
      <td>${cal}</td>
    `;
    tableBody.appendChild(row);
  });

  totalCaloriesElem.textContent = totalCalories;
  document.getElementById("mealTable");
}

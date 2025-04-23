document.addEventListener("DOMContentLoaded", () => {
  const recipesTableBody = document.querySelector("table tbody");

  function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
    console.log('Loading recipes:', recipes); 

    recipesTableBody.innerHTML = "";

    if (recipes.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="4" style="text-align: center;">No recipes found.</td>`;
      recipesTableBody.appendChild(row);
      return;
    }

    recipes.forEach(recipe => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${recipe.name}</td>
        <td>${recipe.courseName}</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td>
          <button class="edit" data-id="${recipe.id}">Edit</button>
          <button class="delete" data-id="${recipe.id}">Delete</button>
        </td>
      `;

      recipesTableBody.appendChild(row);
    });
  }

  loadRecipes();

  document.addEventListener("click", (event) => {
    // DELETE button
    if (event.target.classList.contains("delete")) {
      const button = event.target;
      const row = button.closest("tr");
      const recipeId = parseInt(button.getAttribute("data-id"));

      let allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
      allRecipes = allRecipes.filter(r => r.id !== recipeId);
      localStorage.setItem("allRecipes", JSON.stringify(allRecipes));

      let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      recipes = recipes.filter(r => r.id !== recipeId);
      localStorage.setItem("recipes", JSON.stringify(recipes));

      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      favorites = favorites.filter(r => r.id !== recipeId);
      localStorage.setItem("favorites", JSON.stringify(favorites));

      loadRecipes();
    }

    if (event.target.classList.contains("edit")) {
      const recipeId = parseInt(event.target.getAttribute("data-id"));
      const allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];

      const selectedRecipe = allRecipes.find(r => r.id === recipeId);
      if (selectedRecipe) {
        localStorage.setItem("selectedRecipe", JSON.stringify(selectedRecipe));
        window.location.href = "EditRecipe.html?id=" + recipeId; // إضافة ID إلى URL
      } else {
        alert("Recipe not found!");
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const recipePhotoInput = document.getElementById("recipe-photo"); // File input for recipe image
  const imagePreview = document.getElementById("image-preview"); // Image preview element
  const ingredientsList = document.getElementById("ingredients-list"); // List of ingredients
  const directionsList = document.getElementById("directions-list"); // List of directions
  const recipeForm = document.getElementById("recipe-form"); // The form to save the updated recipe

  // Fetch the stored recipe from localStorage
  let storedRecipe = JSON.parse(localStorage.getItem("selectedRecipe"));

  if (storedRecipe) {
    // Fill inputs with stored recipe data
    document.getElementById("recipe-name").value = storedRecipe.name;
    document.getElementById("duration").value = parseInt(storedRecipe.time);
    document.getElementById("description").value = storedRecipe.description;
    document.getElementById("course").value = storedRecipe.courseName;
   

    // Fill ingredients
    ingredientsList.innerHTML = ""; // Clear existing ingredients
    storedRecipe.ingredients.forEach(ingredient => {
      const ingredientDiv = document.createElement("div");
      ingredientDiv.classList.add("ingredient");

      ingredientDiv.innerHTML = `
        <input type="text" placeholder="Quantity" value="${ingredient.quantity}" required>
        <select>
          <option ${ingredient.quantity.includes('gram') ? 'selected' : ''}>gram</option>
          <option ${ingredient.quantity.includes('oz') ? 'selected' : ''}>oz</option>
          <option ${ingredient.quantity.includes('cup') ? 'selected' : ''}>cup</option>
        </select>
        <input type="text" placeholder="Ingredient Name" value="${ingredient.name}" required>
        <button type="button" class="remove-btn"><i class="fas fa-times"></i></button>
      `;

      ingredientsList.appendChild(ingredientDiv);
    });

    // Fill directions
    directionsList.innerHTML = "";
    storedRecipe.instructions.forEach(step => {
      const directionDiv = document.createElement("div");
      directionDiv.classList.add("direction");
      directionDiv.innerHTML = `
        <textarea required>${step}</textarea>
        <button type="button" class="remove-btn"><i class="fas fa-times"></i></button>
      `;
      directionsList.appendChild(directionDiv);
    });

    // Set the image preview from the stored recipe data if exists
    if (storedRecipe.image) {
      imagePreview.src = storedRecipe.image;
    }
  }

  // Event listener for file input change
  recipePhotoInput.addEventListener("change", function (e) {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        // Update the image preview with the new image
        imagePreview.src = event.target.result;
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  });

  // Add ingredient functionality
  const addIngredientButton = document.querySelector(".add-btn"); // Add Ingredient button
  addIngredientButton.addEventListener("click", function () {
    const ingredientDiv = document.createElement("div");
    ingredientDiv.classList.add("ingredient");
    ingredientDiv.innerHTML = `
      <input type="text" placeholder="Quantity" required>
      <select>
        <option>gram</option>
        <option>oz</option>
        <option>cup</option>
      </select>
      <input type="text" placeholder="Ingredient Name" required>
      <button type="button" class="remove-btn"><i class="fas fa-times"></i></button>
    `;
    ingredientsList.appendChild(ingredientDiv);

    // Add event listener for the remove button of the new ingredient
    ingredientDiv.querySelector(".remove-btn").addEventListener("click", function () {
      ingredientsList.removeChild(ingredientDiv);
    });
  });

  // Add step functionality
  const addStepButton = document.getElementById("add-direction-btn"); // Add Step button
  addStepButton.addEventListener("click", function () {
    const directionDiv = document.createElement("div");
    directionDiv.classList.add("direction");
    directionDiv.innerHTML = `
      <textarea placeholder="Write cooking instructions..." required></textarea>
      <button type="button" class="remove-btn"><i class="fas fa-times"></i></button>
    `;
    directionsList.appendChild(directionDiv);

    // Add event listener for the remove button of the new step
    directionDiv.querySelector(".remove-btn").addEventListener("click", function () {
      directionsList.removeChild(directionDiv);
    });
  });

  // Save updated recipe on form submission
  recipeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get new values from the form
    const updatedRecipe = {
      ...storedRecipe,
      name: document.getElementById("recipe-name").value,
      time: document.getElementById("duration").value + " min",
      description: document.getElementById("description").value,
      courseName: document.getElementById("course").value,
      image: imagePreview.src, // Use the image preview's src for the updated image
      ingredients: Array.from(document.querySelectorAll("#ingredients-list .ingredient")).map(div => {
        const quantity = div.children[0].value;
        const unit = div.children[1].value;
        const name = div.children[2].value;
        return {
          id: Math.random(), // generate a random ID
          name,
          quantity: quantity + unit
        };
      }),
      instructions: Array.from(document.querySelectorAll("#directions-list textarea")).map(textarea => textarea.value)
    };

    // Update recipe in localStorage
    let allRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    let index = allRecipes.findIndex(r => r.id === storedRecipe.id);

    if (index !== -1) {
      allRecipes[index] = updatedRecipe;
    } else {
      allRecipes.push(updatedRecipe);
    }

    localStorage.setItem("recipes", JSON.stringify(allRecipes));

    alert("Recipe updated successfully!");
    window.location.href = "Recipe_List_Page.html"; 
  });
});

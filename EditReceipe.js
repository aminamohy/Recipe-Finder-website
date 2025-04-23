document.addEventListener("DOMContentLoaded", function () {
 
  const recipePhotoInput = document.getElementById("recipe-photo");
  const imagePreview = document.getElementById("image-preview");
  const ingredientsList = document.getElementById("ingredients-list");
  const directionsList = document.getElementById("directions-list");
  const recipeForm = document.getElementById("recipe-form");

  let storedRecipe = JSON.parse(localStorage.getItem("selectedRecipe"));

  if (storedRecipe) {
    document.getElementById("recipe-name").value = storedRecipe.name;
    document.getElementById("duration").value = parseInt(storedRecipe.time) || 30;
    document.getElementById("description").value = storedRecipe.description;
    document.getElementById("course").value = storedRecipe.courseName;

    ingredientsList.innerHTML = "";
    storedRecipe.ingredients.forEach(ingredient => {
      const [quantity, unit] = parseQuantity(ingredient.quantity);
      
      const ingredientDiv = document.createElement("div");
      ingredientDiv.classList.add("ingredient");
      ingredientDiv.innerHTML = `
        <input type="text" placeholder="Quantity" value="${quantity}" required>
        <select>
          <option ${unit === 'gram' ? 'selected' : ''}>gram</option>
          <option ${unit === 'oz' ? 'selected' : ''}>oz</option>
          <option ${unit === 'cup' ? 'selected' : ''}>cup</option>
        </select>
        <input type="text" placeholder="Ingredient Name" value="${ingredient.name}" required>
        <button type="button" class="remove-btn"><i class="fas fa-times"></i></button>
      `;
      ingredientsList.appendChild(ingredientDiv);
    });

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

    if (storedRecipe.image) {
      imagePreview.src = storedRecipe.image;
      imagePreview.style.display = 'block';
    }
  }

  function parseQuantity(quantity) {
    const match = quantity.match(/(\d+)(\D*)/);
    return match ? [match[1], match[2].trim()] : [quantity, ''];
  }

  document.querySelector(".add-btn").addEventListener("click", function () {
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

    ingredientDiv.querySelector(".remove-btn").addEventListener("click", function () {
      ingredientsList.removeChild(ingredientDiv);
    });
  });

  document.getElementById("add-direction-btn").addEventListener("click", function () {
    const directionDiv = document.createElement("div");
    directionDiv.classList.add("direction");
    directionDiv.innerHTML = `
      <textarea placeholder="Write cooking instructions..." required></textarea>
      <button type="button" class="remove-btn"><i class="fas fa-times"></i></button>
    `;
    directionsList.appendChild(directionDiv);

    directionDiv.querySelector(".remove-btn").addEventListener("click", function () {
      directionsList.removeChild(directionDiv);
    });
  });

  recipePhotoInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        imagePreview.src = event.target.result;
        imagePreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });

  recipeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const updatedRecipe = {
      ...storedRecipe,
      name: document.getElementById("recipe-name").value,
      time: document.getElementById("duration").value + " min",
      description: document.getElementById("description").value,
      courseName: document.getElementById("course").value,
      image: imagePreview.src || storedRecipe.image || '',
      ingredients: Array.from(document.querySelectorAll("#ingredients-list .ingredient")).map(div => {
        const quantity = div.children[0].value;
        const unit = div.children[1].value;
        const name = div.children[2].value;
        return {
          id: Math.random(),
          name,
          quantity: quantity + " " + unit
        };
      }),
      instructions: Array.from(document.querySelectorAll("#directions-list textarea")).map(textarea => textarea.value)
    };

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const recipeIndex = recipes.findIndex(r => r.id === storedRecipe.id);
    if (recipeIndex !== -1) {
      recipes[recipeIndex] = updatedRecipe;
    } else {
      recipes.push(updatedRecipe);
    }
    localStorage.setItem("recipes", JSON.stringify(recipes));

    let allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
    const allIndex = allRecipes.findIndex(r => r.id === storedRecipe.id);
    if (allIndex !== -1) {
      allRecipes[allIndex] = updatedRecipe;
    } else {
      allRecipes.push(updatedRecipe);
    }
    localStorage.setItem("allRecipes", JSON.stringify(allRecipes));

    localStorage.setItem('recipeUpdated', JSON.stringify({
      id: updatedRecipe.id,
      timestamp: Date.now()
    }));

    alert("Recipe updated successfully!");
    window.location.href = "Recipe_List_Page.html";
  });
});

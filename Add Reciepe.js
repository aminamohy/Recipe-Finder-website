document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("recipe-form");
  const ingredientsList = document.getElementById("ingredients-list");
  const addIngredientBtn = document.querySelector(".add-btn"); 
  const directionsList = document.getElementById("directions-list");
  const addDirectionBtn = document.getElementById("add-direction-btn"); 
  const photoInput = document.getElementById("recipe-photo");
  const imagePreviewContainer = document.createElement("div"); 
  photoInput.insertAdjacentElement('afterend', imagePreviewContainer);
  imagePreviewContainer.style.marginTop = '10px';

  photoInput.addEventListener("change", function(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = function(event) {
      
        imagePreviewContainer.innerHTML = '';
        
  
        const previewImg = document.createElement('img');
        previewImg.src = event.target.result;
        previewImg.style.maxWidth = '200px';
        previewImg.style.maxHeight = '200px';
        previewImg.style.display = 'block';
        previewImg.style.borderRadius = '4px';
        previewImg.style.margin = '10px 0';
        
        imagePreviewContainer.appendChild(previewImg);
      };
      
      reader.readAsDataURL(e.target.files[0]);
    }
  });

  addIngredientBtn.addEventListener("click", function () {
    const ingredientDiv = document.createElement("div");
    ingredientDiv.className = "ingredient";
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

    ingredientDiv.querySelector(".remove-btn").addEventListener("click", () => {
      ingredientDiv.remove();
    });
  });

  addDirectionBtn.addEventListener("click", function () {
    const directionDiv = document.createElement("div");
    directionDiv.className = "direction";
    directionDiv.innerHTML = `
      <textarea placeholder="write a short description of your recipe" required></textarea>
      <button type="button" class="remove-btn"><i class="fas fa-times"></i></button>
    `;
    directionsList.appendChild(directionDiv);

    directionDiv.querySelector(".remove-btn").addEventListener("click", () => {
      directionDiv.remove();
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("recipe-name").value;
    const courseName = document.getElementById("course")?.value || "main course"; 
    const duration = document.getElementById("duration").value;
    const description = document.getElementById("description")?.value || "";

    if (!name || !duration || photoInput.files.length === 0) {
      alert("Please fill in all required fields including the recipe photo.");
      return;
    }

    const ingredients = Array.from(ingredientsList.querySelectorAll(".ingredient")).map((ing, index) => {
      const quantityInput = ing.querySelectorAll("input[type='text']")[0];
      const nameInput = ing.querySelectorAll("input[type='text']")[1];
      const unit = ing.querySelector("select").value;

      return {
        id: index + 1,
        name: nameInput.value,
        quantity: `${quantityInput.value} ${unit}`
      };
    });

    const instructions = Array.from(directionsList.querySelectorAll("textarea"))
      .map(textArea => textArea.value.trim())
      .filter(instruction => instruction); 

    if (ingredients.length === 0 || instructions.length === 0) {
      alert("Please add at least one ingredient and one instruction.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const newRecipe = {
        id: Date.now(),
        name: name,
        courseName: courseName,
        description: description,
        image: event.target.result,
        time: `${duration} min`,
        noingredients: ingredients.length.toString(),
        ingredients: ingredients,
        instructions: instructions
      };

      let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      recipes.push(newRecipe);
      localStorage.setItem("recipes", JSON.stringify(recipes));
      window.location.href = "Recipe_List_Page.html";
    };

    reader.readAsDataURL(photoInput.files[0]); 
  });
});

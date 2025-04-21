document.addEventListener("DOMContentLoaded", function () {
  const recipe = JSON.parse(localStorage.getItem("selectedRecipe"));

    document.getElementsByClassName("title")[0].textContent = recipe.name;
    document.getElementsByClassName("recipe-img")[0].src = recipe.image;
    document.getElementsByClassName("time")[0].textContent= ` ${recipe.time}`;
    document.getElementsByClassName("noingredients")[0].textContent = ` ${recipe.noingredients} ingredients`;

    const ingredientList = document.querySelector(".ingredients ul");
    recipe.ingredients.forEach(ingredient => {
      const li = document.createElement("li");
      li.textContent = `${ingredient.name} - ${ingredient.quantity}`;
      ingredientList.appendChild(li);
    });
    const instructionList = document.querySelector(".instructions ul");
    recipe.instructions.forEach(instruction => {
      const li = document.createElement("li");
      li.textContent = `${instruction}`;
      instructionList.appendChild(li);
    });
  
});

let calorybtn = document.getElementsByClassName("calorycalc")[0];
calorybtn.onclick = function () {
  let targetpage = calorybtn.getAttribute("data-target");
  window.location.href = targetpage;
};

  

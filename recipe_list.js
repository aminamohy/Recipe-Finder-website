const recipes = [
  {
    id: 1,
    name: "Shawrma",
    courseName: "main course",
    description: "A Surian dish",
    image: "imgs/shawrma.jpg",
    time: "62 min",
    noingredients: "3",
    ingredients: [
      { id: 1, name: "Chicken", quantity: "200g" },
      { id: 2, name: "Garlic Sauce", quantity: "2 tbsp" },
      { id: 3, name: "Pita Bread", quantity: "1 piece" }
    ],
    instructions: [
      "Marinate the chicken with spices and let it rest for 30 minutes.",
      "Grill the chicken until fully cooked.",
      "Spread garlic sauce on the pita bread.",
      "Add grilled chicken and roll the pita bread into a wrap.",
      "Serve hot."
    ]
  },
  {
    id: 2,
    name: "Spaghetti",
    courseName: "main course",
    description: "An Italian dish",
    image: "imgs/spagetti.jpg",
    time: "35 min",
    noingredients: "3",
    ingredients: [
      { id: 1, name: "Spaghetti", quantity: "100g" },
      { id: 2, name: "Tomato Sauce", quantity: "1 cup" },
      { id: 3, name: "Ground Beef", quantity: "100g" }
    ],
    instructions: [
      "Boil spaghetti until al dente.",
      "Cook ground beef in a pan until browned.",
      "Add tomato sauce to the beef and simmer for 10 minutes.",
      "Mix the sauce with spaghetti and serve warm."
    ]
  },
  {
    id: 3,
    name: "Beans",
    courseName: "main course",
    description: "An Egyptian dish",
    image: "imgs/beans.jpg",
    time: "20 min",
    noingredients: "7",
    ingredients: [
      { id: 1, name: "Fava Beans", quantity: "1 cup" },
      { id: 2, name: "Olive Oil", quantity: "1 tbsp" },
      { id: 3, name: "Lemon Juice", quantity: "1 tsp" },
      { id: 4, name: "Onion", quantity: "200g" },
      { id: 5, name: "Garlic", quantity: "2 cloves" },
      { id: 6, name: "Cilantro leaves", quantity: "1/4 cup" },
      { id: 7, name: "Basil", quantity: "1 Tablespoon fresh" }
    ],
    instructions: [
      "Mash the cooked fava beans in a bowl.",
      "Sauté onion and garlic in olive oil until golden.",
      "Add sautéed mixture to beans along with lemon juice.",
      "Mix in chopped cilantro and basil.",
      "Serve warm or at room temperature."
    ]
  },
  {
    id: 4,
    name: "Turkey Tacos",
    courseName: "main course",
    description: "A Mexican American dish",
    image: "imgs/Turkey_Tacos.jpg",
    time: "50 min",
    noingredients: "6",
    ingredients: [
      { id: 1, name: "Ground Turkey", quantity: "150g" },
      { id: 2, name: "Taco Shell", quantity: "2" },
      { id: 3, name: "Lettuce", quantity: "1/2 cup" },
      { id: 4, name: "Onion", quantity: "200g" },
      { id: 5, name: "Garlic", quantity: "2 cloves" },
      { id: 6, name: "Cilantro leaves", quantity: "1/2 cup" }
    ],
    instructions: [
      "Cook ground turkey in a pan with chopped onions and garlic.",
      "Add spices and cook until turkey is browned.",
      "Warm taco shells in a pan or oven.",
      "Fill each shell with turkey, lettuce, and cilantro.",
      "Serve immediately."
    ]
  },
  {
    id: 5,
    name: "Hearty Egg Burritos",
    courseName: "appetizers",
    description: "A protein-packed breakfast",
    image: "imgs/Hearty_Egg_Burritos.jpg",
    time: "40 min",
    noingredients: "5",
    ingredients: [
      { id: 1, name: "Eggs", quantity: "2" },
      { id: 2, name: "Black Beans", quantity: "1/4 cup" },
      { id: 3, name: "Tortilla", quantity: "1" },
      { id: 4, name: "Onion", quantity: "200g" },
      { id: 5, name: "Garlic", quantity: "2 cloves" }
    ],
    instructions: [
      "Scramble the eggs and cook until set.",
      "Sauté onions and garlic until translucent.",
      "Warm black beans in a pan.",
      "Warm the tortilla and fill with eggs, beans, and onion mix.",
      "Roll into a burrito and serve hot."
    ]
  },
  {
    id: 6,
    name: "Purple Vegetable Pancakes",
    courseName: "appetizers",
    description: "Colorful veggie pancakes",
    image: "imgs/Purple_Vegetable_Pancakes.jpg",
    time: "30 min",
    noingredients: "4",
    ingredients: [
      { id: 1, name: "Beetroot", quantity: "1/2 cup" },
      { id: 2, name: "Carrot", quantity: "1/4 cup" },
      { id: 3, name: "Flour", quantity: "1/4 cup" },
      { id: 4, name: "Onion", quantity: "200g" }
    ],
    instructions: [
      "Grate beetroot and carrot finely.",
      "Mix with chopped onion and flour to form a batter.",
      "Heat a pan and spoon batter to form pancakes.",
      "Cook each side for 3–4 minutes until crisp.",
      "Serve with yogurt or dip of choice."
    ]
  }
];

localStorage.setItem("allRecipes", JSON.stringify(recipes));


const addedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
let allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];

addedRecipes.forEach(added => {
  if (!allRecipes.some(r => r.name === added.name)) {
    allRecipes.push(added);
  }
});

localStorage.setItem("allRecipes", JSON.stringify(allRecipes));
document.addEventListener("DOMContentLoaded", function () {
  const addedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
  let allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];

  addedRecipes.forEach(added => {
    if (!allRecipes.some(r => r.name === added.name)) {
      allRecipes.push(added);
    }
  });

  localStorage.setItem("allRecipes", JSON.stringify(allRecipes));
});
document.addEventListener("DOMContentLoaded", function () {
  const recipeListContainer = document.getElementById("recipeList");

  // استرجاع الوصفات من localStorage
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

  // التحقق إذا كانت هناك وصفات موجودة في الlocalStorage
  if (recipes.length === 0) {
    recipeListContainer.innerHTML = "<p>No recipes found. Please add some recipes.</p>";
  } else {
    // عرض كل وصفة
    recipes.forEach(recipe => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe-card");
      recipeDiv.dataset.name = recipe.name;

      // إضافة محتوى الوصفة في العنصر
      recipeDiv.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}">
        <h3>${recipe.name}</h3>
        <p>${recipe.description}</p>
        <div class="buttons-container">
          <button class="favorite-btn"><i class="fa fa-heart"></i></button>
          <button class="recipe-details" data-target="Recipe_details_Page.html">view details</button>
        </div>
      `;

      // إضافة العنصر إلى الصفحة
      recipeListContainer.appendChild(recipeDiv);
      FavandDetails(); 

    });
  }
});
function FavandDetails() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const cards = document.querySelectorAll(".recipe-card");
  for (let i = 0; i < cards.length; i++) {
    
    const card = cards[i];
    const favbtn = card.querySelector(".favorite-btn");
    const detailsbtn = card.querySelector(".recipe-details");
    const recipename = card.dataset.name;
    if (favorites.some(r => r.name === recipename)) {
      favbtn.style.color = '#D35400';  
      favbtn.classList.add("favorited");
    }
    favbtn.onclick = function () {
      const recipe = {
        name: recipename,
        image: card.querySelector("img").src,
        title: recipename,
        description: card.querySelector("p").textContent
      };
  
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
      if (favbtn.classList.contains("favorited")) {
        favbtn.classList.remove("favorited");
        favorites = favorites.filter(r => r.name !== recipe.name);
      } 
      else {
        favbtn.classList.add("favorited");
        if (!favorites.some(r => r.name === recipe.name)) {
          favorites.push(recipe);
        }
      }
  
      localStorage.setItem("favorites", JSON.stringify(favorites));
      location.reload();
    };
    detailsbtn.onclick = function () {
      const allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
      const fullRecipe = allRecipes.find(r => r.name === recipename);
  
      const recipe = {
        name: fullRecipe.name,
        image: fullRecipe.image,
        title: fullRecipe.name,
        time: fullRecipe.time,
        noingredients: fullRecipe.noingredients,
        ingredients: fullRecipe.ingredients,
        instructions:fullRecipe.instructions
      };
  
      localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
      window.location.href = detailsbtn.getAttribute("data-target");
    };
  }
}

document.addEventListener("DOMContentLoaded", function () {//if i go to another page still the fav btn is orange
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  document.querySelectorAll(".recipe-card").forEach(card => {
    let favBtn = card.querySelector(".favorite-btn");
    let recipename = card.dataset.name;
    if (favorites.some(r => r.name === recipename)) {
      favBtn.style.color = '#D35400';  
      favBtn.classList.add("favorited");
    }
  });
});






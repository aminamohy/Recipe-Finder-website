const recipes = [
  {
    id: 1,
    name: "Shawrma",
    courseName: "main course",
    description: "A Surian dish",
    image: "imgs/shawrma.jpg",
    ingredients: [
      { id: 1, name: "Chicken", quantity: "200g" },
      { id: 2, name: "Garlic Sauce", quantity: "2 tbsp" },
      { id: 3, name: "Pita Bread", quantity: "1 piece" }
    ]
  },
  {
    id: 2,
    name: "Spaghetti",
    courseName: "main course",
    description: "An Italian dish",
    image: "imgs/spagetti.jpg",
    ingredients: [
      { id: 1, name: "Spaghetti", quantity: "100g" },
      { id: 2, name: "Tomato Sauce", quantity: "1 cup" },
      { id: 3, name: "Ground Beef", quantity: "100g" }
    ]
  },
  {
    id: 3,
    name: "Beans",
    courseName: "main course",
    description: "An Egyptian dish",
    image: "imgs/beans.jpg",
    ingredients: [
      { id: 1, name: "Fava Beans", quantity: "1 cup" },
      { id: 2, name: "Olive Oil", quantity: "1 tbsp" },
      { id: 3, name: "Lemon Juice", quantity: "1 tsp" },
      { id:4, name: "Onion", quantity: "200g"},
      { id:5, name:"Garlic", quantity: "2 cloves"},
      { id:6, name:"Cilantro leaves",quantity:"1/4 cup"},
      { id:7,name:"basil",quantity:"1 Tablespoon fresh"}
    ]
  },
  {
    id: 4,
    name: "Turkey Tacos",
    courseName: "main course",
    description: "A Mexican American dish",
    image: "imgs/Turkey_Tacos.jpg",
    ingredients: [
      { id: 1, name: "Ground Turkey", quantity: "150g" },
      { id: 2, name: "Taco Shell", quantity: "2" },
      { id: 3, name: "Lettuce", quantity: "1/2 cup" }
    ]
  },
  {
    id: 5,
    name: "Hearty Egg Burritos",
    courseName: "appetizers",
    description: "A protein-packed breakfast",
    image: "imgs/Hearty_Egg_Burritos.jpg",
    ingredients: [
      { id: 1, name: "Eggs", quantity: "2" },
      { id: 2, name: "Black Beans", quantity: "1/4 cup" },
      { id: 3, name: "Tortilla", quantity: "1" }
    ]
  },
  {
    id: 6,
    name: "Purple Vegetable Pancakes",
    courseName: "appetizers",
    description: "Colorful veggie pancakes",
    image: "imgs/Purple_Vegetable_Pancakes.jpg",
    ingredients: [
      { id: 1, name: "Beetroot", quantity: "1/2 cup" },
      { id: 2, name: "Carrot", quantity: "1/4 cup" },
      { id: 3, name: "Flour", quantity: "1/4 cup" }
    ]
  }
];
localStorage.setItem("allRecipes", JSON.stringify(recipes));


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




let favbtns = document.getElementsByClassName("favorite-btn");
for (let i = 0; i < favbtns.length; i++) {
  favbtns[i].onclick = function () {
    const btn = favbtns[i];
    const card = btn.closest('.recipe-card');

    const recipe = {
      name: card.dataset.name,
      image: card.querySelector("img").src,
      title: card.querySelector("h3").textContent,
      description: card.querySelector("p").textContent
    };

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (btn.classList.contains("favorited")) {
      
      btn.classList.remove("favorited");
      favorites = favorites.filter(r => r.name !== recipe.name);
    } 
    else {
      
      btn.classList.add("favorited");
      if (!favorites.some(r => r.name === recipe.name)) {
        favorites.push(recipe);
      }
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    location.reload();
  };

}


let detailsbtns = document.getElementsByClassName("recipe-details");

for (let i = 0; i < detailsbtns.length; i++) {
  detailsbtns[i].onclick = function () {
    const card = detailsbtns[i].closest(".recipe-card");

    const allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
    const recipeName = card.dataset.name;
    const fullRecipe = allRecipes.find(r => r.name === recipeName);

    const recipe = {
      name: fullRecipe.name,
      image: fullRecipe.image,
      title: fullRecipe.name,
      ingredients: fullRecipe.ingredients
    };

    localStorage.setItem("selectedRecipe", JSON.stringify(recipe));

    const targetPage = detailsbtns[i].getAttribute("data-target");
    window.location.href = targetPage;
  };
}






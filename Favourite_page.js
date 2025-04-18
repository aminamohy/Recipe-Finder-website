document.addEventListener("DOMContentLoaded", function () { 
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const container = document.getElementsByClassName("favorites-container")[0];

  favorites.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.dataset.name = recipe.name; 

    card.innerHTML = `
      <img src="${recipe.image}" alt="">
      <h3>${recipe.title}</h3>
      <p>${recipe.description}</p>
      <div class="buttons-container">
        <button class="favorite-btn" style="color: #D35400;"><i class="fa fa-heart"></i></button>
      </div>
    `;
    container.appendChild(card);
});

  const favbtns = document.getElementsByClassName("favorite-btn");
  for (let i = 0; i < favbtns.length; i++) {
    favbtns[i].onclick = function () {
      const btn = favbtns[i];
      const card = btn.closest(".recipe-card");
      const recipeName = card.dataset.name;

      favorites = favorites.filter(r => r.name !== recipeName);
      localStorage.setItem("favorites", JSON.stringify(favorites));

      card.remove();
    };
  }
});


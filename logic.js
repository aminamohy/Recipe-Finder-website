function searchRecipe() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let recipes = document.querySelectorAll(".recipe-card");

    recipes.forEach(recipe => {
        let name = recipe.getAttribute("data-name").toLowerCase();
        if (name.includes(input)) {
            recipe.style.display = "block";
        } else {
            recipe.style.display = "none";
        }
    });
}

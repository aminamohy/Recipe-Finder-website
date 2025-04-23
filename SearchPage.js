function searchRecipes(query) {
  const storedRecipes = JSON.parse(localStorage.getItem('allRecipes')) || [];

  return storedRecipes.filter(recipe => {
      const nameMatch = recipe.name.toLowerCase().includes(query.toLowerCase());

      const ingredientMatch = recipe.ingredients.some(ingredient =>
          ingredient.name.toLowerCase().includes(query.toLowerCase())
      );

      const countMatch = recipe.ingredients.length === parseInt(query);

      return nameMatch || ingredientMatch || countMatch;
  });
}

function handleSearch() {
  const query = document.getElementById('searchInput').value.trim();
  const results = searchRecipes(query);
  const container = document.getElementById('searchResults');

  const resultContainer = document.getElementById('resultsContainer');
  resultContainer.innerHTML = '';

  if (results.length > 0) {
      results.forEach(recipe => {
          const div = document.createElement('div');
          div.innerHTML = `
              <div class="recipe-card">
                  <img src="${recipe.image}" alt="${recipe.name}" />
                  <h3>${recipe.name}</h3>
                  <p>${recipe.description}</p>
                  <p><strong>Ingredients:</strong> ${recipe.ingredients.map(ing => ing.name).join(', ')}</p>
              </div>
          `;
          container.appendChild(div);
      });
  } 
  else {
      const notFound = document.createElement('p');
      notFound.className = 'not-found';
      notFound.textContent = 'No results found';

      const searchAgainBtn = document.createElement('button');
      searchAgainBtn.textContent = 'Search Again';
      searchAgainBtn.className = 'search-again-btn';
      searchAgainBtn.onclick = () => {
          document.getElementById('searchInput').value = '';
          document.getElementById('searchInput').focus();
          container.innerHTML = ''; 
      };

      container.appendChild(notFound);
      container.appendChild(searchAgainBtn);
  }
}
function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput.value.toLowerCase().trim();
  const resultContainer = document.getElementById('resultsContainer') || createResultsContainer();
  resultContainer.innerHTML = ''; 

  const recipes = JSON.parse(localStorage.getItem('allRecipes')) || [];

  let found = false;

  recipes.forEach(recipe => {
      const nameMatch = recipe.name.toLowerCase().includes(query);
      const ingredientsMatch = recipe.ingredients.some(ing =>
          ing.name.toLowerCase().includes(query)
      );
      const countMatch = recipe.noingredients === query;

      if (nameMatch || ingredientsMatch || countMatch) {
          found = true;

          const recipeDiv = document.createElement('div');
          recipeDiv.classList.add('recipe');
          recipeDiv.innerHTML = `
              <img src="${recipe.image}" alt="${recipe.name}">
              <h3>${recipe.name}</h3>
              <p>${recipe.description}</p>
              <p><strong>Time:</strong> ${recipe.time}</p>
              <p><strong>Ingredients:</strong> ${recipe.ingredients.length}</p>
          `;
          resultContainer.appendChild(recipeDiv);
      }
  });

  if (!found) {
      const notFoundMessage = document.createElement('div');
      notFoundMessage.className = 'not-found';
      notFoundMessage.textContent = 'No results found.';

      const againButton = document.createElement('button');
      againButton.className = 'search-again-btn';
      againButton.textContent = 'Search Again';
      againButton.onclick = () => {
          searchInput.value = '';
          searchInput.focus();
          resultContainer.innerHTML = '';
      };

      resultContainer.appendChild(notFoundMessage);
      resultContainer.appendChild(againButton);
  }
}
function createResultsContainer() {
  const container = document.createElement('div');
  container.className = 'recipes';
  container.id = 'resultsContainer';
  document.body.appendChild(container);
  return container;
}

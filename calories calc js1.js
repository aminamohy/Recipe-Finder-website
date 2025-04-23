
const meals = {
        "Pasta": { "Pasta": 200, "Tomato Sauce": 100, "Cheese": 150 },
        "Burger": { "Bun": 150, "Beef Patty": 250, "Cheese": 100, "Lettuce": 10 },
        "Salad": { "Lettuce": 15, "Tomato": 20, "Chicken": 200, "Dressing": 100 }
        };

        function showSuggestions() {
        const input = document.getElementById("meal").value.toLowerCase();
        const suggestionsDiv = document.getElementById("suggestions");
        suggestionsDiv.innerHTML = "";

        if (input.length === 0) {
        return;
        }

        for (let meal in meals) {
        if (meal.toLowerCase().includes(input)) {
        const suggestion = document.createElement("div");
        suggestion.classList.add("suggestion");
        suggestion.innerText = meal;
        suggestion.onclick = () => selectMeal(meal);
        suggestionsDiv.appendChild(suggestion);
        }
        }
        }

        function selectMeal(meal) {
        document.getElementById("meal").value = meal;
        document.getElementById("suggestions").innerHTML = "";
        showMealTable(meal);
        }

        function showMealTable(meal) {
        const ingredients = meals[meal];
        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";

        let totalCalories = 0;
        for (let ingredient in ingredients) {
        let row = `<tr><td>${ingredient}</td><td>${ingredients[ingredient]}</td></tr>`;
        tableBody.innerHTML += row;
        totalCalories += ingredients[ingredient];
        }

        document.getElementById("totalCalories").innerText = totalCalories;
        document.getElementById("mealTable").classList.remove("hidden");
        }
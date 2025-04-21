document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("recipe-form");
  const ingredientsList = document.getElementById("ingredients-list");
  const addIngredientBtn = document.querySelector(".add-btn"); // الزر الأول لإضافة مكون

  const directionsList = document.getElementById("directions-list");
  const addDirectionBtn = document.getElementById("add-direction-btn"); 

  // إضافة حقل جديد للمكونات
  addIngredientBtn.addEventListener("click", function () {
    const ingredientDiv = document.createElement("div");
    ingredientDiv.className = "ingredient";
    ingredientDiv.innerHTML = `
      <input type="text" placeholder="الكمية" required>
      <select>
        <option>gram</option>
        <option>oz</option>
        <option>cup</option>
      </select>
      <input type="text" placeholder="اسم المكون" required>
      <button type="button" class="remove-btn"><i class="fas fa-times"></i></button>
    `;
    ingredientsList.appendChild(ingredientDiv);

    // زر الحذف للمكون
    ingredientDiv.querySelector(".remove-btn").addEventListener("click", () => {
      ingredientDiv.remove();
    });
  });

  // إضافة خطوة تعليمات جديدة
  addDirectionBtn.addEventListener("click", function () {
    const directionDiv = document.createElement("div");
    directionDiv.className = "direction";
    directionDiv.innerHTML = `
      <textarea placeholder="اكتب خطوة من خطوات التحضير..." required></textarea>
      <button type="button" class="remove-btn"><i class="fas fa-times"></i></button>
    `;
    directionsList.appendChild(directionDiv);

    // زر الحذف للتعليمات
    directionDiv.querySelector(".remove-btn").addEventListener("click", () => {
      directionDiv.remove();
    });
  });

  // عند إرسال النموذج
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("recipe-name").value;
    const courseName = document.getElementById("course")?.value || "main course"; // في حالة عدم وجود خانة كورس
    const servings = document.getElementById("servings").value;
    const duration = document.getElementById("duration").value;
    const description = document.getElementById("description")?.value || "";
    const photoInput = document.getElementById("recipe-photo");

    // استخراج المكونات
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

    // استخراج خطوات التحضير
   // استخراج خطوات التحضير كأ array من النصوص فقط
const instructions = Array.from(directionsList.querySelectorAll("textarea")).map(textArea => textArea.value.trim());


    // التأكد من وجود صورة
    if (photoInput.files.length === 0) {
      alert("الرجاء اختيار صورة.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const imageData = event.target.result;

      const newRecipe = {
        id: Date.now(),
        name: name,
        courseName: courseName,
        description: description,
        image: imageData,
        time: `${duration} min`,
        servings: servings,
        noingredients: ingredients.length.toString(),
        ingredients: ingredients,
        instructions: instructions
      };

      // جلب الوصفات من localStorage أو البدء بمصفوفة فاضية
      let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

      // إضافة الوصفة
      recipes.push(newRecipe);

      // حفظها من جديد
      localStorage.setItem("recipes", JSON.stringify(recipes));

      // التوجيه لصفحة عرض الوصفات
      window.location.href = "Recipe_List_Page.html";
    };

    reader.readAsDataURL(photoInput.files[0]); // تحويل الصورة إلى base64
  });
});


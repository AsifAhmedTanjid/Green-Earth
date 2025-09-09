console.log("connected");

let cart = [];
let allPlants = [];

//load category

const loadCategory = async () => {
  // fetch("https://openapi.programming-hero.com/api/categories")
  //   .then((res) => res.json())
  //   .then((data) => displayCategories(data.categories));
  const url = `https://openapi.programming-hero.com/api/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.categories);
  removeActiveCategory();
  const clickedBtn = document.getElementById("allTreeBtn");
  // console.log(clickedBtn);

  clickedBtn.classList.add("activeCategory");
};
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = `<button id="allTreeBtn" onclick="loadCard(),loadCategory()" class="category-btn w-full text-center lg:text-left py-1 mt-2  rounded-md pl-[10px]  hover:bg-green-300 activeCategory">All Trees</button>`;
  // console.log(categoryContainer);
  for (let category of categories) {
    // console.log(category);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `<button id="categoryBtn-${category.id}" onclick="loadCategoryWiseCard(${category.id})" class="category-btn w-full text-center lg:text-left py-1 rounded-md pl-[10px] mt-2 hover:bg-green-300">${category.category_name}</button>`;
    categoryContainer.appendChild(btnDiv);
  }
};
//remove active class from category
const removeActiveCategory = () => {
  const categoryBtn = document.querySelectorAll(".category-btn");
  // console.log(categoryBtn);
  categoryBtn.forEach((btn) => btn.classList.remove("activeCategory"));
};

// load cards category wise
const loadCategoryWiseCard = async (id) => {
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.plants);
  displayCard(data.plants);
  removeActiveCategory();
  const clickedBtn = document.getElementById(`categoryBtn-${id}`);
  clickedBtn.classList.add("activeCategory");
  // console.log(clickedBtn);
};

// load cards

const loadCard = async () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  const res = await fetch(url);
  const data = await res.json();
  allPlants = data.plants;
  // console.log(allPlants);
  displayCard(data.plants);
};

const displayCard = (cards) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  for (let card of cards) {
    // console.log(card);

    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `            <!-- card-1  -->
            <div class="card bg-base-100  shadow-sm">
              <figure class="p-4 pb-0 -mb-2">
                <img
                  src="${card.image}"
                  alt="Product"
                  class="rounded-xl h-[250px] w-[300px]"
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title font-semibold text-sm mb-1 hover:cursor-pointer" onclick="loadTreeModal(${card.id})">
                  ${card.name}
                </h2>
                <p class="text-xs text-[#71717A]/80 text-justify min-h-12">
                 ${card.description}
                </p>
                <div class="flex justify-between font-semibold text-sm">
                  <div
                    class="badge text-[#15803D] text-sm font-medium rounded-full bg-[#DCFCE7] py-1 px-3 mb-2"
                  >
                    ${card.category}
                  </div>
                  <div>৳ <span>${card.price}</span></div>
                </div>
                <div class="card-actions justify-center">
                  <button onclick="addToCart(${card.id})"
                    class="add-to-cart-btn text-white bg-[#15803D] p-2 px-3 lg:px-5 hover:cursor-pointer rounded-full text-base font-medium hover:bg-green-900 w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>`;
    cardContainer.appendChild(cardDiv);
  }
};
//cart

const addToCart = (id) => {
  const plant = allPlants.find((p) => p.id === id);
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...plant, quantity: 1 });
  }
  displayCart();
};

const displayCart = () => {

  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";
  if(cart.length===0){
    const emptyCartDiv = document.createElement("div");
    emptyCartDiv.innerHTML=`         <div class="flex flex-col justify-center items-center lg:mt-28">
           <i class="fa-solid fa-cart-plus fa-5x"></i>
          <h1 class="text-red-500"> Your cart is empty </h1>
          <h1 class="text-green-800"> Add Some Plant to The Cart </h1>
         </div>`;
          cartContainer.appendChild(emptyCartDiv);
  }
  else{
  let totalPrice = 0;

  const totalPriceDiv = document.createElement("div");
  cart.forEach((item) => {
    console.log(item);
    const cartItem = document.createElement("div");

    cartItem.innerHTML = `
    
    
              <div class="bg-[#F0FDF4] flex justify-between items-center px-3 py-2 mb-2">
         
              <div>      
                <h3 class="font-semibold text-sm">${item.name}</h1>
                <p class="text-[#1F2937]/50">৳ <span class="tree-price">${item.price}</span> x <span class="tree-quantity">${item.quantity}</span></p>
              </div>
              <div>
                <p class="delete-from-cart text-[#8C8C8C] hover:cursor-pointer">X</p>
              </div>
  
            </div>
    
    
    
    `;
    // remove from cart
    cartItem
      .querySelector(".delete-from-cart")
      .addEventListener("click", () => {
        cart = cart.filter((c) => c.id !== item.id);
        displayCart();
      });
    cartContainer.appendChild(cartItem);
    totalPrice = totalPrice + item.price * item.quantity;
  });

  totalPriceDiv.innerHTML = `
          <!-- <div> -->
            <hr class="opacity-10">
          <!-- </div> -->

          <div class="flex justify-between mt-2 text-[#1F2937] font-medium">
            <h3>Total:</h3>
            <p>৳ <span class="total-price">${totalPrice}</span></p>
          </div>`;

  cartContainer.appendChild(totalPriceDiv);
}
};

//modal
const loadTreeModal = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  // console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  displayTreeModal(data.plants);
};

const displayTreeModal = (plant) => {
  console.log(plant);
  const modalContainer = document.getElementById("model-container");
  modalContainer.innerHTML = `            
              <figure class="p-4 pb-0 -mb-2">
                <img
                  src="${plant.image}"
                  alt="Product"
                  class="rounded-xl h-[400px] w-[600px]"
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title font-normal text-xl mb-1 hover:cursor-pointer">
                 <b>Name:</b> ${plant.name}
                </h2>
                <p class="text-base text-Black text-justify mb-1">
                 <b>Description : </b>${plant.description}
                </p>
                
                  <div
                    class="py-1 mb-2 text-base text-Black"
                  >
                    <b>Category : </b>${plant.category}
                  </div>
                  <div class="py-1 text-base text-Black"><b>Price :</b> ৳ <span>${plant.price}</span></div>
                
              </div>
            `;
  document.getElementById("my_modal_5").showModal();
};

loadCard();
loadCategory();

console.log("connected");

//load category

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("catergory-container");
  // console.log(categoryContainer);
  for (let category of categories) {
    console.log(category);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `<button onclick="loadCategoryWiseCard(${category.id})" class="w-full text-center lg:text-left py-1 rounded-md pl-[10px] mt-2 hover:bg-green-300">${category.category_name}</button>`;
    categoryContainer.appendChild(btnDiv);
  }
};


// load cards category wise 
const loadCategoryWiseCard= async(id)=>{
console.log(id);
const url =`https://openapi.programming-hero.com/api/category/${id}`;
const res = await fetch(url);
const data= await res.json();
// console.log(data.plants);
displayCard(data.plants);

}



// load cards

const loadCard = async () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  const res = await fetch(url);
  const data = await res.json();
  displayCard(data.plants);
};

const displayCard = (cards) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML='';
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
                  <button
                    class="text-white bg-[#15803D] p-2 px-3 lg:px-5 hover:cursor-pointer rounded-full text-base font-medium hover:bg-green-900 w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>`;
    cardContainer.appendChild(cardDiv);
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
                 <b>Description</b> : ${plant.description}
                </p>
                
                  <div
                    class="py-1 mb-2 text-base text-Black"
                  >
                    <b>Category :</b> ${plant.category}
                  </div>
                  <div class="py-1 text-base text-Black"><b>Price :</b> ৳ <span>${plant.price}</span></div>
                
              </div>
            `;
  document.getElementById("my_modal_5").showModal();
};

loadCard();
loadCategory();

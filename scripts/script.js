console.log('connected');


//load category

loadCategory =()=>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res=> res.json())
    .then(data=>displayCategories(data.categories))
}
displayCategories=(categories)=>{
    const categoryContainer=document.getElementById("catergory-container");
    // console.log(categoryContainer);
    for(let category of categories){
        // console.log(category);
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML=`<button class="w-full text-center lg:text-left py-1 rounded-md pl-[10px] mt-2 hover:bg-green-300">${category.category_name}</button>`;
        categoryContainer.appendChild(btnDiv);
        
    }
}
loadCategory();



// load cards 

const loadCard = async()=>{
    const url="https://openapi.programming-hero.com/api/plants";
    const res =await fetch(url);
    const data = await res.json();
    displayCard(data.plants);
    
}

displayCard = (cards) =>{
    const cardContainer =document.getElementById('card-container');
    for(let card of cards){
        console.log(card);
        
        const cardDiv =document.createElement("div");
        cardDiv.innerHTML=`            <!-- card-1  -->
            <div class="card bg-base-100  shadow-sm">
              <figure class="p-4 pb-0 -mb-2">
                <img
                  src="${card.image}"
                  alt="Product"
                  class="rounded-xl h-[250px] w-[300px]"
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title font-semibold text-sm mb-1">
                  ${card.name}
                </h2>
                <p class="text-xs text-[#71717A]/80 text-justify mb-1">
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

}
loadCard();
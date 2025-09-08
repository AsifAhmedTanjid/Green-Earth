console.log('connected');


//load category

loadCategory =()=>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res=> res.json())
    .then(data=>displayCategories(data.categories))
}
displayCategories=(categories)=>{
    const categoryContainer=document.getElementById("catergory-container");
    console.log(categoryContainer);
    for(let category of categories){
        // console.log(category);
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML=`<button class="w-full text-center lg:text-left py-1">${category.category_name}</button>`;
        categoryContainer.appendChild(btnDiv);
        
    }
}
loadCategory();
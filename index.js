// fetch data of all pets 
const loadAll = async () => {
  document.getElementById('afterLoad').classList.add('hidden')
  document.getElementById('spinner').style.display = 'block'
  setTimeout(function(){
    fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())
    .then((data) => {
     displayAllPets(data.pets)})
  },2000)
  // const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
  // const data = await response.json()
  // displayAllPets(data.pets)
}

//display allpets here we made all pets cards
const displayAllPets = (data) => {
  document.getElementById('spinner').style.display = 'none'
  document.getElementById('afterLoad').classList.remove('hidden')
  const petsContainer = document.getElementById('pets-container')
  petsContainer.innerHTML = ""
  if (data.length == 0) {
    petsContainer.classList.remove("grid");
    petsContainer.innerHTML = `
    <div class="flex flex-col gap-3 justify-center items-center text-center bg-slate-100 border rounded-md p-5">
    
      <img src="images/error.webp" alt="">
      <h2 class="text-center text-xl font-bold"> No Information Available</h2>
      <p>We are sorry to say that there are not any birds collection but we <br> assure you that soon it will be updated thank you</p>
    </div>`;
  } else {
    petsContainer.classList.add("grid");
  }
  data.forEach(pet => {
    const { breed, image, date_of_birth, gender, price, pet_name, petId } = pet
    const div = document.createElement('div')
    div.innerHTML = `
      <div class="card bg-base-100 ml-4 md:ml-2 m-2 w-48 md:w-56 lg:w-72 shadow-xl border rounded-md">
<figure class="px-5 pt-5">
  <img
    src=${image}
    alt="Shoes"
    class="rounded-xl" />
</figure>
<div class="card-body flex flex-col gap-3">
  <h2 class="card-title">${pet_name}</h2>
  <p><i class="fa-solid fa-box"></i> Breed: ${breed ? breed : "N/A"}</p>
  <p><i class="fa-regular fa-calendar-days"></i> Birth: ${date_of_birth ? date_of_birth : "N/A"}</p>
  <p><i class="fa-solid fa-mercury"></i> Gender: ${gender ? gender : "N/A"}</p>
  <p><i class="fa-solid fa-dollar-sign"></i> Price: ${price ? price+`$` : "N/A"}</p>
  <hr></hr>
  <div class="card-actions flex justify-around mt-2">
    <button onclick="petData(${petId})" class="btn btn-${petId} btn-clk1 h-5 w-16"><i class="fa-regular fa-thumbs-up"></i></button>
    <button id="(${petId})" onclick="time(${petId})" class="btn btn-2 h-5 w-16 text-btn_color btn-clk2">Adopt</button>
    <button  onclick="details(${petId})" class="btn text-btn_color h-5 w-16 btn-clk3">Details</button>
  </div>
</div>
</div> 
      `
    petsContainer.appendChild(div)
  });
}

//liked button get individual pet data of object
const petData = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => {
      likediv(data.petData)
    })
}

//with this it get the pic and make a div and append it
const likediv = (data) => {
  const { image } = data
  likeContainer = document.getElementById('like-container')
  const div = document.createElement('div')
  div.classList = ""
  div.innerHTML = `
   <div class="m-1 px-2 w-36 h-28 shadow-xl border rounded-md content-center md:ml-3 lg:ml-1">
  <img 
    src=${image}
    alt="Shoes"
    class="rounded-md"/>
</div> 
  `
  likeContainer.appendChild(div)
}

//details button gets id and pass it to info for modal
const details = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => info(data.petData))
}

//details info modal
const info = (data) => {
  const detailContainer = document.getElementById("modal-content");
  const { breed, image, date_of_birth, gender, price, pet_name, pet_details, vaccinated_status } = data

  detailContainer.innerHTML = `
   <div class="card bg-base-100">
  <img
    src=${image}
    alt="Shoes"
    class="rounded-xl" />
<div class="flex flex-col gap-3 ml-2">
  <h2 class="mt-3 card-title">${pet_name}</h2>
  <div class="flex gap-20">
  <p><i class="fa-solid fa-box"></i> Breed: ${breed ? breed : "N/A"}</p>
  <p><i class="fa-regular fa-calendar-days"></i> Birth: ${date_of_birth ? date_of_birth : "N/A"}</p>
  </div>
  <div class="flex gap-20">
  <p><i class="fa-solid fa-mercury"></i> Gender: ${gender ? gender : "N/A"}</p>
  <p><i class="fa-solid fa-dollar-sign"></i> Price: ${price ? price : "N/A"}${`$`}</p>
  </div>
  <p><i class="fa-solid fa-mercury"></i>Vaccinated status:${vaccinated_status}</p>
  <hr></hr>
  <h2 class="font-bold">Details Information</h2>
  <p>${pet_details}</p>
</div>
</div> 
  `;
  document.getElementById("customModal").showModal();
};

//adopt modal
const time = (data) => {
  const adoptContainer = document.getElementById("modal-content2");
  adoptContainer.innerHTML = `
  <div class="flex flex-col items-center">
       <img class="w-48 h-44"  src="https://img.icons8.com/?size=48&id=q6BlPrJZmxHV&format=png" alt="">
          <h1 class="font-extrabold text-3xl text-center">congrats</h1>
           <h1 class="font-bold text-center">Adaptation process is start for your pet</h1>
          
           
          <h1 id="count" class="font-extrabold text-6xl"></h1>
          
           <script>
        </script>  
  </div>
  `
  //countdown
  // callTimmer()
  function callTimmer() {
    const currentCount = document.getElementById('count');
    let timo = 3
    const value = setInterval(() => {
      currentCount.innerText = timo;
      if (timo <= 0) {
        clearInterval(value);
      } else {
        timo--;
      }
    }, 1000);
  }
  callTimmer()

  document.getElementById("TimeModal").showModal();
  
  //modal close after 3sec
  setTimeout(() => {
    document.getElementById('TimeModal').close();
    //document.getElementById('data').classList.add('disabled');
  }, 3000)
}

//load all categories
const loadCategories = () => {
  //fetch the data
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));

};


//display categories button
const displayCategories = (categories) => {

  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${item.category}" onclick="handle('${item.category}')" class="btn category-btn w-72 h-24 btn  flex gap-3 items-center justify-center">
       <img class="" src="${item.category_icon}" alt="">
      <h2 class="text-lg">${item.category}</h2>
      </button>
    `;
    categoryContainer.append(buttonContainer);
  });
};

//spinner loading 2 sec and button activation
const handle = (category) => {
  removeActiveClass();
  const activeBtn = document.getElementById(`btn-${category}`);
  activeBtn.classList.add("active");

  document.getElementById('afterLoad').classList.add('hidden')
  document.getElementById('spinner').style.display = 'block'
  setTimeout(function () {
    categoryCard(category) //after 2s load it pass it to next function
  }, 2000)
}

//category wise array are created and pass it to displayallpets
const categoryCard = (category) => {

  document.getElementById('spinner').style.display = 'none'
  document.getElementById('afterLoad').classList.remove('hidden')

  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      displayAllPets(data.data);
    })
}

//remove previous clicked active class
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  //console.log(buttons);
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
}

//spinner 2s and all 17pets objects of array by sort by price button
const price = () => {
  document.getElementById('afterLoad').classList.add('hidden')
  document.getElementById('spinner').style.display = 'block'
  setTimeout(function () {
    fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())
    .then((data) => {
      sortPrice(data.pets);
    })
  }, 2000)
}

const sortPrice=(data)=>{
  document.getElementById('spinner').style.display = 'none'
document.getElementById('afterLoad').classList.remove('hidden')
//convert 17objects of array according to price into a new decending order objects of array and pass it to displayallpets where decending price order card will be made
data.sort((a, b) => b.price - a.price);
displayAllPets(data)
}

//initialize two main function and their api with out reference call
loadCategories();
loadAll()




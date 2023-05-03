// async function getUsers() {
//     const res = await fetch("https://jsonplaceholder.typicode.com/users")
//     const data = await res.json()

//     console.log(data)
// }

// getUsers()

// const getUsers = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/users");
//   const data = await res.json();
//   displayUser(data);
// };

// function displayUser(users) {
//   const displayName = document.querySelector(".results-container");
//   users.forEach((user) => {
//     displayName.innerHTML += `   
//     <div class="col col-5 results-header results-card">
//     <h3>${user.name}</h3>
//     <img src="images/healthy-food.png" alt="product-img">
//     <div class="results-body">RESULTS BODY Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat eaque ducimus, facilis ad beatae soluta, ut aut incidunt minus omnis, aperiam illo odio officia. Quos tempore quod consequatur qui obcaecati!</div>
//     <button class="btn btn-shop">Shop Now</button>
//   </div>
//     `;
//   });
// }

// getUsers();

const token = process.env.ACCESS_TOKEN

const getGroceries = async () => {
    const res = await fetch("https://api.kroger.com/v1/products?filter.term=pretzels&filter.limit=2")
    const data = await res.json()
    console.log(data)
}

getGroceries()



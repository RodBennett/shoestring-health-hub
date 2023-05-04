// const axios = require("axios");
const token =
  "eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJzaG9lc3RyaW5naGVhbHRoLTQzZWFlNDVmZjJmM2RjMjQ5M2EzMTU4NDI5OTE3ZjdlNjk5ODYwNzE0NTI4MDM0NjYyOSIsImV4cCI6MTY4MzE3ODA0NCwiaWF0IjoxNjgzMTc2MjM5LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImFmYzQ5MDU2LTU1ZWItNTUwNi05ZDZiLTZjMDRhN2EzNDY4YiIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNjgzMTc2MjQ0MDg1MTU5MjI4LCJhenAiOiJzaG9lc3RyaW5naGVhbHRoLTQzZWFlNDVmZjJmM2RjMjQ5M2EzMTU4NDI5OTE3ZjdlNjk5ODYwNzE0NTI4MDM0NjYyOSJ9.R7oud94qlkx2z0rn0begq--lG4O3ib6qUA0dVR_AEKCsKucowGbrIL6hLxt42slxKc2BDF3LCdenBUJG8HXV5hnkb5V1QTGr1w3KT_R85SFMAGj0433Ga6OAK9INSj6C4FXrUGvl4fc7RdgTkQVrqC-uH6Y4GJtEQQHs9GF3nyc1vqINg_u2hzlGUbBDpUuOq6j056KuLrv-wFbX5lEpqwwdmcVTq3i2JO61LwGtWGpDHsQI4gsgcXxuGVrLKF0mIVDmyWXU4JWPMrvK-F1ghx2Kqgc_ECxZTVMAWRfx9YFRDn1Eu_ZqbRnnSKgWnzennUeOx1hp9Js2QWEaLDMjNg";


async function getProducts() {
    const productUrl = "https://api.kroger.com/v1/products?filter.term=pretzels&filter.limit=2";
    const locationUrl = `https://api.kroger.com/v1/locations?filter.zipCode.near=80201&filter.radiusInMiles=5`;

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

  const productResponse = await fetch(productUrl,  { headers });
  const productData = await productResponse.json();
  const products = productData.data;

  const locationResponse = await fetch (locationUrl, { headers })
  const locationData = await locationResponse.json();
  const locations = locationData.data


  displayProduct(products);
  displayStores(locations)

  console.log(products, locations)
  // products.forEach(product => {
  //     const brand = product.data.brand
  //     console.log(brand)
  // })
}

function displayProduct(foods) {
  foods.forEach((food) => {
    const brand = food.brand;
    const description = food.description;
    const image = food.images[0].sizes.find(
      (size) => size.size === "medium"
    ).url;

    const div = document.createElement("div")
    div.classList.add("col", "col-5", "results-header", "results-card")
    div.innerHTML = `
         <h3>${description}</h3>
         <img src="${image}" alt="product-img">
        <button class="btn btn-shop">Shop Now</button>
    `;

    document.querySelector(".results-container").appendChild(div)
});
}

function displayStores(stores) {
    stores.forEach(store => {
        const chain = store.chain
        const streetAddress = store.address.addressLine1
        const city = store.address.city
        const state = store.address.state
        const zipcode = store.address.zipcode

        const locations = document.querySelector(".results-body")
        locations.innerHTML += `
        <div class="results-body">Avaiable at ${chain}, ${streetAddress}</div>
        `
        // document.querySelector(".results-").append(locations)
    });
}
getProducts();




// KROGER_CLIENT_ID=shoestringhealth-43eae45ff2f3dc2493a3158429917f7e6998607145280346629

// KROGER_CLIENT_SECRET=TxBkGXmA2lLUanP4M0kh3zqdE9rCv16KOc2aoQct
// PORT=3000

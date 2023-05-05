const resultsContainer = document.querySelector(".results-container")
const krogerBaseUrl = "https://api.kroger.com/v1";
// const productUrl = `https://api.kroger.com/v1/products?filter.term=${searchTerm}&filter.locationId=${locationId}&filter.limit=10`;
// const locationUrl = `https://api.kroger.com/v1/locations?filter.zipCode.near=${zipCode}&filter.radiusInMiles=${radius}`;

const token =
  "eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJzaG9lc3RyaW5naGVhbHRoLTQzZWFlNDVmZjJmM2RjMjQ5M2EzMTU4NDI5OTE3ZjdlNjk5ODYwNzE0NTI4MDM0NjYyOSIsImV4cCI6MTY4MzMyODU3NywiaWF0IjoxNjgzMzI2NzcyLCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImFmYzQ5MDU2LTU1ZWItNTUwNi05ZDZiLTZjMDRhN2EzNDY4YiIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNjgzMzI2Nzc3OTQ2NDE4NDg2LCJhenAiOiJzaG9lc3RyaW5naGVhbHRoLTQzZWFlNDVmZjJmM2RjMjQ5M2EzMTU4NDI5OTE3ZjdlNjk5ODYwNzE0NTI4MDM0NjYyOSJ9.rVxaDf5b8Gpq4Ku5reHoF70lo5NQzaM1-dNw4e5dQMPP7QpYQl8WYHZ94MMCXQhKptE0Ee2RO_vgIzSWElbOiW0I0ktiTmp3QVX7w2oof84I314HnSSeyCWXENTy-df8jMuo-maU6Wq006wlb_likGQ2GrvQ-33LhwhrS9LcrKW3xi8oLNOzQhFEoxPmo9hvtwqBCwr071u2ABxu_oOQnbbvuJFLgm6ZCBNyYdaiBjM4UIa4TS0tKRt5XyRQ76d6_PKawfwZ1Mxo6Uontu3XCvHpDUsiBQcNCLW4SGtHe2oyFTM-BAsU8JTRYuzaFl7MqAo134ExN6PTWa4jwmOVew"

  ;

limit = 10
locationId = 62000115
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

let searchInputEl = document.querySelector("#search-input")
const button = document.querySelector(".btn-search").addEventListener("click", getProductsBySearch)

async function getProductsBySearch(e) {
    e.preventDefault()
  const response = await fetch(
    `${krogerBaseUrl}/products?filter.term=${searchInputEl.value}&filter.limit=${limit}`,
    { headers }
  );
  const data = await response.json();
  const products = data.data;

  displayProducts(products)
}


async function displayProducts(products) {
    resultsContainer.innerHTML = ""
    searchInputEl.innerHTML = ""

    products.forEach(product => {
        const brand = product.brand
        const description = product.description
        const image = product.images[0].sizes.find((size) => size.size == "medium").url
        const div = document.createElement("div")

        div.classList.add("col", "col-5", "results-header", "results-card")
        div.innerHTML = `
             <h3>${description}</h3>
             <img src="${image}" alt="product-img">
             <div class="results-body">Made by: ${brand}</div>
            <button class="btn btn-shop">Shop Now</button>
        `;

        document.querySelector(".results-container").appendChild(div)
    })
}

// async function getProductById(id) {
//     const response = await fetch(`${krogerBaseUrl}/products/${id}`, { headers });
//     const data = await response.json()
//     const product = data.data
//     const productId = product.productId
//     console.log(productId)
//     getProductAtLocation(productId, locationId)
// };

async function getProductAtLocation(id, locationId) {
    const response = await fetch(`${krogerBaseUrl}/products/${id}?filter.locationId=${locationId}&filter.limit=${limit}`, { headers });
    const data = await response.json()
    const productById = data.data
    console.log(productById)
}

// basic html router:
const global = {
    currentPage: window.location.pathname,
    search: {
        term: ""
    }
}

function init() {
    switch (global.currentPage) {
      case "/":
      case "/index.html":
        console.log("home")
      case "/product-details.html":
        console.log("details")
    }
}

console.log(global)

document.addEventListener("DOMContentLoaded", init)

// const searchFormEl = document.querySelector('#city-search')
// const searchButton = document.querySelector('.submit-btn')
// const newSearchBtnEl = document.querySelector('.clear-btn')
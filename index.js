const searchTerm = "pretzels"
const zipCode = "80203";
const radius = 2
const locationId = 62000115

const krogerBaseUrl = "https://api.kroger.com/v1"
const productUrl =
    `https://api.kroger.com/v1/products?filter.term=${searchTerm}&filter.locationId=${locationId}&filter.limit=10`;
const locationUrl = `https://api.kroger.com/v1/locations?filter.zipCode.near=${zipCode}&filter.radiusInMiles=${radius}`;



const storesWithItemUrl = `https://api.kroger.com/v1/products/0001111041700/locations?filter.locationTypes=STORE&filter.limit=10`
// const locationIdUrl = `https://pai.kroger.com/v1/locations=${locationId}`
// const singleProductUrl = `https://api.kroger.com/v1/products/${productId}?filter.locationId={locationId}`;

// Kroger access token set at collection level, needs to be changed every 30 mins
const token =
  "eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJzaG9lc3RyaW5naGVhbHRoLTQzZWFlNDVmZjJmM2RjMjQ5M2EzMTU4NDI5OTE3ZjdlNjk5ODYwNzE0NTI4MDM0NjYyOSIsImV4cCI6MTY4MzIzNjY4MCwiaWF0IjoxNjgzMjM0ODc1LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImFmYzQ5MDU2LTU1ZWItNTUwNi05ZDZiLTZjMDRhN2EzNDY4YiIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNjgzMjM0ODgwNjA0OTA0MjI1LCJhenAiOiJzaG9lc3RyaW5naGVhbHRoLTQzZWFlNDVmZjJmM2RjMjQ5M2EzMTU4NDI5OTE3ZjdlNjk5ODYwNzE0NTI4MDM0NjYyOSJ9.Lfdd5o5FHm0XRGSYa88iRxcoNvIUgY87izSHANNtTXFdq76A2Qxy3TVMGHGKKz9WtclGj9vbttfYOA1xuzYQHSjLgl-t_CyVJRrX6gAZjcQiTJQ6SogizMYhWJSFm028iNctdi1jTjM9trQ4tZK0avzZuuZiE6QDLsodf38Awb9CxrsV5ZDe7A1xp3DKW7HrMjUoljYR_QUK2CNlypUlF4_pM3JdzjfUstJjur4LExi68ttkled-LocPjRmH4AWLvL-pEtuM779VPKAg4FhapGNlkfQ0wwsbZcAbCEzm3RrTv9YsJPpNdlnO4uBYxoZ1aZeGYJ4Z_EKr11jpNW5pBg"


  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

async function getProducts(searchTerm, locationId) {
    // make call to product url
  const productResponse = await fetch( `https://api.kroger.com/v1/products?filter.term=${searchTerm}&filter.locationId=${locationId}&filter.limit=10`, { headers });
  const productData = await productResponse.json();
  const products = productData.data;
  const productIds = products.map(product => product.productId)
    getProduct(productIds[0], locationId)
    console.log(productIds)

    // make call to location url
//   const locationResponse = await fetch(`${krogerBaseUrl}/locations?filter.zipCode.near=${zipcode}`, { headers });
//   const locationData = await locationResponse.json();
//   const locations = locationData.data;    
//   console.log(locations.locationId)

//   displayProduct(products);
//   displayStores(locations);
}
async function getProduct(productId, locationId) {
    const productResponse = await fetch(`https://api.kroger.com/v1/products/${productId}?filter.locationId=${locationId}`, { headers });
    const singleProductData = await productResponse.json();
    console.log(singleProductData)
    const singleProduct = singleProductData.data
    const item = singleProduct.items[0]
    const price = item.price.promo = 0 ? item.price.regular : item.price.regular

    const location = singleProduct.locationId
    console.log(location)

    // const locationResponse = await fetch( `https://api.kroger.com/v1/locations/${locationId}`, { headers })
    // const locationData = await locationResponse.json()
    const locations = productResponse.data;
    const name = locations.name
    // console.log(locations, name)
    // console.log(price)
}


async function getLocationId(locationId) {
    const response = await fetch( `https://api.kroger.com/v1/locations/${locationId}`, { headers })
    const locationData = await response.json()
    const locations = locationData.data;
    const name = locations.name
    console.log(locations, name)
}

getLocationId(62000115)

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
// env variables for reference:
// KROGER_CLIENT_ID=shoestringhealth-43eae45ff2f3dc2493a3158429917f7e6998607145280346629

// KROGER_CLIENT_SECRET=TxBkGXmA2lLUanP4M0kh3zqdE9rCv16KOc2aoQct
// PORT=3000


// I want to search for pretzles and see a list of stores where pretzels are sold sorted by price.

async function productStores() {
    const searchItem = "pretzels"
    const storesByProduct = {}

    const response = await fetch(`https://api.kroger.com/v1/products?filter.term=${searchItem}`, { headers });


    const data = await response.json()
    const products = data.data
    console.log(products)
    products.forEach((product) => {
        product.locations.forEach((location) => {
            const storeId = location.locationId;
            console.log(storeId)
            if(storesByProduct[storeId]) {
                storesByProduct[storeId].push(product.description)
            } else {
                storesByProduct[storeId] = [product.description]
            }
        })
        console.log(storesByProduct)
    })
}

productStores()
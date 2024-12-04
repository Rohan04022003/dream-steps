const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let date = new Date();
let name = month[date.getMonth()];
let day = date.getDate();
let pageShadow = document.querySelector("#article");
const pathname = window.location.pathname;
const segments = pathname.split("/");
const fileName = segments.pop();

function menuBarFunction() {
  let mobileNav = document.querySelector(".mobileNav");
  let menuBar = document.querySelectorAll(".menuBar");

  menuBar.forEach((elem) => {
    elem.addEventListener("click", function () {
      if (mobileNav.classList.contains("right-[-100vw]")) {
        mobileNav.classList.remove("right-[-100vw]");
        mobileNav.classList.add("right-0");
      } else {
        mobileNav.classList.add("right-[-100vw]");
        mobileNav.classList.remove("right-0");
      }
    });
  });
}
menuBarFunction();

function searchSectionFunction() {
  let openSearch = document.querySelector(".operSearch");
  let searchBar = document.querySelector(".searchBar");

  openSearch.addEventListener("click", function () {
    if (searchBar.classList.contains("hidden")) {
      searchBar.classList.remove("hidden");
      searchBar.classList.add("flex");
      searchBar.classList.add("h-16");
      pageShadow.classList.add("brightness-75");
    } else {
      searchBar.classList.remove("flex");
      searchBar.classList.add("hidden");
      searchBar.classList.remove("h-16");
      pageShadow.classList.remove("brightness-75");
      document.querySelector(".searchedItemsMainDiv").classList.add("hidden");
    }
  });

  let closeSearch = document.querySelector(".closeSearch");

  closeSearch.addEventListener("click", function () {
    searchBar.classList.remove("flex");
    searchBar.classList.add("hidden");
    searchBar.classList.remove("h-16");
    pageShadow.classList.remove("brightness-75");
    document.querySelector(".searchedItemsMainDiv").classList.add("hidden");
  });
}
searchSectionFunction();

if (
  fileName != "brand.html" &&
  fileName != "help.html" &&
  fileName != "my-order.html"
) {
  function mouseMoveAnimation() {
    let heroImg = document.querySelector(".heroImg");
    let heroBuyBtn = document.querySelector(".heroBuyBtn");

    heroImg.addEventListener("mouseenter", function (dets) {
      heroBuyBtn.style.display = "flex";
    });
    heroImg.addEventListener("mousemove", function (dets) {
      heroBuyBtn.style.left = dets.x + "px";
      heroBuyBtn.style.top = dets.y + "px";
    });
    heroImg.addEventListener("mouseleave", function (dets) {
      heroBuyBtn.style.display = "none";
    });
  }
  mouseMoveAnimation();
}

function accountSection() {
  let loginCloseBtn = document.querySelectorAll(".login-close-btn");
  let accountSection = document.querySelector(".account-section");

  loginCloseBtn.forEach((elem) => {
    elem.addEventListener("click", function () {
      if (accountSection.classList.contains("hidden")) {
        accountSection.classList.remove("hidden");
        pageShadow.classList.add("brightness-75");
        document.querySelector(".mobileNav").classList.add("right-[-100vw]");
      } else {
        accountSection.classList.add("hidden");
        pageShadow.classList.remove("brightness-75");
      }
    });
  });
}
accountSection();

function haveAnAccount() {
  let createAccount = document.querySelector(".create-accout");
  let loginAccount = document.querySelector(".login-account");
  let forgetPassword = document.querySelector(".forget-password");
  let userName = document.querySelector(".user-name");
  let loginRegister = document.getElementsByClassName("loginRegister");

  createAccount.addEventListener("click", function () {
    if (userName.classList.contains("hidden")) {
      userName.classList.remove("hidden");
      forgetPassword.classList.add("hidden");
      loginAccount.classList.remove("hidden");
      createAccount.classList.add("hidden");
      loginRegister[0].innerText = "REGISTER";
      loginRegister[1].innerText = "Register";
    }
  });

  loginAccount.addEventListener("click", function () {
    if (userName.classList.contains("hidden") === false) {
      userName.classList.add("hidden");
      forgetPassword.classList.remove("hidden");
      loginAccount.classList.add("hidden");
      createAccount.classList.remove("hidden");
      loginRegister[0].innerText = "LOGIN";
      loginRegister[1].innerText = "Login";
    }
  });
}
haveAnAccount();

function shoesVideos() {
  const videos = document.querySelectorAll(".video");

  videos.forEach((video) => {
    video.addEventListener("mouseenter", function () {
      this.play();
    });

    video.addEventListener("mouseleave", function () {
      this.pause();
    });
  });
}
shoesVideos();

// --------------- Add To Cart --------------

let addToCartCloseBtn = document.querySelectorAll(".addToCartCloseBtn");
let itemBox = document.querySelector(".itemBox");
let addToCart = document.querySelector(".addToCart");
let cart = JSON.parse(localStorage.getItem("cart")) || {
  items: [],
  itemCount: 0,
};

function addToCartOpenClose() {
  addToCartCloseBtn.forEach((elem) => {
    elem.addEventListener("click", function () {
      if (addToCart.classList.contains("right-[-100vw]")) {
        addToCart.classList.remove("right-[-100vw]");
        addToCart.classList.add("right-0");
        pageShadow.classList.add("brightness-75");
      } else {
        addToCart.classList.add("right-[-100vw]");
        addToCart.classList.remove("right-0");
        pageShadow.classList.remove("brightness-75");
      }
    });
  });
}
addToCartOpenClose();

function addProduct() {
  document.addEventListener("DOMContentLoaded", function () {
    let productAddToCart = document.querySelectorAll(".product-add-to-cart");
    let prodAddToCart;
    let prodDescription;
    let prodName;
    let prodPrice;
    let prodImage;
    productAddToCart.forEach((elem) => {
      elem.addEventListener("click", function (e) {
        prodAddToCart = e.target.parentNode;
        prodDescription = prodAddToCart.parentNode;
        prodName =
          prodDescription.firstElementChild.firstElementChild.innerText;
        prodPrice =
          prodDescription.firstElementChild.lastElementChild.innerHTML;
        prodImage =
          prodDescription.parentNode.firstElementChild.nextElementSibling
            .firstElementChild.src;

        let item = {
          name: prodName,
          price: prodPrice,
          image: prodImage,
          addedToCart: true,
        };

        cart.items.push(item);
        cart.itemCount = Number(cart.itemCount) + 1; // Ensure itemCount is a number
        document.querySelector(".itemCountBox").classList.remove("hidden");
        document.querySelector(".itemCountBox").innerText = cart.itemCount;
        document.querySelector(".addedMessage").innerText =
          "Cart Items Added Successfully.";
        notificationCartItems();
        saveCartToLocalStorage();
        displayCart();
      });
    });
  });
}
addProduct();

function notificationCartItems() {
  if (
    document.querySelector(".notification").classList.contains("-right-[30rem]")
  ) {
    document.querySelector(".notification").classList.remove("-right-[30rem]");
    document.querySelector(".notification").classList.add("right-0");
    setTimeout(() => {
      notificationTimmer();
    }, 3000);
  }
}

function notificationTimmer() {
  document.querySelector(".notification").classList.add("-right-[30rem]");
  document.querySelector(".notification").classList.remove("right-0");
}

function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
  itemBox.innerHTML = "";
  cart.items.forEach((item) => {
    let itemHTML = `
      <div class="cartItem flex justify-between items-center pt-4">
        <div class="flex items-center lg:gap-8 gap-3">
          <img src="${item.image}" alt="" class="lg:w-28 w-24">
          <div class="itemInfo flex flex-col gap-2">
            <h3 class="text-[4vw] lg:text-xl capitalize tracking-wide cartProductName">${item.name}</h3>
            <p class="flex gap-4 text-xs">${item.price}</p>
          </div>
        </div>
        <i class="fa-solid fa-xmark text-2xl lg:py-2 py-1 lg:px-4 px-3 rounded-full cursor-pointer hover:bg-slate-800" onclick="deleteItems(this)"></i>
      </div>`;
    itemBox.innerHTML += itemHTML;
  });
  itemCount();
  displayEmptyCartMessage();
}

displayCart();

function displayEmptyCartMessage() {
  const emptyCartElement = document.querySelector(".emptyCart");

  if (cart.itemCount > 0) {
    console.log("Empty cart message found!");
    emptyCartElement.style.display = "none";
    itemBox.classList.remove("hidden");
  } else {
    emptyCartElement.style.display = "flex";
    itemBox.classList.add("hidden");
  }
}
displayEmptyCartMessage();

function itemCount() {
  document.querySelector(".itemCount").innerText = cart.itemCount;
}

function deleteItems(button) {
  let itemIndex = Array.from(itemBox.children).indexOf(button.parentNode);
  cart.items.splice(itemIndex, 1);
  cart.itemCount = Number(cart.itemCount) - 1; // Ensure itemCount is a number
  saveCartToLocalStorage();
  displayCart();
}

// Products page

let shoes = [
  {
    name: "Ease Walk Grey",
    img: "https://neemans.com/cdn/shop/files/ND-EWLaceUp-Grey-_WebOptimized_c_500x500.jpg?v=1703068457",
    launch: "Best Selling",
    price: 1889,
    maxPrice: 4199,
  },
  {
    name: "Ease Walk Grey",
    img: "https://neemans.com/cdn/shop/files/ND-EWLaceUp-Black-_WebOptimized_e_500x500.jpg?v=1703068457",
    launch: "Newly Launched",
    price: 1889,
    maxPrice: 4199,
  },
  {
    name: "Ease Walk Grey",
    img: "https://neemans.com/cdn/shop/files/ND-EWLaceUp-White-_WebOptimized_c_500x500.jpg?v=1703068457",
    launch: "Best Selling",
    price: 1889,
    maxPrice: 4199,
  },
  {
    name: "Ease Walk Grey",
    img: "https://neemans.com/cdn/shop/files/ND-EWLaceUp-Blue-_WebOptimized_c_500x500.jpg?v=1703068457",
    launch: "Best Selling",
    price: 1889,
    maxPrice: 4199,
  },
  {
    name: "Ease Walk Slip Ons",
    img: "https://neemans.com/cdn/shop/files/ND-EWSlipOn-Black-_WebOptimized_c_500x500.jpg?v=1699363047",
    launch: "Newly Launched",
    price: 1889,
    maxPrice: 4199,
  },
  {
    name: "Ease Walk Slip Ons",
    img: "https://neemans.com/cdn/shop/files/ND-EWLaceUp-Grey-_WebOptimized_c_500x500.jpg?v=1703068457",
    launch: "Best Selling",
    price: 1889,
    maxPrice: 4199,
  },
  {
    name: "Ease Walk Slip Ons",
    img: "https://neemans.com/cdn/shop/files/ND-EWLaceUp-Blue-_WebOptimized_c_500x500.jpg?v=1703068457",
    launch: "Newly Launched",
    price: 1889,
    maxPrice: 4199,
  },
  {
    name: "ReLive Knit Sneakers",
    img: "https://neemans.com/cdn/shop/files/ND-RLSneakers-HaleBlackwithRedSole-_WebOptimized_d_500x500.jpg?v=1702516659",
    launch: "Newly Launched",
    price: 1849,
    maxPrice: 3699,
  },
  {
    name: "ReLive Knit Sneakers",
    img: "https://neemans.com/cdn/shop/files/ND-RLSneakers-HaleBlack-_WebOptimized_d_500x500.jpg?v=1702516659",
    launch: "Best Selling",
    price: 1849,
    maxPrice: 3699,
  },
  {
    name: "ReLive Knit Sneakers",
    img: "https://neemans.com/cdn/shop/files/ND-RLSneakers-GreyMelange-_WebOptimized_d_500x500.jpg?v=1702516659",
    launch: "Newly Launched",
    price: 1849,
    maxPrice: 3699,
  },
  {
    name: "Sole Max Casuals",
    img: "https://neemans.com/cdn/shop/products/ND-SoleMaxCasuals-UltraBlack-_WebOptimized_f_500x500.jpg?v=1693338751",
    launch: "Newly Launched",
    price: 1020,
    maxPrice: 2999,
  },
  {
    name: "Sole Max Casuals",
    img: "https://neemans.com/cdn/shop/products/ND-SoleMaxCasuals-UltraGrey-_WebOptimized_f_500x500.jpg?v=1693338751",
    launch: "Best Selling",
    price: 1020,
    maxPrice: 2999,
  },
  {
    name: "Sole Max Casuals",
    img: "https://neemans.com/cdn/shop/products/ND-SoleMaxCasuals-UltraSnow-_WebOptimized_f_500x500.jpg?v=1693338751",
    launch: "Newly Launched",
    price: 1020,
    maxPrice: 2999,
  },
  {
    name: "Light Walkers",
    img: "https://neemans.com/cdn/shop/files/ND-LightWalkers-ClassicWhite-_WebOptimized_a_500x500.jpg?v=1712122540",
    launch: "Newly Launched",
    price: 1499,
    maxPrice: 3249,
  },
  {
    name: "Light Walkers",
    img: "https://neemans.com/cdn/shop/files/ND-LightWalkers-NewGrey-_WebOptimized_a_500x500.jpg?v=1712122540",
    launch: "Newly Launched",
    price: 1499,
    maxPrice: 3249,
  },
  {
    name: "Light Walkers",
    img: "https://neemans.com/cdn/shop/products/ND-LightWalkers-ClassicBlack-_WebOptimized_a_500x500.jpg?v=1712122540",
    launch: "Newly Launched",
    price: 1499,
    maxPrice: 3249,
  },
];
let slippers = [
  {
    name: "Cork : Brilliant White",
    img: "https://neemans.com/cdn/shop/files/ND-CorkSandals-BrilliantWhite-_WebOptimized_d_800x.jpg?v=1724987624",
    launch: "Best Selling",
    price: 699,
    maxPrice: 1499,
  },
  {
    name: "Cork : Classic Tan",
    img: "https://neemans.com/cdn/shop/files/ND-CorkSandals-ClassicTan-_WebOptimized_d_800x.jpg?v=1724987620",
    launch: "Newly Launched",
    price: 699,
    maxPrice: 1499,
  },
  {
    name: "Cork : Rich Cream",
    img: "https://neemans.com/cdn/shop/files/ND-CorkSandals-RichCream-_WebOptimized_d_800x.jpg?v=1724987628",
    launch: "Best Selling",
    price: 699,
    maxPrice: 1499,
  },
  {
    name: "Striped Fusion Flips",
    img: "https://neemans.com/cdn/shop/files/ND-CorkSandals-SolidBlack-_WebOptimized_d_800x.jpg?v=1724987629",
    launch: "Cork : Solid Black",
    price: 699,
    maxPrice: 1499,
  },
  {
    name: "Eco Slides",
    img: "https://neemans.com/cdn/shop/files/ND-EcoSlides-BeigeBG-CoalBlack_WebOptimized_a_500x500.jpg?v=1685613036",
    launch: "Newly Launched",
    price: 699,
    maxPrice: 1399,
  },
  {
    name: "Eco Slides",
    img: "https://neemans.com/cdn/shop/files/ND-EcoSlides-BeigeBG-OliveGreen_WebOptimized_a_500x500.jpg?v=1691044516",
    launch: "Best Selling",
    price: 699,
    maxPrice: 1399,
  },
  {
    name: "Eco Slides",
    img: "https://neemans.com/cdn/shop/files/ND-EcoSlides-BeigeBG-PebbleGrey_WebOptimized_a_500x500.jpg?v=1691044516",
    launch: "Newly Launched",
    price: 699,
    maxPrice: 1399,
  },
  {
    name: "Eco Slides",
    img: "https://neemans.com/cdn/shop/files/ND-EcoSlides-BeigeBG-CoralRed_WebOptimized_a_500x500.jpg?v=1691044591",
    launch: "Newly Launched",
    price: 699,
    maxPrice: 1399,
  },
  {
    name: "Eco Slides",
    img: "https://neemans.com/cdn/shop/files/ND-EcoSlides-BeigeBG-ClassicBlue_WebOptimized_a_500x500.jpg?v=1691044564",
    launch: "Best Selling",
    price: 699,
    maxPrice: 1399,
  },
  {
    name: "Classic Slippers",
    img: "https://neemans.com/cdn/shop/products/ND-ClassicSlippers-CoalBlack-_WebOptimized_a_500x500.jpg?v=1690982276",
    launch: "Best Selling",
    price: 379,
    maxPrice: 699,
  },
  {
    name: "Classic Slippers",
    img: "https://neemans.com/cdn/shop/products/ND-ClassicSlippers-CreamBrown-_WebOptimized_a_500x500.jpg?v=1690982308",
    launch: "Newly Launched",
    price: 379,
    maxPrice: 699,
  },
  {
    name: "Classic Slippers",
    img: "https://neemans.com/cdn/shop/products/ND-ClassicSlippers-CoalBlack-_WebOptimized_a_500x500.jpg?v=1690982276",
    launch: "Best Selling",
    price: 379,
    maxPrice: 699,
  },
  {
    name: "Classic Slippers",
    img: "https://neemans.com/cdn/shop/products/ND-ClassicSlippers-AshBlack-_WebOptimized_a_500x500.jpg?v=1685554663",
    launch: "Best Selling",
    price: 379,
    maxPrice: 699,
  },
  {
    name: "Classic Slippers",
    img: "https://neemans.com/cdn/shop/products/ND-ClassicSlippers-BasaltBrown-_WebOptimized_a_500x500.jpg?v=1690982205",
    launch: "Newly Launched",
    price: 379,
    maxPrice: 699,
  },
  {
    name: "Classic Slippers",
    img: "https://neemans.com/cdn/shop/products/ND-ClassicSlippers-OliveGreen-_WebOptimized_a_500x500.jpg?v=1690982308",
    launch: "Best Selling",
    price: 379,
    maxPrice: 699,
  },
  {
    name: "Eco Flips : black",
    img: "https://neemans.com/cdn/shop/files/ND-EcoFlips-BeigeBG-CoalBlack_WebOptimized_a_dfeeb310-f494-47d5-bdf8-7158247bfc73_800x.jpg?v=1724988475",
    launch: "Best Selling",
    price: 899,
    maxPrice: 1799,
  },
  {
    name: "Eco Flips : Olive",
    img: "https://neemans.com/cdn/shop/files/ND-EcoFlips-BeigeBG-LeafyOliveGreen_WebOptimized_a_9b361e50-9f9a-4ce7-b231-c83f3db5a91f_800x.jpg?v=1724988476",
    launch: "Newly Launched",
    price: 899,
    maxPrice: 1799,
  },
  {
    name: "Eco Flips : Brown",
    img: "https://neemans.com/cdn/shop/files/ND-EcoFlips-BeigeBG-SoilBrown_WebOptimized_a_f746b077-8beb-40d2-807c-0667c27ad03f_800x.jpg?v=1724988484",
    launch: "Best Selling",
    price: 899,
    maxPrice: 1799,
  },
  {
    name: "Eco Flips : Purple",
    img: "https://neemans.com/cdn/shop/files/ND-EcoFlips-BeigeBG-PurplePlum_WebOptimized_a_ca160565-e9dd-4ae4-9adf-cef79c57d737_800x.jpg?v=1724988484",
    launch: "Newly Launched",
    price: 899,
    maxPrice: 1799,
  },
];

let productPage = document.querySelector(".productPage");
let navProducts = document.querySelectorAll(".navProducts");

navProducts.forEach((elem) => {
  elem.addEventListener("click", function (e) {
    let data = e.target.innerText.toLowerCase().trim();
    localStorage.setItem("currentPage", data);
  });
});

if (
  fileName == "products.html" &&
  localStorage.getItem("currentPage") == "shoes"
) {
  document.querySelectorAll(".product-name-productPage").forEach((elem) => {
    elem.innerHTML = "Shoes";
  });
  document.querySelector(".shoesActive").classList.add("bg-slate-800");
  document.querySelector(".slipperActive").classList.remove("bg-slate-800");
  productData = shoes;
  document.querySelector(".product-hero-img").src =
    "./images/shoes-banner.jpg";
}

if (
  fileName == "products.html" &&
  localStorage.getItem("currentPage") == "slippers"
) {
  document.querySelectorAll(".product-name-productPage").forEach((elem) => {
    elem.innerHTML = "Slippers";
  });
  document.querySelector(".slipperActive").classList.add("bg-slate-800");
  document.querySelector(".shoesActive").classList.remove("bg-slate-800");
  productData = slippers;
  document.querySelector(".product-hero-img").src =
    "./images/slipper-banner.png";
}

function loadPage(e) {
  productPage.innerHTML = "";
  for (let i = 0; i < e.length; i++) {
    let productItem = `<div
      class="product-card border border-slate-700 rounded-md overflow-hidden cursor-pointer bg-white relative"
    >
    <div class="${
      e[i].launch === "Best Selling"
        ? "new-launch"
        : "bg-red-500 text-white text-[0.8rem] tracking-wider rounded-[5px]"
    } absolute right-2 top-1 z-10">
    <p class="p-1">${e[i].launch}</p>
    </div>
      <div class="overflow-hidden border-b-[1px] border-slate-700">
        <img
          src="${e[i].img}"
          alt=""
          class="hover:scale-110"
        />
      </div>
      <div
        class="product-description flex justify-between px-4 items-center py-4"
      >
        <div class="product-name flex flex-col gap-2">
          <h4 class="text-xl font-bold capitalize">${e[i].name}</h4>
          <p class="flex gap-4">
            Rs.${e[i].price}
            <strike class="text-gray-400 tracking-wide">Rs.${
              e[i].maxPrice
            }</strike>
          </p>
        </div>
        <div class="product-add-to-cart">
          <i
            class="fa-solid fa-cart-shopping p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white"
          ></i>
        </div>
      </div>
    </div>`;

    productPage.innerHTML += productItem;
  }
}

if (fileName == "products.html") {
  loadPage(productData);
}

document.querySelectorAll(".selectFilter").forEach((elem) => {
  elem.addEventListener("click", function (e) {
    if (e.target.value === "all") {
      loadPage(productData);
    }
    if (e.target.value === "lowPrice") {
      let a = productData.sort((a, b) => a.price - b.price);
      loadPage(a);
    }
    if (e.target.value === "highPrice") {
      let a = productData.sort((a, b) => b.price - a.price);
      loadPage(a);
    }
    if (e.target.value === "newestFirst") {
      let a = null;
      a = productData.filter(function (e) {
        return e.launch === "Newly Launched";
      });
      loadPage(a);
    }
    if (e.target.value === "bestSelling") {
      let a = null;
      a = productData.filter(function (e) {
        return e.launch === "Best Selling";
      });
      loadPage(a);
    }
  });
});

// Searching Filter

let products = [...shoes, ...slippers];

function searchItems() {
  let input = document.querySelector("header input");

  input.addEventListener("input", function () {
    let clutter = "";
    let filteredArray = products.filter((obj) =>
      obj.name.toLowerCase().startsWith(input.value)
    );
    filteredArray.forEach(function (obj) {
      clutter += `
          <div class="searchedItems flex items-center gap-6 py-4">
          <i class="fa-solid fa-magnifying-glass text-xl text-slate-800"></i>
          <img src="${obj.img}" alt="" class="w-20">
          <p class="name text-lg tracking-wide font-semibold">${obj.name}</p>
        </div>
          `;
    });
    document.querySelector(".searchedItemsMainDiv").innerHTML = clutter;

    if (document.querySelectorAll(".searchedItems").length > 0) {
      document
        .querySelector(".searchedItemsMainDiv")
        .classList.remove("hidden");
    } else {
      document.querySelector(".searchedItemsMainDiv").classList.add("hidden");
    }
  });
}
searchItems();

// Show product page

let buy = JSON.parse(localStorage.getItem("buy")) || { items: [] };
const productCard = document.querySelectorAll(".product-card");
let showItems = document.querySelector("#showItems");

productCard.forEach((elem) => {
  elem.addEventListener("click", function (e) {
    document.querySelector(".product-details").classList.remove("hidden");
    document.querySelector(".address").classList.add("hidden");
    if (e.target.tagName != "I") {
      const productImage =
        e.currentTarget.firstElementChild.nextElementSibling.firstElementChild
          .src;
      const productName =
        e.currentTarget.firstElementChild.nextElementSibling.nextElementSibling
          .firstElementChild.firstElementChild.innerText;
      const productPrice =
        e.currentTarget.firstElementChild.nextElementSibling.nextElementSibling
          .firstElementChild.firstElementChild.nextElementSibling.innerHTML;

      if (showItems.classList.contains("hidden")) {
        showItems.classList.remove("hidden");
        pageShadow.classList.add("brightness-50");
        document.querySelector(".product-img").src = productImage;
        document.querySelector(".product-name").innerText = productName;
        document.querySelector("#product-price").innerHTML = productPrice;
      }
    }
  });
});

if (
  fileName != "brand.html" &&
  fileName != "help.html" &&
  fileName != "my-order.html"
) {
  document
    .querySelector(".product-page-close")
    .addEventListener("click", function () {
      showItems.classList.add("hidden");
      pageShadow.classList.remove("brightness-50");
    });

  function addressPage() {
    let openAddressPage = document.querySelector(".address-page");
    openAddressPage.addEventListener("click", function () {
      document.querySelector(".product-details").classList.add("hidden");
      document.querySelector(".address").classList.remove("hidden");
    });
  }
  addressPage();
}

function buyProdcuts() {
  let buyProduct = document.querySelectorAll(".buyProduct");

  buyProduct.forEach((elem) => {
    elem.addEventListener("click", function (e) {
      let img =
        e.target.parentNode.parentNode.parentNode.parentNode.firstElementChild
          .nextElementSibling.firstElementChild.firstElementChild
          .firstElementChild.src;
      let name =
        e.target.parentNode.parentNode.parentNode.parentNode.firstElementChild
          .nextElementSibling.firstElementChild.lastElementChild
          .firstElementChild.innerText;
      let price =
        e.target.parentNode.parentNode.parentNode.parentNode.firstElementChild
          .nextElementSibling.firstElementChild.lastElementChild
          .firstElementChild.nextElementSibling.innerHTML;
      var inputElements = document.querySelectorAll(
        ".customer-name, .customer-mob, .customer-address, .customer-pin"
      );

      var inputValues = [];

      inputElements.forEach(function (inputElement) {
        inputValues.push(inputElement.value);
      });

      let item = {
        img: img,
        name: name,
        price: price,
        customerName: inputValues[0],
        customerMob: inputValues[1],
        customerAddress: inputValues[2],
        customerPin: inputValues[3],
        day: Math.floor(Math.random() * (32 - day)) + day,
      };
      document.querySelector(".itemCountBox").classList.add("hidden");
      document.querySelector(".addedMessage").innerText =
        "Item Ordered Successfully.";
      notificationCartItems();

      buy.items.push(item);
      saveBuyToLocalStorage();
      showItems.classList.add("hidden");
      pageShadow.classList.remove("brightness-50");
    });
  });
}
buyProdcuts();

function saveBuyToLocalStorage() {
  localStorage.setItem("buy", JSON.stringify(buy));
}

function buyItems() {
  let buyItems = document.querySelector(".buyItems");
  if (fileName == "my-order.html") {
    buyItems.innerHTML = "";
    buy.items.forEach((elem) => {
      let itemHTML = `
      <div class="lg:w-[48rem] w-full flex flex-col md:flex-row justify-evenly lg:items-center lg:gap-8 gap-6 py-5 bg-slate-100 mx-4 px-5 rounded-md">
            <img src=${elem.img} alt="" class="md:w-64 w-full rounded-md">
                <div class="product-name flex md:flex-col flex-row items-start justify-between lg:gap-2 lg:w-[40%]">
                    <div>
                    <h4 class="lg:text-lg font-bold capitalize">${elem.name}</h4>
                    <p class="flex gap-4">
                      ${elem.price}
                    </p>
                    <p class="text-green-600 font-semibold">Arriving ${elem.day} ${name}</p>
                    </div>
                    <button class="px-4 py-2 bg-slate-900 text-white rounded-md lg:mt-3 lg:font-semibold tracking-wider hover:bg-slate-700" onclick="cancelItem(this)">Order Cancel</button>
                  </div>
                  <div class="lg:w-[45%]">
                  <h2 class="font-bold text-xl pb-3">Address</h2>
                  <p class="font-bold">Name : <span class="font-semibold text-[#5b5b5b]">${elem.customerName}</span></p>
                  <p class="font-bold">Mobile No : <span class="font-semibold text-[#5b5b5b]">${elem.customerMob}</span></p>
                  <p class="font-bold">Address : <span class="font-semibold text-[#5b5b5b]">${elem.customerAddress}</span></p>
                  <p class="font-bold">Pin Code : <span class="font-semibold text-[#5b5b5b]">${elem.customerPin}</span></p>
                </div>

        </div>
      `;
      buyItems.innerHTML += itemHTML;
    });
  }
}

function cancelItem(button) {
  let parentElement = button.closest(".buyItems"); // Find the closest ancestor with the class 'buyItems'
  let buyItemIndex = Array.from(parentElement.children).indexOf(
    button.parentNode.parentNode
  );
  buy.items.splice(buyItemIndex, 1);
  saveBuyToLocalStorage();
  buyItems();
  isBuyPageEmptyOrNot();
  document.querySelector(".addedMessage").innerText =
    "Ordered Cancelled Successfully.";
  notificationCartItems();
}

buyItems();

function isBuyPageEmptyOrNot() {
  if (fileName == "my-order.html") {
    if (buy.items.length > 0) {
      document.querySelector(".buyItemIsEmpty").classList.add("hidden");
      document.querySelector(".buyItems").classList.remove("hidden");
    } else {
      document.querySelector(".buyItemIsEmpty").classList.remove("hidden");
      document.querySelector(".buyItems").classList.add("hidden");
    }
  }
}
isBuyPageEmptyOrNot();

function helpAndSupports() {
  let expendQuestion = document.querySelectorAll(".faq-div");
  expendQuestion.forEach((elem) => {
    elem.addEventListener("click", function (e) {
      if (e.currentTarget.lastElementChild.classList.contains("hidden")) {
        e.currentTarget.firstElementChild.lastElementChild.classList.remove(
          "fa-plus"
        );
        e.currentTarget.firstElementChild.lastElementChild.classList.add(
          "fa-minus"
        );
        e.currentTarget.lastElementChild.classList.remove("hidden");
        e.currentTarget.lastElementChild.classList.remove("h-[0vh]");
      } else {
        e.currentTarget.firstElementChild.lastElementChild.classList.add(
          "fa-plus"
        );
        e.currentTarget.firstElementChild.lastElementChild.classList.remove(
          "fa-minus"
        );
        e.currentTarget.lastElementChild.classList.add("hidden");
        e.currentTarget.lastElementChild.classList.add("h-[0vh]");
      }
    });
  });
}
helpAndSupports();

// brands page code

if (fileName == "brand.html") {
  function brands() {
    document.querySelector(".brands-hero").src =
        "./images/brands-page-banner.jpg";

    // for recycle div

    let plasticNumber = localStorage.getItem("plasticNumber");
    let tyreNumber = localStorage.getItem("tyreNumber");
    let plasticBagNumber = localStorage.getItem("plasticBagNumber");

    document.querySelector(".plastic-number").innerText = plasticNumber;
    document.querySelector(".tyre-number").innerText = tyreNumber;
    document.querySelector(".plastic-bag-number").innerText = plasticBagNumber;

    if (!plasticNumber) {
      plasticNumber = 23412;
    } else {
      plasticNumber = parseInt(plasticNumber);
    }
    const increasePlasticNumber = () => {
      plasticNumber++;
      localStorage.setItem("plasticNumber", plasticNumber);
      document.querySelector(".plastic-number").innerText = plasticNumber;
    };
    setInterval(increasePlasticNumber, 10000);

    if (!tyreNumber) {
      tyreNumber = 3453;
    } else {
      tyreNumber = parseInt(tyreNumber);
    }
    const increasetyreNumber = () => {
      tyreNumber++;
      localStorage.setItem("tyreNumber", tyreNumber);
      document.querySelector(".tyre-number").innerText = tyreNumber;
    };
    setInterval(increasetyreNumber, 15000);

    if (!plasticBagNumber) {
      plasticBagNumber = 34523;
    } else {
      plasticBagNumber = parseInt(plasticBagNumber);
    }
    const increasePlasticBagNumber = () => {
      plasticBagNumber++;
      localStorage.setItem("plasticBagNumber", plasticBagNumber);
      document.querySelector(".plastic-bag-number").innerText =
        plasticBagNumber;
    };
    setInterval(increasePlasticBagNumber, 8000);
  }
  brands();
}

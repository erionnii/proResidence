
let getSignIn = document.getElementById("signInButtonHeader");
let isExist = false;
let getProfile = document.getElementById("profileButtonHeader");
let getProfilePhoto = document.getElementById("profileImageHeader");
let getSmallSignIn = document.getElementById("signInButtonSmall");
let getMainName = document.getElementById("mainName");
let getMainNumber = document.getElementById("mainNumber");
let getMainEmail = document.getElementById("mainEmail");
let getProfilePhoto1 = document.getElementById("profilePhoto");

let userId;
redirect();
signInProfileDisplay();
let noResults = document.getElementById("noResultContainer");
function redirect() {
  let isExist = false;
  getItemsFromStorage2().forEach((user) => {
    if (user.hasOwnProperty("actualId")) {
      if (user.actualId < 0) {
        signInLocation();
      }
      isExist = true;
    }
  });
  if (isExist == false) {
    signInLocation();
  }
}
function signInLocation() {
  window.location.replace("../log-in/sign-in.html");
}
function getItemsFromStorage2(user) {
  let addItemsArray;
  if (localStorage.getItem("user") == null) {
    addItemsArray = [];
  } else {
    addItemsArray = JSON.parse(localStorage.getItem("user"));
  }
  return addItemsArray;
}
function getItemsFromStorage(property) {
  let addItemsArray;
  if (localStorage.getItem("property") == null) {
    addItemsArray = [];
  } else {
    addItemsArray = JSON.parse(localStorage.getItem("property"));
  }
  return addItemsArray;
}
function getItemsFromStorage3(wishlist) {
  let addItemsArray;
  if (localStorage.getItem("wishlist") == null) {
    addItemsArray = [];
  } else {
    addItemsArray = JSON.parse(localStorage.getItem("wishlist"));
  }
  return addItemsArray;
}

//qitu punon

let getContainer = document.getElementById("wishlistContent");
getContainer.addEventListener("click", clicked);
let wishCount = document.getElementById("wishCount");
let postId;
function clicked(e) {
  let mainCard;
  let inputCheck;
  let arrayWish = [];
  let getWishlist = getItemsFromStorage3();

  if (e.target.parentElement.className == "right-part") {
    mainCard = undefined;
    inputCheck = e.target.parentElement.getElementsByTagName("input")[0];
    postId = inputCheck.id.slice(29 - inputCheck.id.length);
    console.log(postId);

    getWishlist.forEach((wish) => {
      getItemsFromStorage2().forEach((user) => {
        if (user.hasOwnProperty("actualId")) {
          if (wish.wishUser == user.actualId) {
            arrayWish = wish.wishlistArray;
          }
        }
      });
    });

    if (inputCheck.checked) {
      arrayWish.push(postId);
    } else {
      arrayWish.splice(arrayWish.indexOf(postId), 1);
    }
    getWishlist.forEach((wish) => {
      getItemsFromStorage2().forEach((user) => {
        if (user.hasOwnProperty("actualId")) {
          if (wish.wishUser == user.actualId) {
            wish.wishlistArray = arrayWish;
          }
        }
      });
    });
    console.log(getWishlist);
    localStorage.setItem("wishlist", JSON.stringify(getWishlist));
  } else if (e.target.className == "fourth-part-home-card wishlist-card") {
    mainCard = e.target;
  } else if (
    e.target.parentElement.className == "fourth-part-home-card wishlist-card"
  ) {
    mainCard = e.target.parentElement;
  } else if (
    e.target.parentElement.parentElement.className ==
    "fourth-part-home-card wishlist-card"
  ) {
    mainCard = e.target.parentElement.parentElement;
  } else if (
    e.target.parentElement.parentElement.parentElement.className ==
    "fourth-part-home-card wishlist-card"
  ) {
    mainCard = e.target.parentElement.parentElement.parentElement;
  } else if (
    e.target.parentElement.parentElement.parentElement.parentElement
      .className == "fourth-part-home-card wishlist-card"
  ) {
    mainCard = e.target.parentElement.parentElement.parentElement.parentElement;
  }
  console.log(mainCard);
  if (mainCard !== undefined) {
    let isExist = false;
    let arrayLc = getItemsFromStorage2();
    arrayLc.forEach((checks) => {
      if (checks.hasOwnProperty("clickedPropertyId")) {
        isExist = true;
        checks.clickedPropertyId = mainCard.id.slice(4 - mainCard.id.length);
        localStorage.setItem("user", JSON.stringify(arrayLc));
      }
    });
    if (isExist == false) {
      let objectProperty = {
        clickedPropertyId: mainCard.id.slice(4 - mainCard.id.length),
      };
      addItemsToStorage(objectProperty);
    }
    locationn();
  }
}
function locationn() {
  window.location.replace("../properties-catalog/single-product-file.html");
}

function displayItems(
  title,
  location,
  currency,
  price,
  bed,
  bath,
  car,
  image,
  id
) {
  let inputId = "first-like-row-single-product" + id;
  let card = document.createElement("div");
  card.setAttribute("class", "fourth-part-home-card wishlist-card");
  card.setAttribute("id", "card" + id);
  getContainer.appendChild(card);

  let topPart = document.createElement("div");
  topPart.setAttribute(
    "class",
    "top-part-card-fourth-part-home top-part-card-wishlist"
  );
  card.appendChild(topPart);

  let imageSrc = image[0];
  let cardImage = document.createElement("img");
  topPart.appendChild(cardImage);
  cardImage.setAttribute("class", "card-image-fourth-part-home");
  cardImage.setAttribute("src", imageSrc);

  let elements = document.createElement("div");
  elements.setAttribute(
    "class",
    "elements-in-card-image-fourth-part-home elements-in-card-image-wishlist"
  );
  topPart.appendChild(elements);

  let part = document.createElement("div");
  part.setAttribute("class", "left-part");
  elements.appendChild(part);

  let rightPart = document.createElement("div");
  rightPart.setAttribute("class", "right-part");
  elements.appendChild(rightPart);

  let mainLike = document.createElement("label");
  mainLike.setAttribute("for", inputId);
  mainLike.setAttribute("class", "main-like");

  let faHeart = document.createElement("i");
  faHeart.setAttribute("class", "fa-regular fa-heart");
  mainLike.appendChild(faHeart);

  console.log(inputId);

  let check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.setAttribute("id", inputId);
  check.setAttribute("class", "checkbox-like");
  check.checked = true;

  let secondLike = document.createElement("label");
  secondLike.setAttribute("for", inputId);
  secondLike.setAttribute("class", "heart");

  let faHeart2 = document.createElement("i");
  faHeart2.setAttribute("class", "fa-solid fa-heart");
  secondLike.appendChild(faHeart2);

  rightPart.appendChild(mainLike);
  rightPart.appendChild(check);
  rightPart.appendChild(secondLike);

  //deri qitu

  let partHome = document.createElement("div");
  partHome.setAttribute(
    "class",
    "bottom-part-card-fourth-part-home bottom-part-card-wishlist"
  );
  card.appendChild(partHome);

  let textPart = document.createElement("div");
  textPart.setAttribute("class", "text-part-card-fourth-part-home");
  partHome.appendChild(textPart);

  //permirso
  let firstBottom = document.createElement("h3");
  let secondBottom = document.createElement("h1");
  secondBottom.textContent = title;
  let thirdBottom = document.createElement("p");
  thirdBottom.textContent = location;
  let fourthBottom = document.createElement("i");
  fourthBottom.setAttribute("class", "fa-sharp fa-solid fa-money-check-dollar");
  let fifthBottom = document.createElement("span");
  fifthBottom.textContent = currency + price;

  textPart.appendChild(firstBottom);
  textPart.appendChild(secondBottom);
  textPart.appendChild(thirdBottom);
  textPart.appendChild(fourthBottom);
  textPart.appendChild(fifthBottom);

  let icons = document.createElement("div");
  icons.setAttribute("class", "icons-part-card-fourth-part-home");
  partHome.appendChild(icons);

  let iconsGroup = document.createElement("div");
  iconsGroup.setAttribute("class", "icon-group");
  icons.appendChild(iconsGroup);
  let firstSpan = document.createElement("span");
  firstSpan.textContent = " " + bath;
  let firstIcon = document.createElement("i");
  firstIcon.setAttribute("class", "fa-solid fa-bed");
  iconsGroup.appendChild(firstSpan);
  iconsGroup.appendChild(firstIcon);

  let iconsGroup2 = document.createElement("div");
  iconsGroup2.setAttribute("class", "icon-group");
  icons.appendChild(iconsGroup2);
  let secondSpan = document.createElement("span");
  secondSpan.textContent = " " + bed;
  let secondIcon = document.createElement("i");
  secondIcon.setAttribute("class", "fa-solid fa-bath");
  iconsGroup2.appendChild(secondSpan);
  iconsGroup2.appendChild(secondIcon);

  let iconsGroup3 = document.createElement("div");
  iconsGroup3.setAttribute("class", "icon-group");
  icons.appendChild(iconsGroup3);
  let thirdSpan = document.createElement("span");
  thirdSpan.textContent = " " + car;
  let thirdIcon = document.createElement("i");
  thirdIcon.setAttribute("class", "fa-solid fa-car");
  iconsGroup3.appendChild(thirdSpan);
  iconsGroup3.appendChild(thirdIcon);
  //permirso
}

getItemsFromStorage3().forEach((wishlist) => {
  getItemsFromStorage2().forEach((user) => {
    if (user.hasOwnProperty("actualId")) {
      if (wishlist.wishUser == user.actualId) {
        wishCount.textContent = wishlist.wishlistArray.length;
        if (wishlist.wishlistArray.length == 0) {
          wishCount.textContent = 0;
        }
        getItemsFromStorage().forEach((property) => {
          wishlist.wishlistArray.forEach((wishId) => {
            if (wishId == property.id) {
              noResults.style.display = "none";
              console.log(property);
              displayItems(
                property.title + " | " + property.area + " sq.m",
                property.streetAddress,
                property.currency,
                property.enterPrice,
                property.bedroom,
                property.bathroom,
                property.parking,
                property.image,
                property.id
              );
            }
          });
        });
      }
    }
  });
});


getItemsFromStorage2().forEach((user) => {
  if (user.hasOwnProperty("actualId")) {
    userId = user.actualId;
  }
});
getItemsFromStorage2().forEach((user) => {
  if (user.id == userId) {
    getMainName.textContent = user.name;
    getMainName.style.textTransform = "capitalize";
    getProfilePhoto1.src = user.img;
    getMainEmail.textContent = user.email;
    getMainNumber.lastChild.textContent = user.phone;
  }
});

let clearAll = document.getElementById("clearAll");

function deleteAll() {
  console.log("hej");
  let arrayWish = getItemsFromStorage3();
  getItemsFromStorage2().forEach((user) => {
    if (user.hasOwnProperty("actualId")) {
      arrayWish.forEach((wish) => {
        if (wish.wishUser == user.actualId) {
          console.log(wish);
          wish.wishlistArray = [];
        }
      });
    }
  });
  wishCount.textContent = 0;
  deleteOldItems();
  noResults.style.display = "flex";
  localStorage.setItem("wishlist", JSON.stringify(arrayWish));
}
clearAll.addEventListener("click", deleteAll);

function deleteOldItems() {
  let array = getContainer.getElementsByClassName(
    "fourth-part-home-card wishlist-card"
  );
  Array.from(array).forEach((object) => {
    object.remove();
  });
}

//deri qitu
function addItemsToStorage(user) {
  let addItemsArray;
  if (localStorage.getItem("user") == null) {
    addItemsArray = [];
  } else {
    addItemsArray = JSON.parse(localStorage.getItem("user"));
  }
  addItemsArray.push(user);
  localStorage.setItem("user", JSON.stringify(addItemsArray));
  return addItemsArray;
}

function signInProfileDisplay() {
  let setName = document.getElementById("userName");
  let userLoged;
  if (getItemsFromStorage2().length > 0) {
    getItemsFromStorage2().forEach((object) => {
      if (object.hasOwnProperty("actualId")) {
        isExist = true;
        if (object.actualId >= 0) {
          getSignIn.style.display = "none";
          getSmallSignIn.style.display = "none";
          userLoged = object.actualId;
          getItemsFromStorage2().forEach((user) => {
            if (user.id == userLoged) {
              let namee = user.name;
              getProfilePhoto.src = user.img;

              setName.textContent = namee.split(" ")[0];
            }
          });
        } else {
          getProfile.style.display = "none";
          deactivateLinks();
        }
      }
    });
  }
  if (isExist == false) {
    getProfile.style.display = "none";
    deactivateLinks();
  }
}

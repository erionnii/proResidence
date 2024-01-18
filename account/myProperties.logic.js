let getSignIn = document.getElementById("signInButtonHeader");
let isExist = false;
let getProfile = document.getElementById("profileButtonHeader");
let getProfilePhoto = document.getElementById("profileImageHeader");
let getSmallSignIn = document.getElementById("signInButtonSmall");

let getMainName = document.getElementById("mainName");
let getMainNumber = document.getElementById("mainNumber");
let getMainEmail = document.getElementById("mainEmail");
let getProfilePhoto1 = document.getElementById("profilePhoto");

let noResults = document.getElementById("noResultContainer");
redirect();
signInProfileDisplay();
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



let userId;
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

let clearAll = document.getElementById("clearAllProperties");
function deleteAll() {
  console.log();
  let myPropArr = [];
  console.log(getItemsFromStorage());
  let actual;
  getItemsFromStorage2().forEach((user) => {
    if (user.hasOwnProperty("actualId")) {
      actual = user.actualId;
    }
  });
  getItemsFromStorage().forEach((prop) => {
    if (prop.adminId == actual) {
      myPropArr.push(prop.id);
    }
  });
  let wishLc = getItemsFromStorage3();
  wishLc.forEach((wishlist) => {
    wishlist.wishlistArray.forEach((wishId) => {
      myPropArr.forEach((propId) => {
        if (wishId == propId) {
          wishlist.wishlistArray.splice(
            wishlist.wishlistArray.indexOf(wishId),
            1
          );
          localStorage.setItem("wishlist", JSON.stringify(wishLc));
        }
      });
    });
  });

  let userLc = getItemsFromStorage2();
  userLc.forEach((user) => {
    if (user.hasOwnProperty("clickedPropertyId")) {
      myPropArr.forEach((propId) => {
        if (user.clickedPropertyId == propId) {
          user.clickedPropertyId = "";
          localStorage.setItem("user", JSON.stringify(userLc));
        }
      });
    }
  });

  let arrLs = getItemsFromStorage().filter(
    (property) => property.adminId !== actual
  );
  console.log(arrLs);
  getNumber.textContent = 0;
  localStorage.setItem("property", JSON.stringify(arrLs));
  deleteOldItems();
  noResults.style.display = "flex";
}

let getContainer = document.getElementById("container");

let getNumber = document.getElementById("numberOfElements");

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
  let card = document.createElement("a");
  card.setAttribute("id", "card" + id);
  card.setAttribute("class", "fourth-part-home-card wishlist-card");
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

  // let mainLike = document.createElement("label")
  // mainLike.setAttribute("for", inputId)
  // mainLike.setAttribute("class", "main-like")

  // let faHeart = document.createElement("i")
  // faHeart.setAttribute("class", "fa-regular fa-heart")
  // mainLike.appendChild(faHeart)

  // console.log(inputId);

  // let check = document.createElement("input")
  // check.setAttribute("type", "checkbox")
  // check.setAttribute("id", inputId)
  // check.setAttribute("class", "checkbox-like")
  // check.checked = true

  // let secondLike = document.createElement("label")
  // secondLike.setAttribute("for", inputId)
  // secondLike.setAttribute("class", "heart")

  // let faHeart2 = document.createElement("i")
  // faHeart2.setAttribute("class", "fa-solid fa-heart")
  // secondLike.appendChild(faHeart2)

  // rightPart.appendChild(mainLike)
  // rightPart.appendChild(check)
  // rightPart.appendChild(secondLike)

  //deri qitu

  let partHome = document.createElement("div");
  partHome.setAttribute(
    "class",
    "bottom-part-card-fourth-part-home bottom-part-card-wishlist"
  );
  card.appendChild(partHome);

  let absolutePart = document.createElement("div");
  absolutePart.setAttribute("class", "absolute-detail-my-property");
  partHome.appendChild(absolutePart);

  let details = document.createElement("details");
  details.setAttribute("class", "my-property-detail");
  absolutePart.appendChild(details);

  let summary = document.createElement("summary");
  summary.setAttribute("class", "my-property-summary");
  details.appendChild(summary);

  let iconSummary = document.createElement("i");
  iconSummary.setAttribute("class", "fa-solid fa-ellipsis-vertical");
  summary.appendChild(iconSummary);

  let detailContent = document.createElement("div");
  detailContent.setAttribute("class", "detail-content-my-property");
  details.appendChild(detailContent);

  let uList = document.createElement("ul");
  uList.setAttribute("class", "ulList");
  detailContent.appendChild(uList);

  let list1 = document.createElement("li");
  list1.setAttribute("class", "editList");
  uList.appendChild(list1);

  let list1Button = document.createElement("button");
  list1Button.setAttribute("class", "editButton");
  list1.appendChild(list1Button);
  let list1Icon = document.createElement("i");
  list1Icon.setAttribute("class", "fa-regular fa-pen-to-square");
  list1Button.appendChild(list1Icon);
  let list1ButtonText = document.createTextNode("Edit");
  list1Button.appendChild(list1ButtonText);

  let list2 = document.createElement("li");
  list2.setAttribute("class", "deleteList");
  uList.appendChild(list2);

  let list2Button = document.createElement("button");
  list2Button.setAttribute("class", "deleteButton");
  list2.appendChild(list2Button);
  let list2Icon = document.createElement("i");
  list2Icon.setAttribute("class", "fa-regular fa-trash-can");
  list2Button.appendChild(list2Icon);
  let list2ButtonText = document.createTextNode("Delete");
  list2Button.appendChild(list2ButtonText);

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
  firstSpan.textContent = " " + bed;
  let firstIcon = document.createElement("i");
  firstIcon.setAttribute("class", "fa-solid fa-bed");
  iconsGroup.appendChild(firstSpan);
  iconsGroup.appendChild(firstIcon);

  let iconsGroup2 = document.createElement("div");
  iconsGroup2.setAttribute("class", "icon-group");
  icons.appendChild(iconsGroup2);
  let secondSpan = document.createElement("span");
  secondSpan.textContent = " " + bath;
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
let numberOfProperties = 0;

getNumber.textContent = numberOfProperties;
function displayMyProducts() {
  numberOfProperties = 0;
  getItemsFromStorage2().forEach((user) => {
    if (user.hasOwnProperty("actualId")) {
      getItemsFromStorage().forEach((property) => {
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
        numberOfProperties++;
      });
    }
  });
  if (numberOfProperties > 0) {
    noResults.style.display = "none";
  } else {
    noResults.style.display == "flex";
  }
  getNumber.textContent = numberOfProperties;
}

displayMyProducts();

function editLocation() {
  window.location.replace("../account/editMyPost.html");
}
function clickProperty(e) {
  let propertyClicked;
  let cardId;
  let mainCard;

  if (
    e.target.className == "fa-solid fa-ellipsis-vertical" ||
    e.target.className == "my-property-summary" ||
    e.target.className == "my-property-detail" ||
    e.target.className == "absolute-detail-my-property" ||
    e.target.className == "ulList" ||
    e.target.className == "editList" ||
    e.target.className == "deleteList" ||
    e.target.className == "editButton" ||
    e.target.className == "deleteButton" ||
    e.target.className == "fa-regular fa-pen-to-square" ||
    e.target.className == "fa-regular fa-trash-can"
  ) {
    if (
      e.target.className == "editButton" ||
      e.target.parentElement.className == "editButton" ||
      e.target.className == "editList"
    ) {
      console.log(e.target);
      if (
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement.className ==
        "fourth-part-home-card wishlist-card"
      ) {
        mainCard =
          e.target.parentElement.parentElement.parentElement.parentElement
            .parentElement.parentElement.parentElement;
      }
      if (
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement.parentElement.className ==
        "fourth-part-home-card wishlist-card"
      ) {
        mainCard =
          e.target.parentElement.parentElement.parentElement.parentElement
            .parentElement.parentElement.parentElement.parentElement;
      }
      console.log(mainCard.className);
      cardId = mainCard.id.slice(4, mainCard.id.length);
      let arrayLc = getItemsFromStorage2();
      arrayLc.forEach((checks) => {
        if (checks.hasOwnProperty("clickedPropertyId")) {
          isExist = true;
          checks.clickedPropertyId = cardId;
          localStorage.setItem("user", JSON.stringify(arrayLc));
        }
      });
      if (isExist == false) {
        let objectProperty = {
          clickedPropertyId: cardId,
        };
        addItemsToStorage(objectProperty);
      }
      editLocation();
    }
    if (
      e.target.className == "deleteButton" ||
      e.target.parentElement.className == "deleteButton" ||
      e.target.className == "deleteList"
    ) {
      console.log(e.target);
      let response = confirm("Are you sure to delete that");
      if (response) {
        let mainCard =
          e.target.parentElement.parentElement.parentElement.parentElement
            .parentElement.parentElement.parentElement;
        if (mainCard.className == "fourth-part-home-card wishlist-card") {
          cardId = mainCard.id.slice(4, mainCard.id.length);
        }
        if (
          mainCard.parentElement.className ==
          "fourth-part-home-card wishlist-card"
        ) {
          cardId = mainCard.id.slice(4, mainCard.id.length);
        }
        let arrayLc = getItemsFromStorage();

        arrayLc.forEach((property) => {
          if (property.id == cardId) {
            arrayLc.splice(arrayLc.indexOf(property), 1);
            localStorage.setItem("property", JSON.stringify(arrayLc));
          }
        });
        let wishLc = getItemsFromStorage3();
        wishLc.forEach((wishlist) => {
          wishlist.wishlistArray.forEach((wishId) => {
            if (wishId == cardId) {
              wishlist.wishlistArray.splice(
                wishlist.wishlistArray.indexOf(wishId),
                1
              );
              localStorage.setItem("wishlist", JSON.stringify(wishLc));
            }
          });
        });

        let userLc = getItemsFromStorage2();
        userLc.forEach((user) => {
          if (user.hasOwnProperty("clickedPropertyId")) {
            if (user.clickedPropertyId == cardId) {
              user.clickedPropertyId = "";
              localStorage.setItem("user", JSON.stringify(userLc));
            }
          }
        });
        if (arrayLc.length < 1) {
          noResults.style.display = "flex";
        }
        getNumber.textContent = arrayLc.length;
        deleteOldItems();
        displayMyProducts();
      }
    }
    propertyClicked = undefined;
  } else if (e.target.id !== "container") {
    if (e.target.className == "fourth-part-home-card wishlist-card") {
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
      mainCard =
        e.target.parentElement.parentElement.parentElement.parentElement;
    }
    cardId = mainCard.id.slice(4, mainCard.id.length);
    console.log(cardId);

    let isExist = false;
    let arrayLc = getItemsFromStorage2();
    arrayLc.forEach((checks) => {
      if (checks.hasOwnProperty("clickedPropertyId")) {
        isExist = true;
        checks.clickedPropertyId = cardId;
        localStorage.setItem("user", JSON.stringify(arrayLc));
      }
    });
    if (isExist == false) {
      let objectProperty = {
        clickedPropertyId: cardId,
      };
      addItemsToStorage(objectProperty);
    }
    propertyLocation();
  }
}
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
function deleteOldItems() {
  let array = getContainer.getElementsByClassName(
    "fourth-part-home-card wishlist-card"
  );
  Array.from(array).forEach((object) => {
    object.remove();
  });
}
function propertyLocation() {
  window.location.replace("../properties-catalog/single-product-file.html");
}
getContainer.addEventListener("click", clickProperty);
clearAll.addEventListener("click", deleteAll);

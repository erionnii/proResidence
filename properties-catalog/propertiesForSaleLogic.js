
let getContainer = document.getElementById("cardCatalogRow");
let results = document.getElementById("results");
let noResults = document.getElementById("noResultContainer");
let resultsNum;

let getSignIn = document.getElementById("signInButtonHeader");
let isExist = false;
let getProfile = document.getElementById("profileButtonHeader");
let getProfilePhoto = document.getElementById("profileImageHeader");
let getSmallSignIn = document.getElementById("signInButtonSmall");

redirect();
signInProfileDisplay();
if (getItemsFromStorage().length > 0) {
  resultsNum = getItemsFromStorage().length;
} else {
  resultsNum = 0;
}
let textResult = document.createTextNode(resultsNum + " Results");
results.appendChild(textResult);

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
let card;

function displayItems(e) {
  let arrayLS = e;
  if (arrayLS.length > 0) {
    arrayLS.forEach((property, index) => {
      let cardId = "card" + property.id;
      let inputId = "first-like-for-sale" + property.id;
      card = document.createElement("div");
      getContainer.appendChild(card);

      card.setAttribute("class", "fourth-part-home-card");
      card.setAttribute("id", cardId);

      let topPartCard = document.createElement("div");
      topPartCard.setAttribute("class", "top-part-card-fourth-part-home");
      card.appendChild(topPartCard);

      let imageSrc = property.image[0];
      let cardImage = document.createElement("img");
      topPartCard.appendChild(cardImage);
      cardImage.setAttribute("class", "card-image-fourth-part-home");
      cardImage.setAttribute("src", imageSrc);

      let elementsInImage = document.createElement("div");
      topPartCard.appendChild(elementsInImage);
      elementsInImage.setAttribute(
        "class",
        "elements-in-card-image-fourth-part-home"
      );

      let leftPartElements = document.createElement("div");
      elementsInImage.appendChild(leftPartElements);
      leftPartElements.setAttribute("class", "left-part");

      let rightPartElements = document.createElement("div");
      rightPartElements.setAttribute("class", "right-part");
      elementsInImage.appendChild(rightPartElements);

      let firstLabelElement = document.createElement("label");
      firstLabelElement.setAttribute("class", "main-like");
      rightPartElements.appendChild(firstLabelElement);
      firstLabelElement.setAttribute("for", inputId);

      let firstIconLabel = document.createElement("i");
      firstLabelElement.appendChild(firstIconLabel);
      firstIconLabel.setAttribute("class", "fa-regular fa-heart");

      let inputElement = document.createElement("input");
      inputElement.setAttribute("type", "checkbox");
      rightPartElements.appendChild(inputElement);
      inputElement.setAttribute("id", inputId);
      //console.log(inputElement.id);
      inputElement.setAttribute("class", "checkbox-like");
      let actualId;
      getItemsFromStorage2().forEach((element) => {
        if (element.hasOwnProperty("actualId")) {
          actualId = element.actualId;
        }
      });
      if (getItemsFromStorage3().length > 0) {
        getItemsFromStorage3().forEach((object) => {
          if (object.wishUser == actualId) {
            object.wishlistArray.forEach((item) => {
              if (item == property.id) {
                inputElement.checked = true;
              }
            });
          }
        });
      }

      let secondLabelElement = document.createElement("label");
      secondLabelElement.setAttribute("for", inputId);
      secondLabelElement.setAttribute("class", "heart");
      rightPartElements.appendChild(secondLabelElement);
      let secondIconLabel = document.createElement("i");
      secondLabelElement.appendChild(secondIconLabel);
      secondIconLabel.setAttribute("class", "fa-solid fa-heart");

      let bottomPartCard = document.createElement("div");
      bottomPartCard.setAttribute("class", "bottom-part-card-fourth-part-home");
      card.appendChild(bottomPartCard);

      let textPart = document.createElement("div");
      bottomPartCard.appendChild(textPart);
      textPart.setAttribute("class", "text-part-card-fourth-part-home");

      let titlePart = document.createElement("h1");
      titlePart.textContent = property.title;
      let locationPart = document.createElement("p");
      locationPart.textContent = property.streetAddress + ", " + property.city;
      let sizePart = document.createElement("p");
      sizePart.textContent = "Area: " + property.area;
      let iconPartText = document.createElement("i");
      iconPartText.setAttribute(
        "class",
        "fa-sharp fa-solid fa-money-check-dollar"
      );

      let spanPart = document.createElement("span");
      spanPart.textContent = property.currency + property.enterPrice;
      textPart.appendChild(titlePart);
      textPart.appendChild(locationPart);
      textPart.appendChild(sizePart);
      textPart.appendChild(iconPartText);
      textPart.appendChild(spanPart);

      let iconPart = document.createElement("div");
      bottomPartCard.appendChild(iconPart);
      iconPart.setAttribute("class", "icons-part-card-fourth-part-home");

      let iconGroup1 = document.createElement("div");
      iconGroup1.setAttribute("class", "icon-group");
      iconPart.appendChild(iconGroup1);

      let spanIcon1 = document.createElement("span");
      spanIcon1.textContent = property.bedroom + " ";
      let singleIcon1 = document.createElement("i");
      singleIcon1.setAttribute("class", "fa-solid fa-bed");
      iconGroup1.appendChild(spanIcon1);
      iconGroup1.appendChild(singleIcon1);

      let iconGroup2 = document.createElement("div");
      iconGroup2.setAttribute("class", "icon-group");
      iconPart.appendChild(iconGroup2);

      let spanIcon2 = document.createElement("span");
      spanIcon2.textContent = property.bathroom + " ";
      let singleIcon2 = document.createElement("i");
      singleIcon2.setAttribute("class", "fa-solid fa-bath");
      iconGroup2.appendChild(spanIcon2);
      iconGroup2.appendChild(singleIcon2);

      let iconGroup3 = document.createElement("div");
      iconGroup3.setAttribute("class", "icon-group");
      iconPart.appendChild(iconGroup3);

      let spanIcon3 = document.createElement("span");
      spanIcon3.textContent = property.parking + " ";
      let singleIcon3 = document.createElement("i");
      singleIcon3.setAttribute("class", "fa-solid fa-car");
      iconGroup3.appendChild(spanIcon3);
      iconGroup3.appendChild(singleIcon3);
    });
  }
}
//console.log('erion' + 1);
if (getItemsFromStorage().length > 0) {
  noResults.style.display = "none";
} else {
  noResults.style.display = "flex";
}
displayItems(getItemsFromStorage());
function getItemsFromStorage(property) {
  let addItemsArray;
  if (localStorage.getItem("property") == null) {
    addItemsArray = [];
  } else {
    addItemsArray = JSON.parse(localStorage.getItem("property"));
  }
  return addItemsArray;
}

let forSaleButton = document.getElementById("forSale");
let forRentButton = document.getElementById("forRent");
function forSale() {
  forRentButton.className = "flex-input-property-main-link";
  let displayArr = [];
  if (
    forSaleButton.className ==
    "flex-input-property-main-link active-main-link-footer"
  ) {
    deleteOldItems();
    forSaleButton.className = "flex-input-property-main-link";
    displayItems(getItemsFromStorage());
  } else {
    forSaleButton.className =
      "flex-input-property-main-link active-main-link-footer";
    getItemsFromStorage().forEach((property) => {
      if (property.selectSell == "for-sale") {
        displayArr.push(property);
      }
    });
    deleteOldItems();
    displayItems(displayArr);
  }

  //console.log(displayArr);
}
function forRent() {
  forSaleButton.className = "flex-input-property-main-link";
  let displayArr = [];
  if (
    forRentButton.className ==
    "flex-input-property-main-link active-main-link-footer"
  ) {
    deleteOldItems();
    forRentButton.className = "flex-input-property-main-link";
    displayItems(getItemsFromStorage());
  } else {
    forRentButton.className =
      "flex-input-property-main-link active-main-link-footer";
    getItemsFromStorage().forEach((property) => {
      if (property.selectSell == "for-rent") {
        displayArr.push(property);
      }
    });

    deleteOldItems();
    displayItems(displayArr);
  }
}
forSaleButton.addEventListener("click", forSale);
forRentButton.addEventListener("click", forRent);


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

function locationn() {
  window.location.replace("./single-product-file.html");
}

let propertyClicked;

function clicked(e) {
  let inputCheck;
  let postId;
  let arrayWish = [];
  let isExist = false;
  let actualId;
  if (e.target.className == "fourth-part-home-card") {
    propertyClicked = e.target;
  } else if (e.target.parentElement.className == "right-part") {
    propertyClicked = undefined;
    inputCheck = e.target.parentElement.getElementsByTagName("input")[0];
    postId = inputCheck.id.slice(19 - inputCheck.id.length);

    getItemsFromStorage2().forEach((object) => {
      if (object.hasOwnProperty("actualId")) {
        actualId = object.actualId;
      }
    });
    if (getItemsFromStorage3().length > 0) {
      getItemsFromStorage3().forEach((object) => {
        if (object.hasOwnProperty("wishUser")) {
          //console.log(object.wishUser == actualId);
          if (object.wishUser == actualId) {
            isExist = true;
            arrayWish = object.wishlistArray;
          }
        }
      });
    }
    if (inputCheck.checked) {
      let isExistNum = false;
      if (getItemsFromStorage3().length > 0) {
        getItemsFromStorage3().forEach((object) => {
          if (object.hasOwnProperty("wishUser")) {
            if (object.wishUser == actualId)
              object.wishlistArray.forEach((number) => {
                if (number == postId) {
                  isExistNum = true;
                }
              });
          }
        });
      }
      if (isExistNum == false) {
        arrayWish.push(postId);
      }
    } else {
      arrayWish.splice(arrayWish.indexOf(postId), 1);
    }
    //console.log(arrayWish);

    if (isExist == true) {
      let arrayLC = getItemsFromStorage3();
      arrayLC.forEach((object) => {
        if (object.hasOwnProperty("wishUser")) {
          if (object.wishUser == actualId) {
            object.wishlistArray = arrayWish;
          }
        }
      });
      //console.log(arrayLC);
      localStorage.setItem("wishlist", JSON.stringify(arrayLC));
    }
    if (isExist == false) {
      let wishlist = {
        wishUser: actualId,
        wishlistArray: arrayWish,
      };
      addItemsToStorage3(wishlist);
    }
  } else if (e.target.parentElement.className == "fourth-part-home-card") {
    propertyClicked = e.target.parentElement;
  } else if (
    e.target.parentElement.parentElement.className == "fourth-part-home-card"
  ) {
    propertyClicked = e.target.parentElement.parentElement;
  } else if (
    e.target.parentElement.parentElement.parentElement.className ==
    "fourth-part-home-card"
  ) {
    propertyClicked = e.target.parentElement.parentElement.parentElement;
  } else if (
    e.target.parentElement.parentElement.parentElement.parentElement
      .className == "fourth-part-home-card"
  ) {
    propertyClicked =
      e.target.parentElement.parentElement.parentElement.parentElement;
  } else if (e.target.className == "card-catalog-row") {
    //console.log("hello");
  }
  //console.log(propertyClicked);
  if (propertyClicked !== undefined) {
    //console.log(propertyClicked.id.slice(4 - propertyClicked.id.length));
    let isExist = false;
    let arrayLc = getItemsFromStorage2();
    arrayLc.forEach((checks) => {
      if (checks.hasOwnProperty("clickedPropertyId")) {
        isExist = true;
        checks.clickedPropertyId = propertyClicked.id.slice(
          4 - propertyClicked.id.length
        );
        localStorage.setItem("user", JSON.stringify(arrayLc));
      }
    });
    if (isExist == false) {
      let objectProperty = {
        clickedPropertyId: propertyClicked.id.slice(
          4 - propertyClicked.id.length
        ),
      };
      addItemsToStorage(objectProperty);
    }
    locationn();
  }
}
getContainer.addEventListener("click", clicked);

function getItemsFromStorage2(user) {
  let addItemsArray;
  if (localStorage.getItem("user") == null) {
    addItemsArray = [];
  } else {
    addItemsArray = JSON.parse(localStorage.getItem("user"));
  }
  return addItemsArray;
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

function getItemsFromStorage3(wishlist) {
  let addItemsArray;
  if (localStorage.getItem("wishlist") == null) {
    addItemsArray = [];
  } else {
    addItemsArray = JSON.parse(localStorage.getItem("wishlist"));
  }
  return addItemsArray;
}
function addItemsToStorage3(wishlist) {
  let addItemsArray;
  if (localStorage.getItem("wishlist") == null) {
    addItemsArray = [];
  } else {
    addItemsArray = JSON.parse(localStorage.getItem("wishlist"));
  }
  addItemsArray.push(wishlist);
  localStorage.setItem("wishlist", JSON.stringify(addItemsArray));
  return addItemsArray;
}

let getFilter = document.getElementById("filterForSale");

let category = document.getElementById("select-category-add-property");
let enterCity = document.getElementById("enterCityInputSell");
let district = document.getElementById("enterDistrictInputSell");

let houseSell = document.getElementById("house-sell");
let apartmentSell = document.getElementById("apartment-sell");
let roomSell = document.getElementById("room-sell");
let officeSell = document.getElementById("office-sell");
let dailySell = document.getElementById("daily-sell");
let commercialSell = document.getElementById("commercial-sell");

let minValue = document.getElementById("minValueInputSell");
let maxValue = document.getElementById("maxValueInputSell");
//console.log(maxValue);

let bedroom = document.getElementById("none-bedroom-add-property");
let oneBedroom = document.getElementById("one-bedroom-add-property");
let twoBedroom = document.getElementById("two-bedroom-add-property");
let threeBedroom = document.getElementById("three-bedroom-add-property");
let fourBedroom = document.getElementById("four-bedroom-add-property");
let fiveBedroom = document.getElementById("five-bedroom-add-property");

let bathroom = document.getElementById("none-bathroom-add-property");

let oneBathroom = document.getElementById("one-bathroom-add-property");

let twoBathroom = document.getElementById("two-bathroom-add-property");

let threeBathroom = document.getElementById("three-bathroom-add-property");

let fourBathroom = document.getElementById("four-bathroom-add-property");

let minMetres = document.getElementById("minMetresInput");

let maxMetres = document.getElementById("maxMetresInput");

let wifiCheck = document.getElementById("wifi-check");
let airCondition = document.getElementById("air-condition-check");
let balconyCheck = document.getElementById("balcony-check");
let garageCheck = document.getElementById("garage-check");
let gymCheck = document.getElementById("gym-check");
let parkingCheck = document.getElementById("parking-check");
let poolCheck = document.getElementById("pool-check");
let tvCheck = document.getElementById("tv-check");
let heatingCheck = document.getElementById("heating-check");
let dishwasherCheck = document.getElementById("dishwasher-check");
let kitchenCheck = document.getElementById("kitchen-check");
let securityCheck = document.getElementById("security-check");

let verifiedCheck = document.getElementById("verified-check");

let featuredCheck = document.getElementById("featured-check");
let objectArrays;

function submitFilter(e) {
  objectArrays = [];
  e.preventDefault();
  let bedroomValue;
  let bathroomValue;
  let isExistAmenity = false;
  let anyFalse = false;
  //console.log(bedroomValue);
  let bedroomArr = [
    bedroom,
    oneBedroom,
    twoBedroom,
    threeBedroom,
    fourBedroom,
    fiveBedroom,
  ];
  let bathroomArr = [
    bathroom,
    oneBathroom,
    twoBathroom,
    threeBathroom,
    fourBathroom,
  ];
  let categoryArr = [
    houseSell,
    apartmentSell,
    roomSell,
    officeSell,
    dailySell,
    commercialSell,
  ];
  let amenities = [
    wifiCheck,
    airCondition,
    balconyCheck,
    garageCheck,
    gymCheck,
    parkingCheck,
    poolCheck,
    tvCheck,
    heatingCheck,
    dishwasherCheck,
    kitchenCheck,
    securityCheck,
  ];

  getItemsFromStorage().forEach((object) => {
    isExistCategory = false;
    let existingAmenities = [];
    let countExist = false;
    if (object.country == category.value) {
      // //console.log(enterCity.value);
      if (
        enterCity.value.toLowerCase() == object.city.toLowerCase() ||
        enterCity.value == ""
      ) {
        if (
          district.value.toLowerCase() == object.district.toLowerCase() ||
          district.value == ""
        ) {
          categoryArr.forEach((type) => {
            if (type.checked) {
              if (
                type.nextElementSibling.textContent.toLowerCase() ==
                object.category
              ) {
                isExistCategory = true;
                console.log(
                  object.category ==
                    type.nextElementSibling.textContent.toLowerCase()
                );
              }
              countExist = true;
            }
          });
          if (isExistCategory == true || countExist == false) {
            if (
              (Number(minValue.value) < Number(object.enterPrice) &&
                Number(object.enterPrice) < Number(maxValue.value)) ||
              Number(minValue.value) == 0 ||
              Number(maxValue.value) == 0
            ) {
              bedroomArr.forEach((input, index) => {
                if (input.checked) {
                  bedroomValue = index;
                  if (index == 0) {
                    bedroomValue = "-";
                  }
                  if (index == 5) {
                    bedroomValue = "5+";
                  }
                }
              });
              if (bedroomValue == object.bedroom || bedroomValue == undefined) {
                bedroomArr.forEach((input, index) => {
                  if (input.checked) {
                    bedroomValue = index;
                    if (index == 0) {
                      bedroomValue = "-";
                    }
                    if (index == 5) {
                      bedroomValue = "5+";
                    }
                  }
                });
                if (
                  bathroomValue == object.bathroom ||
                  bathroomValue == undefined
                ) {
                  bathroomArr.forEach((input, index) => {
                    if (input.checked) {
                      bathroomValue = index;
                      if (index == 0) {
                        bathroomValue = "-";
                      }
                      if (index == 5) {
                        bathroomValue = "5+";
                      }
                    }
                  });
                  if (
                    (Number(minMetres.value) < Number(object.area) &&
                      Number(object.area) < Number(maxMetres.value)) ||
                    Number(minMetres.value) == 0 ||
                    Number(maxMetres.value) == 0
                  ) {
                    amenities.forEach((inputElement) => {
                      if (inputElement.checked) {
                        existingAmenities.push(
                          inputElement.nextElementSibling.textContent
                        );
                      }
                    });
                    existingAmenities.sort();
                    existingAmenities.forEach((inputChecked) => {
                      isExistAmenity = false;
                      object.amenities.forEach((amenity) => {
                        if (inputChecked == amenity) {
                          isExistAmenity = true;
                        }
                      });
                      if (isExistAmenity == false) {
                        anyFalse = true;
                      }
                    });
                    if (anyFalse == false) {
                      console.log(object.category);
                      objectArrays.push(object.id);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
  displayFilter();
}
let getFilterErrorHeading = document.getElementById("propertiesStateHeading");
let getFilterErrorParagraph = document.getElementById(
  "propertiesStateParagraph"
);

function filterNoPostText() {
  if (getItemsFromStorage().length < 1) {
    getFilterErrorHeading.textContent = "No properties posted!";
    getFilterErrorParagraph.textContent = "Be the first one to add a property.";
  } else {
    getFilterErrorHeading.textContent = "No results found!";
    getFilterErrorParagraph.textContent =
      "Change filters or click reset filters.";
  }
}
function displayFilter() {
  let propertyArray = [];
  if (objectArrays.length > 0) {
    noResults.style.display = "none";
  } else {
    noResults.style.display = "flex";
    filterNoPostText();
  }
  objectArrays.forEach((idElement) => {
    getItemsFromStorage().forEach((property) => {
      if (property.id == idElement) {
        propertyArray.push(property);
      }
    });
  });
  //console.log(getContainer);
  deleteOldItems();
  displayItems(propertyArray);
}
function deleteOldItems() {
  let array = getContainer.getElementsByClassName("fourth-part-home-card");
  Array.from(array).forEach((object) => {
    object.remove();
  });
}
getFilter.addEventListener("submit", submitFilter);

let getSort = document.getElementById("sortType");
function sort() {
  let propertyIdArray = [];
  //console.log(getSort.value);
  if (getSort.value == "oldest") {
    deleteOldItems();
    displayItems(getItemsFromStorage());
  } else if (getSort.value == "newest") {
    let arrayReverse = getItemsFromStorage().reverse();
    deleteOldItems();
    displayItems(arrayReverse);
  } else if (getSort.value == "lowestPrice") {
    sortByPrice(propertyIdArray);
    displayItems(propertyIdArray);
  } else if (getSort.value == "highestPrice") {
    sortByPrice(propertyIdArray);
    displayItems(propertyIdArray.reverse());
  }
}

function sortByPrice(arr) {
  let arrayLS = getItemsFromStorage();
  let priceArray = [];
  getItemsFromStorage().forEach((object) => {
    priceArray.push(object.enterPrice);
  });
  priceArray.sort((a, b) => a - b);

  let loopRep = false;
  priceArray.forEach((price) => {
    loopRep = false;
    arrayLS.forEach((property) => {
      if (loopRep == false) {
        if (price == property.enterPrice) {
          let isExist = false;
          arr.forEach((arrId) => {
            if (property.id == arrId.id) {
              isExist = true;
            }
          });
          if (isExist == false) {
            arr.push(property);
            delete arrayLS[arrayLS.indexOf(property)];
          }
          loopRep = true;
        }
      }
    });
    //console.log(arr);
  });
  deleteOldItems();
}

getSort.addEventListener("input", sort);

let resetButton = document.getElementById("resetButton");
function reset() {
  deleteOldItems();
  if (getItemsFromStorage().length > 0) {
    noResults.style.display = "none";
  } else {
    noResults.style.display = "flex";
  }
  displayItems(getItemsFromStorage());
  getSort.value = "oldest";
}
resetButton.addEventListener("click", reset);

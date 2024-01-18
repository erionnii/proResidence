let getSignIn = document.getElementById("signInButtonHeader");
let isExist = false;
let getProfile = document.getElementById("profileButtonHeader");
let getProfilePhoto = document.getElementById("profileImageHeader");
let getSmallSignIn = document.getElementById("signInButtonSmall");

let getTitle = document.getElementById("mainTitle");
let getAddress = document.getElementById("mainAddress");
let getBed = document.getElementById("bedNum");
let getBath = document.getElementById("bathNum");
let getParking = document.getElementById("parkingNum");
let getArea = document.getElementById("area");
let getPrice = document.getElementById("price");
let getPriceTime = document.getElementById("priceTime");
let getDescription = document.getElementById("descriptionProperty");
let typeDet = document.getElementById("typeDet");
let areaDet = document.getElementById("areaDet");
let bedDet = document.getElementById("bedDet");
let bathDet = document.getElementById("bathDet");
let parkingDet = document.getElementById("parkingDet");

let photoAdmin = document.getElementById("photoAdmin");
let nameAdmin = document.getElementById("nameAdmin");
let phoneAdmin = document.getElementById("phoneAdmin");
let emailAdmin = document.getElementById("emailAdmin");
let fullName = document.getElementById("fullNameForm");
fullName.style.textTransform = "capitalize";
let emailSend = document.getElementById("emailForm");

let getGroup1 = document.getElementById("amenityGroup1");
let getGroup2 = document.getElementById("amenityGroup2");
let getGroup3 = document.getElementById("amenityGroup3");
let getGroup4 = document.getElementById("amenityGroup4");

let getImagesSingle = document.getElementsByClassName("imageConSingle");
let getSingleContainer = document.getElementById("containerImgSingle");
let screenHeight = screen.height / 1.5 + "px";
getSingleContainer.style.height = screenHeight;
let getClickedId;
function getClicked() {
  getItemsFromStorage2().forEach((object) => {
    if (object.hasOwnProperty("clickedPropertyId"))
      getClickedId = object.clickedPropertyId;
  });
}
getClicked();
redirect();
signInProfileDisplay();
function displayImages() {
  getItemsFromStorage().forEach((property) => {
    if (property.id == getClickedId) {
      property.image.forEach((image, index) => {
        let containerImage = document.createElement("div");
        let source = "url(" + image + ")";
        let divImage = document.createElement("div");
        divImage.className = "absoluteDivSingle";
        let blurImage = document.createElement("img");
        blurImage.className = "blurImageSingle";
        divImage.appendChild(blurImage);
        blurImage.src = image;
        containerImage.appendChild(divImage);
        containerImage.style.backgroundImage = source;
        containerImage.style.backgroundRepeat = "noRepeat";
        containerImage.className = "imageConSingle";
        containerImage.id = index;
        let singleImage = document.createElement("img");
        getSingleContainer.appendChild(containerImage);
        singleImage.className = "singleImage";
        containerImage.appendChild(singleImage);
        singleImage.src = image;
      });
    }
  });
}
displayImages();
let elmentsArr = getSingleContainer.getElementsByClassName("imageConSingle");
let arrImgLength = Array.from(elmentsArr).length;
let styleValue = 100 / (arrImgLength - 1);
let flexStyle = "0 0 " + styleValue + "%";
console.log(flexStyle);
// Array.from(elmentsArr).forEach((div) => {
//     if (arrImgLength > 1) {
//         div.style.flex = flexStyle;
//     } else {
//         div.style.flex = "0 0 99%"
//     }
// });
let rightArr = document.getElementById("rightArrow");
let leftArr = document.getElementById("leftArrow");
let i = 0;
function rightArrClick() {
  if (arrImgLength > i + 1) {
    i++;
    Array.from(elmentsArr).forEach((div) => {
      console.log(div);
      let widthDiv = (div.offsetWidth + 30) * i;
      console.log(widthDiv);
      let style = "translateX(-" + widthDiv + "px)";
      console.log(style);
      div.style.transform = style;
    });
  }
}
rightArr.addEventListener("click", rightArrClick);

function leftArrClick() {
  if (i > 0) {
    i--;
    Array.from(elmentsArr).forEach((div) => {
      console.log(div);
      let widthDiv = (div.offsetWidth + 30) * i;
      console.log(widthDiv);
      let style = "translateX(-" + widthDiv + "px)";

      console.log(style);
      div.style.transform = style;
    });
  }
}
leftArr.addEventListener("click", leftArrClick);

function getPostData() {
  getItemsFromStorage().forEach((property) => {
    if (property.hasOwnProperty("id")) {
      if (property.id == getClickedId) {
        property.amenities.sort().forEach((amenity, index) => {
          let amenityDisplay = document.createElement("li");
          amenityDisplay.setAttribute("id", amenity);
          let textAmenity = document.createTextNode(amenity);
          let icon = document.createElement("i");
          if (amenity == "Air conditioning") {
            icon.setAttribute("class", "fa-solid fa-snowflake");
          } else if (amenity == "Balcony") {
            icon.setAttribute("class", "fa-solid fa-stairs");
          } else if (amenity == "Dishwasher") {
            icon.setAttribute("class", "fa-solid fa-plate-wheat");
          } else if (amenity == "Garage") {
            icon.setAttribute("class", "fa-solid fa-warehouse");
          } else if (amenity == "Gym") {
            icon.setAttribute("class", "fa-solid fa-dumbbell");
          } else if (amenity == "Heating") {
            icon.setAttribute(
              "class",
              "fa-solid fa-temperature-three-quarters"
            );
          } else if (amenity == "Kitchen") {
            icon.setAttribute("class", "fa-solid fa-kitchen-set");
          } else if (amenity == "Parking") {
            icon.setAttribute("class", "fa-solid fa-square-parking");
          } else if (amenity == "Pool") {
            icon.setAttribute("class", "fa-solid fa-water-ladder");
          } else if (amenity == "Security cameras") {
            icon.setAttribute("class", "fa-solid fa-camera");
          } else if (amenity == "TV") {
            icon.setAttribute("class", "fa-solid fa-tv");
          } else if (amenity == "WiFi") {
            icon.setAttribute("class", "fa-solid fa-wifi");
          }

          amenityDisplay.appendChild(icon);
          amenityDisplay.appendChild(textAmenity);

          if (index < 3) {
            getGroup1.appendChild(amenityDisplay);
          } else if (index < 6) {
            getGroup2.appendChild(amenityDisplay);
          } else if (index < 9) {
            getGroup3.appendChild(amenityDisplay);
          } else {
            getGroup4.appendChild(amenityDisplay);
          }
        });
        //all code is here
        let signedId;
        getItemsFromStorage2().forEach((actualId) => {
          if (actualId.hasOwnProperty("actualId")) {
            signedId = actualId.actualId;
          }
        });

        nameAdmin.textContent = property.firstName + " " + property.lastName;
        phoneAdmin.textContent = property.number;
        emailAdmin.textContent = property.email;
        getItemsFromStorage2().forEach((user) => {
          if (user.id == signedId) {
            fullName.value = user.name;
            emailSend.value = user.email;
          }
          if (user.id == property.adminId) {
            photoAdmin.src = user.img;
          }
        });
        getTitle.textContent = property.title;
        getAddress.textContent = property.streetAddress + ", " + property.city;
        getAddress.style.textTransform = "capitalize";
        getBed.textContent = property.bedroom;
        getBath.textContent = property.bathroom;
        getParking.textContent = property.parking;
        getArea.textContent = property.area;
        getPrice.textContent = property.currency + property.enterPrice + " ";
        getPriceTime.textContent = " /" + property.priceTime;
        getDescription.textContent = property.description;
        typeDet.textContent = property.category;
        areaDet.textContent = property.area + " sq.m";
        bedDet.textContent = property.bedroom;
        bathDet.textContent = property.bathroom;
        parkingDet.textContent = property.parking;
      }
    }
  });
}
getPostData();
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
let postId;
let actualUser;

getItemsFromStorage2().forEach((user) => {
  if (user.hasOwnProperty("actualId")) {
    actualUser = user.actualId;
  }
});
getItemsFromStorage2().forEach((user) => {
  if (user.hasOwnProperty("clickedPropertyId")) {
    postId = user.clickedPropertyId;
  }
});

let getLikeInput = document.getElementById("main-like-single-product");
function likeFn() {
  let isExist = false;

  console.log(actualUser);
  getItemsFromStorage3().forEach((wishlistt) => {
    if (wishlistt.wishUser == actualUser) {
      console.log(wishlistt);
      wishlistt.wishlistArray.forEach((wishId) => {
        if (wishId == postId) {
          isExist = true;
        }
      });
    }
  });
  if (isExist == true) {
    getLikeInput.checked = true;
  }
}

// ki me bo funksionin me bo like nje product prej single page
function clickLike() {
  let arrayLS = getItemsFromStorage3();
  let isExistId = false;
  let isExistWl = false;
  if (getLikeInput.checked == true) {
    arrayLS.forEach((wList) => {
      if (wList.wishUser == actualUser) {
        isExistWl = true;
        wList.wishlistArray.forEach((wishId) => {
          if (wishId == postId) {
            isExistId = true;
          }
        });
        if (isExistId == false) {
          wList.wishlistArray.push(postId);
          localStorage.setItem("wishlist", JSON.stringify(arrayLS));
        }
      }
    });
    if (isExistWl == false) {
      let wishlist = {
        wishUser: actualUser,
        wishlistArray: [],
      };
      wishlist.wishlistArray.push(postId);
      addItemsToStorage2(wishlist);
    }
  } else {
    arrayLS.forEach((wList) => {
      if (wList.wishUser == actualUser) {
        wList.wishlistArray.forEach((wishId, index) => {
          if (wishId == postId) {
            wList.wishlistArray.splice(index, 1);
            localStorage.setItem("wishlist", JSON.stringify(arrayLS));
          }
        });
      }
    });
  }
}

function addItemsToStorage2(wishlist) {
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
getLikeInput.addEventListener("click", clickLike);
likeFn();

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
let getContainer = document.getElementById("containerTopOffer");
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
  });
}

let arrayDisplay = [];
sortByPrice(arrayDisplay);
arrayDisplay.reverse().length = 4;
displayItems(arrayDisplay);

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

      // let firstLabelElement = document.createElement('label')
      // firstLabelElement.setAttribute('class', 'main-like')
      // rightPartElements.appendChild(firstLabelElement)
      // firstLabelElement.setAttribute('for', inputId)

      // let firstIconLabel = document.createElement('i')
      // firstLabelElement.appendChild(firstIconLabel)
      // firstIconLabel.setAttribute('class', 'fa-regular fa-heart')

      // let inputElement = document.createElement('input')
      // inputElement.setAttribute('type', 'checkbox')
      // rightPartElements.appendChild(inputElement)
      // inputElement.setAttribute('id', inputId)
      // console.log(inputElement.id);
      // inputElement.setAttribute('class', 'checkbox-like')
      // let actualId
      // getItemsFromStorage2().forEach(element => {
      //     if (element.hasOwnProperty('actualId')) {
      //         actualId = element.actualId
      //     }
      // })
      // if (getItemsFromStorage3().length > 0) {
      //     getItemsFromStorage3().forEach(object => {
      //         if (object.wishUser == actualId) {
      //             object.wishlistArray.forEach(item => {
      //                 if (item == (property.id)) {
      //                     inputElement.checked = true
      //                 }
      //             })
      //         }
      //     })
      // }

      // let secondLabelElement = document.createElement('label')
      // secondLabelElement.setAttribute('for', inputId)
      // secondLabelElement.setAttribute('class', 'heart')
      // rightPartElements.appendChild(secondLabelElement)
      // let secondIconLabel = document.createElement('i')
      // secondLabelElement.appendChild(secondIconLabel)
      // secondIconLabel.setAttribute('class', 'fa-solid fa-heart')

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

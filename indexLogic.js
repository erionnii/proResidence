let home = document.getElementById("home");
let propSale = document.getElementById("propSale");
let personalInfo = document.getElementById("personalInfo");
let wishlist = document.getElementById("wishlist");
let myProperties = document.getElementById("myProperties");
let propSale2 = document.getElementById("propSale2");
let personalInfo2 = document.getElementById("personalInfo2");
let wishlist2 = document.getElementById("wishlist2");
let myProperties2 = document.getElementById("myProperties2");

let image1 = document.getElementById("firstImageHome");
let image2 = document.getElementById("secondImageHome");
let image3 = document.getElementById("thirdImageHome");

let mainImages = [image1, image2, image3];

let type1 = document.getElementById("firstForType");
let type2 = document.getElementById("secondForType");
let type3 = document.getElementById("thirdForType");

let mainTypes = [type1, type2, type3];

let title1 = document.getElementById("firstTitleHome");
let title2 = document.getElementById("secondTitleHome");
let title3 = document.getElementById("thirdTitleHome");

let mainTitles = [title1, title2, title3];

let street1 = document.getElementById("firstStreetHome");
let street2 = document.getElementById("secondStreetHome");
let street3 = document.getElementById("thirdStreetHome");

let mainStreets = [street1, street2, street3];

let price1 = document.getElementById("firstPriceHome");
let price2 = document.getElementById("secondPriceHome");
let price3 = document.getElementById("thirdPriceHome");


let getSignIn = document.getElementById("signInButtonHeader");
let isExist = false;
let getProfile = document.getElementById("profileButtonHeader");
let getProfilePhoto = document.getElementById("profileImageHeader");
let getSmallSignIn = document.getElementById("signInButtonSmall");

let mainPrices = [price1, price2, price3];
signInProfileDisplay();
function display3MainImages() {
  let arrayLS = getItemsFromStorage2();
  if (arrayLS.length > 3) {
    arrayLS.length = 3;
  }
  arrayLS.forEach((property, index) => {
    mainImages.forEach((img, ind) => {
      if (ind == index) {
        img.src = property.image[0];
        console.log(img);
      }
    });
    mainTypes.forEach((text, ind) => {
      if (ind == index) {
        text.textContent = property.selectSell.replace("-", " ");
      }
    });
    mainTitles.forEach((text, ind) => {
      if (ind == index) {
        text.textContent = property.title;
      }
    });
    mainStreets.forEach((text, ind) => {
      if (ind == index) {
        text.textContent = property.streetAddress;
      }
    });
    mainPrices.forEach((text, ind) => {
      if (ind == index) {
        text.textContent = "$" + property.enterPrice;
      }
    });

    // mainTitles[index]=property.title
    // mainStreets[index]= property.streetAddress
    // mainPrices[index] = property.enterPrice
  });
  console.log(arrayLS);
}
display3MainImages();


function signInProfileDisplay() {
  let setName = document.getElementById("userName");
  let userLoged;
  if (getItemsFromStorage().length > 0) {
    getItemsFromStorage().forEach((object) => {
      if (object.hasOwnProperty("actualId")) {
        isExist = true;
        if (object.actualId >= 0) {
          getSignIn.style.display = "none";
          getSmallSignIn.style.display = "none";
          userLoged = object.actualId;
          getItemsFromStorage().forEach((user) => {
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
function getItemsFromStorage(user) {
  let addItemsArray;
  if (localStorage.getItem("user") == null) {
    addItemsArray = [];
  } else {
    addItemsArray = JSON.parse(localStorage.getItem("user"));
  }
  return addItemsArray;
}

let getContainer = document.getElementById("containerTopOffer");

function clickItem(e) {
  let mainCard;
  if (e.target.className == "fourth-part-home-card") {
    mainCard = e.target;
  } else if (e.target.parentElement.className == "fourth-part-home-card") {
    mainCard = e.target.parentElement;
  } else if (
    e.target.parentElement.parentElement.className == "fourth-part-home-card"
  ) {
    mainCard = e.target.parentElement.parentElement;
  } else if (
    e.target.parentElement.parentElement.parentElement.className ==
    "fourth-part-home-card"
  ) {
    mainCard = e.target.parentElement.parentElement.parentElement;
  } else if (
    e.target.parentElement.parentElement.parentElement.parentElement
      .className == "fourth-part-home-card"
  ) {
    mainCard = e.target.parentElement.parentElement.parentElement.parentElement;
  }
  console.log(mainCard.id.slice(4, mainCard.id.length));
  let arrayLc = getItemsFromStorage();
  let isExist = false;
  arrayLc.forEach((user) => {
    if (user.hasOwnProperty("clickedPropertyId")) {
      user.clickedPropertyId = mainCard.id.slice(4, mainCard.id.length);
      isExist = true;
    }
  });
  if (isExist == false) {
    let objectProperty = {
      clickedPropertyId: mainCard.id.slice(4 - mainCard.id.length),
    };
    addItemsToStorage(objectProperty);
  }
  localStorage.setItem("user", JSON.stringify(arrayLc));
  locationn();
}
function locationn() {
  window.location.replace("./properties-catalog/single-product-file.html");
}
getContainer.addEventListener("click", clickItem);
function sortByPrice(arr) {
  let arrayLS = getItemsFromStorage2();
  let priceArray = [];
  getItemsFromStorage2().forEach((object) => {
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

function getItemsFromStorage2(property) {
  let addItemsArray;
  if (localStorage.getItem("property") == null) {
    addItemsArray = [];
  } else {
    addItemsArray = JSON.parse(localStorage.getItem("property"));
  }
  return addItemsArray;
}

function deactivateLinks() {
  propSale.setAttribute("href", "./log-in/sign-in.html");
  personalInfo.setAttribute("href", "./log-in/sign-in.html");
  wishlist.setAttribute("href", "./log-in/sign-in.html");
  myProperties.setAttribute("href", "./log-in/sign-in.html");

  propSale2.setAttribute("href", "./log-in/sign-in.html");
  personalInfo2.setAttribute("href", "./log-in/sign-in.html");
  wishlist2.setAttribute("href", "./log-in/sign-in.html");
  myProperties2.setAttribute("href", "./log-in/sign-in.html");
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

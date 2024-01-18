let propertyTitle = document.getElementById("property-title");
let selectSell = document.getElementById("select-sell-type-add-property");
let category = document.getElementById("select-category-add-property");

let companySeller = document.getElementById("company-seller");
let privateSeller = document.getElementById("private-seller");

let selectCountry = document.getElementById("select-country-add-property");
let city = document.getElementById("city-add-property");
let district = document.getElementById("district-add-property");
let zipCode = document.getElementById("zip-code-property");
let streetAddress = document.getElementById("street-address-add-property");

let area = document.getElementById("area-add-property");

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
let fiveBathroom = document.getElementById("five-bathroom-add-property");

let parking = document.getElementById("none-parking-add-property");
let parkingOne = document.getElementById("one-parking-add-property");
let parkingTwo = document.getElementById("two-parking-add-property");
let parkingThree = document.getElementById("three-parking-add-property");
let parkingFour = document.getElementById("four-parking-add-property");
let parkingFive = document.getElementById("five-parking-add-property");

let wifi = document.getElementById("wifi-check");
let air = document.getElementById("air-condition-check");
let balcony = document.getElementById("balcony-check");
let garage = document.getElementById("garage-check");

let gym = document.getElementById("gym-check");
let parkingCheck = document.getElementById("parking-check");
let pool = document.getElementById("pool-check");
let tv = document.getElementById("tv-check");

let heating = document.getElementById("heating-check");
let dishwasher = document.getElementById("dishwasher-check");
let kitchen = document.getElementById("kitchen-check");
let security = document.getElementById("security-check");

let description = document.getElementById("description-add-property");

let enterPrice = document.getElementById("enter-price-add-property");
let currency = document.getElementById("priceCurrency");
let priceTime = document.getElementById("priceTime");

let photo = document.getElementById("add-photo");

let firstName = document.getElementById("first-name-add-property");
let lastName = document.getElementById("last-name-add-property");
let email = document.getElementById("email-add-property");
let number = document.getElementById("number-add-property");
let nameCompany = document.getElementById("company-name-add-property");
let lastId;


let getSignIn = document.getElementById("signInButtonHeader");
let isExist = false;
let getProfile = document.getElementById("profileButtonHeader");
let getProfilePhoto = document.getElementById("profileImageHeader");
let getSmallSignIn = document.getElementById("signInButtonSmall");



signInProfileDisplay();

function getId() {
  let arrayLS = getItemsFromStorage();
  if (arrayLS.length > 0) {
    arrayLS.forEach((propeerty) => {
      if (propeerty.hasOwnProperty("id")) {
        lastId = propeerty.id;
      }
    });
  } else {
    lastId = 0;
  }
}
getId();

console.log(lastId);

function displayValues() {
  let actual;
  getItemsFromStorage2().forEach((user) => {
    if (user.hasOwnProperty("actualId")) {
      actual = user.actualId;
    }
  });
  getItemsFromStorage2().forEach((user) => {
    if (user.id == actual) {
      firstName.value = user.name.split(" ")[0];
      lastName.value = user.name.split(" ")[1];
      lastName.value ??= ""
      email.value = user.email;
      number.value = user.phone;
      nameCompany.value = user.company;
    }
  });
}
displayValues();
//get others

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
redirect();
function signInLocation() {
  window.location.replace("./log-in/sign-in.html");
}

let errorInfo = document.getElementById("errorInfo");
let getForm = document.getElementById("addPropertyForm");
let getAdminId;
let imgDataLs;
let imgArray = [];
function getBase64(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result);
    };
    // reader.onerror = reject
  });
}
let getContainerImg = document.getElementById("containerImg");
function clickPhoto(e) {
  let cardId;
  console.log(e.target);
  if (e.target.className == "removePhotoDiv") {
    card = e.target.parentElement.lastChild;
    imgArray.splice(imgArray.indexOf(card.src), 1);
    let array = getContainerImg.getElementsByClassName("myImage");
    Array.from(array).forEach((object) => {
      if (object.id.slice(3) == card.id.slice(3)) {
        object.parentElement.remove();
      }
    });
  } else if (e.target.className == "fa-solid fa-xmark") {
    card = e.target.parentElement.parentElement.lastChild;
    imgArray.splice(imgArray.indexOf(card.src), 1);
    let array = getContainerImg.getElementsByClassName("myImage");
    Array.from(array).forEach((object) => {
      if (object.id.slice(3) == card.id.slice(3)) {
        object.parentElement.remove();
      }
    });
  }
}
getContainerImg.addEventListener("click", clickPhoto);
document.querySelector("#add-photo").addEventListener("change", async (e) => {
  const data = await getBase64(e.target.files[0]);
  imgDataLs = data;
  let array = getContainerImg.getElementsByClassName("myImage");
  Array.from(array).forEach((object) => {
    object.parentElement.remove();
  });
  imgArray.push(data);
  imgArray.forEach((photoData, index) => {
    let imageCon = document.createElement("div");
    imageCon.className = "imageCon";
    let image = document.createElement("img");
    image.className = "myImage";
    image.style.cursor = "default";
    imageCon.style.height = "100px";
    imageCon.style.width = "100px";
    image.id = "img" + index;
    image.style.height = "100%";
    image.style.width = "100%";
    imageCon.style.position = "relative";
    image.style.marginRight = "10px";
    image.src = photoData;
    let removePhoto = document.createElement("button");
    let removePhotoIcon = document.createElement("i");
    removePhotoIcon.className = "fa-solid fa-xmark";
    removePhoto.appendChild(removePhotoIcon);
    imageCon.appendChild(removePhoto);
    removePhoto.className = "removePhotoDiv";
    imageCon.appendChild(image);
    getContainerImg.appendChild(imageCon);
  });
});

function submitForm(e) {
  e.preventDefault();
  console.log(photo.value);
  let bedroomClicked = true;
  let bedroomNumber = "-";
  if (bedroom.checked) {
    bedroomNumber = "-";
  } else if (oneBedroom.checked) {
    bedroomNumber = "1";
  } else if (twoBedroom.checked) {
    bedroomNumber = "2";
  } else if (threeBedroom.checked) {
    bedroomNumber = "3";
  } else if (fourBedroom.checked) {
    bedroomNumber = "4";
  } else if (fiveBedroom.checked) {
    bedroomNumber = "5+";
  } else {
    bedroomClicked = false;
  }

  let parkingClicked = true;
  let parkingNumber = "-";
  if (parking.checked) {
    parkingNumber = "-";
  } else if (parkingOne.checked) {
    parkingNumber = "1";
  } else if (parkingTwo.checked) {
    parkingNumber = "2";
  } else if (parkingThree.checked) {
    parkingNumber = "3";
  } else if (parkingFour.checked) {
    parkingNumber = "4";
  } else if (parkingFive.checked) {
    parkingNumber = "5+";
  } else {
    parkingClicked = false;
  }

  let bathroomClicked = true;
  let bathroomNumber = "-";
  if (bathroom.checked) {
    bathroomNumber = "-";
  } else if (oneBathroom.checked) {
    bathroomNumber = "1";
  } else if (twoBathroom.checked) {
    bathroomNumber = "2";
  } else if (threeBathroom.checked) {
    bathroomNumber = "3";
  } else if (fourBathroom.checked) {
    bathroomNumber = "4";
  } else if (fiveBathroom.checked) {
    bathroomNumber = "5+";
  } else {
    bathroomClicked = false;
  }

  if (
    propertyTitle.value !== "" &&
    city.value !== "" &&
    district.value !== "" &&
    zipCode.value !== "" &&
    streetAddress.value !== "" &&
    imgDataLs !== undefined &&
    description.value !== "" &&
    enterPrice.value !== "" &&
    firstName.value !== "" &&
    lastName.value !== "" &&
    email.value !== "" &&
    number.value !== "" &&
    nameCompany.value !== "" &&
    bedroomClicked == true &&
    bathroomClicked == true &&
    parkingClicked == true
  ) {
    console.log("complete");
    let privateCompany = "private";
    if (companySeller.checked) {
      privateCompany = "company";
    }
    let existingAmenities = [];
    let amenities = [
      wifi,
      air,
      balcony,
      garage,
      gym,
      parkingCheck,
      pool,
      tv,
      heating,
      dishwasher,
      kitchen,
      security,
    ];
    amenities.forEach((amenity) => {
      if (amenity.checked) {
        console.log(amenity);
        existingAmenities.push(amenity.nextElementSibling.textContent);
      }
    });

    getItemsFromStorage2().forEach((object) => {
      if (object.hasOwnProperty("actualId")) {
        getAdminId = object.actualId;
      }
    });

    let property = {
      title: propertyTitle.value,
      selectSell: selectSell.value,
      category: category.value,
      seller: privateCompany,
      country: selectCountry.value,
      city: city.value,
      district: district.value,
      zipCode: zipCode.value,
      streetAddress: streetAddress.value,
      area: area.value,
      description: description.value,
      enterPrice: enterPrice.value,
      currency: currency.value,
      priceTime: priceTime.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      number: number.value,
      nameCompany: nameCompany.value,
      bedroom: bedroomNumber,
      bathroom: bathroomNumber,
      parking: parkingNumber,
      amenities: existingAmenities,
      image: imgArray,
      adminId: getAdminId,
      id: lastId + 1,
    };
    lastId++;
    let userArrayLs = getItemsFromStorage2();
    let isExist = false;
    userArrayLs.forEach((object) => {
      if (object.hasOwnProperty("clickedPropertyId")) {
        object.clickedPropertyId = lastId;
        isExist = true;
        localStorage.setItem("user", JSON.stringify(userArrayLs));
      }
    });
    if (isExist == false) {
      let objectProperty = {
        clickedPropertyId: lastId,
      };
      addItemsToStorage2(objectProperty);
    }

    locationn();
    addItemsToStorage(property);
    console.log(property);
  } else if (propertyTitle.value == "") {
    errorInfo.textContent = "Please enter title";
  } else if (city.value == "") {
    errorInfo.textContent = "Please enter city";
  } else if (district.value == "") {
    errorInfo.textContent = "Please enter district";
  } else if (zipCode.value == "") {
    errorInfo.textContent = "Please enter zip code";
  } else if (streetAddress.value == "") {
    errorInfo.textContent = "Please enter street address";
  } else if (description.value == "") {
    errorInfo.textContent = "Please enter description";
  } else if (enterPrice.value == "") {
    errorInfo.textContent = "Please enter price";
  } else if (imgDataLs == undefined) {
    errorInfo.textContent = "Please select an image";
  } else if (firstName.value == "") {
    errorInfo.textContent = "Please enter first name";
  } else if (lastName.value == "") {
    errorInfo.textContent = "Please enter last name";
  } else if (email.value == "") {
    errorInfo.textContent = "Please enter email";
  } else if (number.value == "") {
    errorInfo.textContent = "Please enter number";
  } else if (bedroomClicked == false) {
    errorInfo.textContent = "Please select bedroom ";
  } else if (bathroomClicked == false) {
    errorInfo.textContent = "Please select bathroom";
  } else if (parkingClicked == false) {
    errorInfo.textContent = "Please select parking";
  }
}
function locationn() {
  window.location.replace("./properties-catalog/single-product-file.html");
}

function addItemsToStorage(property) {
  let addItemsArray;
  if (localStorage.getItem("property") == null) {
    addItemsArray = [];
  } else {
    addItemsArray = JSON.parse(localStorage.getItem("property"));
  }
  addItemsArray.push(property);
  localStorage.setItem("property", JSON.stringify(addItemsArray));
  return addItemsArray;
}
function addItemsToStorage2(user) {
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
function getItemsFromStorage(property) {
  let addItemsArray;
  if (localStorage.getItem("property") == null) {
    addItemsArray = [];
  } else {
    addItemsArray = JSON.parse(localStorage.getItem("property"));
  }
  return addItemsArray;
}

getForm.addEventListener("submit", submitForm);

function getItemsFromStorage2(user) {
  let addItemsArray;
  if (localStorage.getItem("user") == null) {
    addItemsArray = [];
  } else {
    addItemsArray = JSON.parse(localStorage.getItem("user"));
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
          getSmallSignIn.style.display = "none";
          getSignIn.style.display = "none";
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
        }
      }
    });
  }
  if (isExist == false) {
    getProfile.style.display = "none";
    deactivateLinks();
  }
}

function deactivateLinks() {
  propSale.setAttribute("href", "./log-in/sign-in.html");
  personalInfo.setAttribute("href", "./log-in/sign-in.html");
  wishlist.setAttribute("href", "./log-in/sign-in.html");
  myProperties.setAttribute("href", "./log-in/sign-in.html");
  signOut.setAttribute("href", "./log-in/sign-in.html");

  propSale2.setAttribute("href", "./log-in/sign-in.html");
  propRent2.setAttribute("href", "./log-in/sign-in.html");
  personalInfo2.setAttribute("href", "./log-in/sign-in.html");
  wishlist2.setAttribute("href", "./log-in/sign-in.html");
  myProperties2.setAttribute("href", "./log-in/sign-in.html");
  signOut2.setAttribute("href", "./log-in/sign-in.html");
}
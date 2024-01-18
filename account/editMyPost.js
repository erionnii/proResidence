let getSignIn = document.getElementById("signInButtonHeader");
let isExist = false;
let getProfile = document.getElementById("profileButtonHeader");
let getProfilePhoto = document.getElementById("profileImageHeader");
let getSmallSignIn = document.getElementById("signInButtonSmall");
let getForm = document.getElementById("addPropertyForm");
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

let getContainerImg = document.getElementById("containerImg");

let enterPrice = document.getElementById("enter-price-add-property");
let currency = document.getElementById("priceCurrency");
let priceTime = document.getElementById("priceTime");
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
let imgArray = [];

signInProfileDisplay();
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
    let propertyLs = getItemsFromStorage();
    getItemsFromStorage2().forEach((object) => {
      if (object.hasOwnProperty("clickedPropertyId")) {
        propertyLs.forEach((property) => {
          if (property.id == object.clickedPropertyId) {
            property.title = propertyTitle.value;
            property.selectSell = selectSell.value;
            property.category = category.value;
            property.seller = privateCompany;
            property.country = selectCountry.value;
            property.city = city.value;
            property.district = district.value;
            property.zipCode = zipCode.value;
            property.streetAddress = streetAddress.value;
            property.area = area.value;
            property.description = description.value;
            property.enterPrice = enterPrice.value;
            property.currency = currency.value;
            property.priceTime = priceTime.value;
            property.firstName = firstName.value;
            property.lastName = lastName.value;
            property.email = email.value;
            property.number = number.value;
            property.nameCompany = nameCompany.value;
            property.bedroom = bedroomNumber;
            property.bathroom = bathroomNumber;
            property.parking = parkingNumber;
            property.amenities = existingAmenities;
            property.image = imgArray;
            property.adminId = getAdminId;
            property.id = property.id;
          }
        });
      }
    });
    localStorage.setItem("property", JSON.stringify(propertyLs));
    // addItemsToStorage(property)
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
getForm.addEventListener("submit", submitForm);
function setInputValue() {
  let propertyClicked;
  getItemsFromStorage2().forEach((user) => {
    if (user.hasOwnProperty("clickedPropertyId")) {
      propertyClicked = user.clickedPropertyId;
    }
  });
  getItemsFromStorage().forEach((property) => {
    if (property.id == propertyClicked) {
      propertyTitle.value = property.title;
      if (property.bedroom == "-") {
        bedroom.checked = true;
      } else if (property.bedroom == 1) {
        oneBedroom.checked = true;
      } else if (property.bedroom == 2) {
        twoBedroom.checked = true;
      } else if (property.bedroom == 3) {
        threeBedroom.checked = true;
      } else if (property.bedroom == 4) {
        fourBedroom.checked = true;
      } else if (property.bedroom == "5+") {
        fiveBedroom.checked = true;
      }

      if (property.bathroom == "-") {
        bathroom.checked = true;
      } else if (property.bathroom == 1) {
        oneBathroom.checked = true;
      } else if (property.bathroom == 2) {
        twoBathroom.checked = true;
      } else if (property.bathroom == 3) {
        threeBathroom.checked = true;
      } else if (property.bathroom == 4) {
        fourBathroom.checked = true;
      } else if (property.bathroom == "5+") {
        fiveBathroom.checked = true;
      }

      if (property.parking == "-") {
        parking.checked = true;
      } else if (property.parking == 1) {
        parkingOne.checked = true;
      } else if (property.parking == 2) {
        parkingTwo.checked = true;
      } else if (property.parking == 3) {
        parkingThree.checked = true;
      } else if (property.parking == 4) {
        parkingFour.checked = true;
      } else if (property.parking == "5+") {
        parkingFive.checked = true;
      }
      selectSell.value = property.selectSell;
      category.value = property.category;

      // companySeller.value = property.
      //     privateSeller.value = property.

      selectCountry.value = property.country;
      city.value = property.city;
      district.value = property.district;
      zipCode.value = property.zipCode;
      streetAddress.value = property.streetAddress;
      imgArray = property.image;
      area.value = property.area;
      property.image.forEach((photoData, index) => {
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

      description.value = property.description;
      enterPrice.value = property.enterPrice;
      currency.value = property.currency;
      priceTime.value = property.priceTime;

      firstName.value = property.firstName;
      lastName.value = property.lastName;
      email.value = property.email;
      number.value = property.number;
      nameCompany.value = property.nameCompany;
      amenities.forEach((amenity) => {
        property.amenities.forEach((lsAmen) => {
          if (amenity.nextElementSibling.textContent == lsAmen) {
            amenity.checked = true;
          }
        });
      });
    }
  });
}

let photo = document.getElementById("add-photo");

let firstName = document.getElementById("first-name-add-property");
let lastName = document.getElementById("last-name-add-property");
let email = document.getElementById("email-add-property");
let number = document.getElementById("number-add-property");
let nameCompany = document.getElementById("company-name-add-property");

function getItemsFromStorage(property) {
  let addItemsArray;
  if (localStorage.getItem("property") == null) {
    addItemsArray = [];
  } else {
    addItemsArray = JSON.parse(localStorage.getItem("property"));
  }
  return addItemsArray;
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
setInputValue();


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
function clickPhoto(e) {
  let cardId;
  console.log(e.target);
  if (e.target.className == "removePhotoDiv") {
    console.log(e.target.className);
    card = e.target.parentElement.parentElement.lastChild;
    imgArray.splice(imgArray.indexOf(card.src), 1);
    let array = getContainerImg.getElementsByClassName("myImage");
    Array.from(array).forEach((object) => {
      if (object.id.slice(3) == card.id.slice(3)) {
        object.parentElement.remove();
      }
    });
    console.log(imgArray, "1");
  } else if (e.target.className == "fa-solid fa-xmark") {
    console.log(e.target.parentElement.parentElement.lastChild.className);
    card = e.target.parentElement.parentElement.lastChild;
    imgArray.splice(imgArray.indexOf(card.src), 1);

    let array = getContainerImg.getElementsByClassName("myImage");
    Array.from(array).forEach((object) => {
      if (object.id.slice(3) == card.id.slice(3)) {
        object.parentElement.remove();
      }
    });
    console.log(imgArray, "1");
  }
}
getContainerImg.addEventListener("click", clickPhoto);
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
  console.log(imgArray, "2");
});
console.log(imgArray, "1");

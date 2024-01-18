let getSignIn = document.getElementById("signInButtonHeader");
let isExist = false;
let getPhotoHeader = document.getElementById("profileImageHeader");
let getProfile = document.getElementById("profileButtonHeader");
let getSmallSignIn = document.getElementById("signInButtonSmall");

let getMainName = document.getElementById("mainName");
let getMainNumber = document.getElementById("mainNumber");
let getMainEmail = document.getElementById("mainEmail");
let getProfilePhoto = document.getElementById("profilePhoto");

let getName2 = document.getElementById("secondaryName");
let getEmail2 = document.getElementById("secondaryEmail");
let getPhone2 = document.getElementById("secondaryPhone");
let getCompany2 = document.getElementById("secondaryCompany");
let getAddress2 = document.getElementById("secondaryAddress");

let getName3 = document.getElementById("secondaryNameInput");
let getEmail3 = document.getElementById("secondaryEmailInput");
let getPhone3 = document.getElementById("secondaryPhoneInput");
let getCompany3 = document.getElementById("secondaryCompanyInput");
let getAddress3 = document.getElementById("secondaryAddressInput");

let sigOut = document.getElementById("signOut");
redirect();
signInProfileDisplay();
function signOut() {
  let arrayLc = getItemsFromStorage();
  arrayLc.forEach((object) => {
    if (object.hasOwnProperty("actualId")) {
      object.actualId = -1;
    }
  });
  localStorage.setItem("user", JSON.stringify(arrayLc));
  signInLocation();
}

function redirect() {
  let isExist = false;
  getItemsFromStorage().forEach((user) => {
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
sigOut.addEventListener("click", signOut);

let userId;
let getName;
let getEmail;
let getNumber;
let getCompany;
let getImage;
let getAddress;

function getAllValues() {
  let getArrayLc = getItemsFromStorage();

  getArrayLc.forEach((user) => {
    if (user.hasOwnProperty("actualId")) {
      userId = user.actualId;
    }
  });
  getArrayLc.forEach((user) => {
    if (user.id == userId) {
      getName = user.name;
      getImage = user.img;
      getEmail = user.email;
      getNumber = user.phone;
      getCompany = user.company;
      getAddress = user.street;
    }
  });
  getProfilePhoto.src = getImage;
  getMainName.textContent = getName;
  getMainName.style.textTransform = "capitalize";
  getMainNumber.lastChild.textContent = getNumber;
  getMainEmail.textContent = getEmail;

  getName2.textContent = getName;
  getName2.style.textTransform = "capitalize";
  getEmail2.textContent = getEmail;
  getPhone2.textContent = getNumber;
  getAddress2.style.textTransform = "capitalize";
  getCompany2.textContent = getCompany;
  getAddress2.textContent = getAddress;

  getName3.value = getName;
  getName3.style.textTransform = "capitalize";
  getEmail3.value = getEmail;
  getPhone3.value = getNumber;
  getAddress3.style.textTransform = "capitalize";
  getCompany3.value = getCompany;
  getAddress3.value = getAddress;
}
getAllValues();

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
function getItemsFromStorage(user) {
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
              getPhotoHeader.src = user.img;
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

//edit

let saveChanges = document.getElementById("saveChanges");

function doChanges() {
  let arrLs = getItemsFromStorage();
  let signedInId;
  arrLs.forEach((user) => {
    if (user.hasOwnProperty("actualId")) {
      signedInId = user.actualId;
    }
  });
  arrLs.forEach((user) => {
    if (user.id == signedInId) {
      user.name = getName3.value;
      user.email = getEmail3.value;
      user.phone = getPhone3.value;
      user.company = getCompany3.value;
      user.street = getAddress3.value;
    }
  });
  localStorage.setItem("user", JSON.stringify(arrLs));
  getAllValues();
}
saveChanges.addEventListener("click", doChanges);

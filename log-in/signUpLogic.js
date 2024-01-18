let signUpForm = document.getElementById("signUpForm");
let getFullName = document.getElementById("full-name-sign-up");
let getEmailAddress = document.getElementById("sign-up-email");
let getPhoneNumber = document.getElementById("phoneNumberSignUp");
let getCompanyName = document.getElementById("companyNameSignUp");
let getStreetAddress = document.getElementById("addressSignUp");
let getPassword = document.getElementById("sign-up-password");
let getPasswordConfirmation = document.getElementById(
  "sign-up-confirm-password"
);
let idValue = 0;
let getErrorInfo = document.getElementById("errorInfo");
if (getItemsFromStorage().length > 0) {
  getItemsFromStorage().forEach((user) => {
    if (user.hasOwnProperty("id")) {
      idValue = user.id + 1;
    }
  });
}
console.log(idValue);

let imgValue;
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

let getProfilePhoto = document.getElementById("profilePhoto");
console.log(getProfilePhoto);
document.querySelector("#add-photo").addEventListener("change", async (e) => {
  const data = await getBase64(e.target.files[0]);
  imgValue = data;
  getProfilePhoto.src = data;
});
function submitForm(e) {
  e.preventDefault();
  let isExist = false;
  let getArrayLC = getItemsFromStorage();
  if (getArrayLC.length !== 0) {
    getArrayLC.forEach((user) => {
      if (user.email == getEmailAddress.value) {
        isExist = true;
      }
    });
  }
  if (
    getFullName.value !== "" &&
    imgValue !== undefined &&
    getEmailAddress.value !== "" &&
    getPassword.value.length > 7 &&
    getPassword.value == getPasswordConfirmation.value &&
    isExist == false
  ) {
    console.log("erion");
    getErrorInfo.textContent = "";
    console.log(isExist);
    let user = {
      name: getFullName.value,
      email: getEmailAddress.value,
      phone: getPhoneNumber.value,
      company: getCompanyName.value,
      street: getStreetAddress.value,
      img: imgValue,
      password: getPassword.value,
      id: idValue,
    };
    addItemsToStorage(user);
    idValue++;
    locationn();
  } else if (imgValue == undefined) {
    getErrorInfo.textContent = "Please select profile picture";
  } else if (getFullName.value == "") {
    console.log("hej");
    getErrorInfo.textContent = "Please enter your name";
  } else if (getEmailAddress.value == "") {
    getErrorInfo.textContent = "Please enter your email";
  } else if (getPassword.value == "") {
    getErrorInfo.textContent = "Please enter a password";
  } else if (getPassword.value.length < 8) {
    getErrorInfo.textContent = "Password must contain 8 characters";
  } else if (getPasswordConfirmation.value == "") {
    getErrorInfo.textContent = "Please confirm your password";
  } else if (getPassword.value !== getPasswordConfirmation.value) {
    getErrorInfo.textContent = "Incorrect password confirmation";
  } else if (isExist == true) {
    getErrorInfo.textContent = "Email already used";
  }
}

function locationn() {
  window.location.replace("./sign-in.html");
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
function getItemsFromStorage(user) {
  let addItemsArray;
  if (localStorage.getItem("user") == null) {
    addItemsArray = [];
  } else {
    addItemsArray = JSON.parse(localStorage.getItem("user"));
  }
  return addItemsArray;
}
signUpForm.addEventListener("submit", submitForm);

let signInForm = document.getElementById("logInForm");
let getPassword = document.getElementById("signInPassword");
let getEmailAddress = document.getElementById("signInEmail");
let getErrorInfo = document.getElementById("errorInfo");
console.log(signInForm);

function submitForm(e) {
  e.preventDefault();
  let checkIfExistActual = false;
  let getUserId;
  let canLogIn = false;
  let getArrayLC = getItemsFromStorage();
  if (
    getEmailAddress.value !== "" &&
    getPassword.value !== "" &&
    getArrayLC.length !== 0
  ) {
    getArrayLC.forEach((user) => {
      if (
        user.email == getEmailAddress.value &&
        user.password == getPassword.value
      ) {
        canLogIn = true;
        getUserId = user.id;
        console.log("sakt");
        let getLCArray = getItemsFromStorage();
        getLCArray.forEach((user) => {
          if (user.hasOwnProperty("actualId")) {
            checkIfExistActual = true;
            console.log(getUserId);
            user.actualId = getUserId;
            console.log(user.actualId);
            localStorage.setItem("user", JSON.stringify(getLCArray));
          }
        });
        if (checkIfExistActual == false) {
          let logedIn = {
            actualId: getUserId,
          };
          addItemsToStorage(logedIn);
        }
        locationn();
        getErrorInfo.textContent = "";
      }
      if (
        user.email !== getEmailAddress.value &&
        user.password !== getPassword.value2
      ) {
        getErrorInfo.textContent = "Incorrect email or password";
      }
    });
  } else if (getEmailAddress.value == "") {
    getErrorInfo.textContent = "Please enter your email";
    console.log("nita");
  } else if (getPassword.value == "") {
    getErrorInfo.textContent = "Please enter your password";
  } else if (
    getEmailAddress.value !== "" &&
    getPassword.value !== "" &&
    getArrayLC.length == 0
  ) {
    getErrorInfo.textContent = "Incorrect email or password";
  }

  // else if(getPassword.value !== getPasswordConfirmation.value){
  //     getErrorInfo.textContent ="Incorrect password confirmation"
  // }else if(isExist == true){
  //     getErrorInfo.textContent ="Email already used"
  // }
}

function locationn() {
  window.location.replace("../account/personal-info.html");
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
signInForm.addEventListener("submit", submitForm);

let getSignIn = document.getElementById("signInButtonHeader");
let isExist = false;
let getProfile = document.getElementById("profileButtonHeader");
let getSmallSignIn = document.getElementById("signInButtonSmall");
let propSaleAbout = document.getElementById("propSaleAbout");
let propRentAbout = document.getElementById("propRentAbout");
let personalInfoAbout = document.getElementById("personalInfoAbout");
let wishlistAbout = document.getElementById("wishlistAbout");
let myPropertiesAbout = document.getElementById("myPropertiesAbout");
let signOutAbout = document.getElementById("signOutAbout");
let propSaleAbout2 = document.getElementById("propSaleAbout2");
let propRentAbout2 = document.getElementById("propRentAbout2");
let personalInfoAbout2 = document.getElementById("personalInfoAbout2");
let wishlistAbout2 = document.getElementById("wishlistAbout2");
let myPropertiesAbout2 = document.getElementById("myPropertiesAbout2");
let getProfilePhoto = document.getElementById("profileImageHeader");
let signOutAbout2 = document.getElementById("signOutAbout2");
console.log(propSaleAbout);

signInProfileDisplay();

function deactivateLinks() {
  propSaleAbout.setAttribute("href", "../log-in/sign-in.html");
  propRentAbout.setAttribute("href", "../log-in/sign-in.html");
  personalInfoAbout.setAttribute("href", "../log-in/sign-in.html");
  wishlistAbout.setAttribute("href", "../log-in/sign-in.html");
  myPropertiesAbout.setAttribute("href", "../log-in/sign-in.html");
  signOutAbout.setAttribute("href", "../log-in/sign-in.html");

  propSaleAbout2.setAttribute("href", "../log-in/sign-in.html");
  propRentAbout2.setAttribute("href", "../log-in/sign-in.html");
  personalInfoAbout2.setAttribute("href", "../log-in/sign-in.html");
  wishlistAbout2.setAttribute("href", "../log-in/sign-in.html");
  myPropertiesAbout2.setAttribute("href", "../log-in/sign-in.html");
  signOutAbout2.setAttribute("href", "../log-in/sign-in.html");
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

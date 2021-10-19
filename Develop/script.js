// Assignment code here
//Setup the different varables to carry the characters
var special = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~'];
var lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
var passwordCharacters = [];
var mustHave = [];
var finalPassword = "";

var generateBtn = document.querySelector("#generate");
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function writePassword() {
  var password = userPrompt();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

function getRandom(array) {
  var randomIndex = Math.floor(Math.random()*array.length)
  var randomElement = array[randomIndex] 
  return randomElement;
}

var userPrompt = function() {
//prompt for length of the password - 8 - 128 characters
  var charLength = prompt("How many characters would you like in your new password. Length must be between 8 and 128 characters.");
  //Confirm user entered a number between 8 and 128
  if (charLength < 8 || charLength > 128 || isNaN(charLength)) {
    alert ("Password length must be 8-128 characters. Enter a number between 8 and 128 characters long");
    return;
  }
  
    //prompt: include lower case?
    var hasLowerCase = confirm("Should your password include Lower Case characters");
    localStorage.setItem("lowerCase", hasLowerCase)
    if(hasLowerCase) {
      //add to our master array
      passwordCharacters = passwordCharacters.concat(lowerCase);
      //select a lowercase letter to concat later
      mustHave.push(getRandom(lowerCase))//!note to self: read up on representing how to write the items in the parenthesis lowerCase "lowerCase" lowerCase[]
      console.log("mustHave has a lower case letter: " + mustHave);
      console.log("password characters have all the lower case letters: " + passwordCharacters);
    }

    //prompt: include upper case?
    var hasUpperCase = confirm("Should your password include Upper Case characters");
    if(hasUpperCase) {
      passwordCharacters = passwordCharacters.concat(upperCase);
      mustHave.push(getRandom(upperCase))
      console.log("Uppers");
      console.log(mustHave);
      console.log(passwordCharacters);
    }

    //prompt: include numbers?
    var hasNumbers = confirm("Should your password include Number characters");
    if(hasNumbers) {
      passwordCharacters = passwordCharacters.concat(numbers);
      mustHave.push(getRandom(numbers))
      console.log("Numbers");
      console.log(mustHave);
      console.log(passwordCharacters);
    }

    //prompt: include speical characters?
    var hasSpecial = confirm("Should your password include Special characters");
    if(hasSpecial) {
      passwordCharacters = passwordCharacters.concat(special);
      mustHave.push(getRandom(special))
      console.log("Special");
      console.log(mustHave);
      console.log(passwordCharacters);
    } 

    //create an if for user to say no to each of the character
    if(
      hasLowerCase == false &&
      hasUpperCase == false &&
      hasSpecial == false && 
      hasNumbers == false) {
      alert ("You must select a Special Character");
    return;
  }//this return has to stay within the last if statement

var newPassword =  buildPassword(charLength, mustHave, passwordCharacters)
//!Not relevant for this project, test sending and retrieving from localStorage
localStorage.setItem("finalPassword", newPassword)
var getLocalStorage = localStorage.getItem("finalPassword")
console.log(getLocalStorage);
//End local storage test
return newPassword;

}

//Combines all selected characters into one string
var buildPassword = function(length, mustHave, passwordCharacters){
  //takes in: lenght, mustHave, passwordCharacters
  console.log("User wants a password length: " + length + 
    "\nand include these characters: " + mustHave + 
    "\nrest of password made from these options: " + passwordCharacters);
    var concatPassword = [] 
    for ( i=0 ; i<length ; i++){
      var passwordIndex =  getRandom(passwordCharacters)
      console.log(passwordCharacters[passwordIndex]);
      concatPassword.push(passwordIndex)
    }
    for (i=0; i<mustHave.length; i++) {
      concatPassword[i] = mustHave[i]//!this is replacing each 1 character at time as it loops
    }

    console.log(concatPassword);
    return concatPassword.join("");//!turns an array into a string
}
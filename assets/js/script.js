// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);











function generatePassword() {
  // Prompt user for password specifics.
  const user = getUserInput();

  let password = '';
  // Iterate over user's character set preferences to populate their password.
  for(let i=0 ; i<user.numberOfCharacters-1 ; i++) {
    password += getRandomCharacterFromRandomCategory(user);
  }
  return password;
}

function getRandomCharacterFromRandomCategory(user) {
  const randomCategoryIndex = Math.floor(Math.random * user.selectedCategories.length);
  console.log(randomCategoryIndex)

  const randomCharacterIndex = Math.floor(Math.random * user.selectedCategories[randomCategoryIndex].length);
  console.log(randomCharacterIndex)

  const randomCharacter = user.selectedCategories[randomCategoryIndex][randomCharacterIndex];
console.log(randomCharacter)
}

function getUserInput() {
  let user = new User();
  user.numberOfCharacters = getNumberOfCharacters();

  // Loop over character sets in library and get user's preference.
  for (let characterSetName of Object.keys(libraryOfCharacters)) {
    const characterSetToAdd = askAboutThisCharacterSet(characterSetName);
    user.selectedCategories.push(characterSetToAdd);
  }
  return user;
}

function User() {
  this.numberOfCharacters = 0,
  this.selectedCategories = [];
}


function askAboutThisCharacterSet(characterSetName) {
  const question = libraryOfCharacters[characterSetName].question;
  const userResponse = prompt(question);
  // Check for 'y' only.
  if (userResponse.toLowerCase().split('')[0] === 'y') {
    // If the user wants to include the character set, return it.
    return libraryOfCharacters[characterSetName].characters;
  }
}


function getNumberOfCharacters() {
  const numberOfCharacters = prompt('Enter number of characters, 8 to 128');
  if (numberOfCharacters <= 8 || numberOfCharacters > 128) {
    alert('Number of characters must be 8 to 128');
    //getNumberOfCharacters(); // How to do validate?
  }
  return numberOfCharacters;
}

const libraryOfCharacters = {
  uppercaseCharacters: {
    question: 'Include uppercase characters?',
    characters: ['A', 'B', 'C']
  },
  lowercaseCharacters: {
    question: 'Include lowercase characters?',
    characters: ['a', 'b', 'c'],
  }
};





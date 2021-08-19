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










/////////////////////// MINE ////////////////////////////////////////////////
function generatePassword() {
  let password = '';
  // Prompt user for password specifics. 
  const userInput = getUserInput();
  // If null, must be invalid num chars so return ''.
  if (!userInput) {
    return password;
  }

  // Provide at least one character from each selected criteria.
  for (let selectedCriterium of userInput.selectedCriteria) {
    const randomCharacter = getRandomCharacter(selectedCriterium)
    password += randomCharacter;
  }

  // Fill in rest of pwd w/ random chars from criteria user picked.
  for (let i = password.length; i < userInput.numberOfCharacters; i++) {
    const randomCriteriaCharacters = getRandomCriteria(userInput);
    const randomCriteriaCharacter = getRandomCharacter(randomCriteriaCharacters);
    password += randomCriteriaCharacter;
  }
  return password;
}

// Display prompts to get user input.
function getUserInput() {
  const numberOfCharacters = getNumberOfCharacters();
  // If value is falsey then exit.
  if (!numberOfCharacters)
    return null;

  const userInput = { numberOfCharacters: numberOfCharacters };

  // Loop over character sets in library and get user's preference.
  for (let passwordCriterium of passwordCriteriaBetter) {
    const passwordCriteriumCharacters = askAboutThisCriteria(passwordCriterium);
    if (passwordCriteriumCharacters) {
      if (!userInput.selectedCriteria) { // Initialize array of selected characters.
        userInput.selectedCriteria = [];
      }
      userInput.selectedCriteria.push(passwordCriteriumCharacters);
    }
  }
  return userInput;
}

function getNumberOfCharacters() {
  const numberOfCharacters = prompt('Enter number of characters, 8 to 128');
  if (numberOfCharacters < 8 || numberOfCharacters > 128) {
    alert('Number of characters must be 8 to 128.');
    return null; /// don't need null actually.
  }
  return numberOfCharacters;
}

function askAboutThisCriteria(passwordCriterium) {
  const question = passwordCriterium.question;
  const userResponse = prompt(question);
  // Check for 'y' only.
  if (userResponse.toLowerCase().split('')[0] === 'y') {
    // If the user wants to include the character set, return it.
    return passwordCriterium.characters;
  }
}

// Utilities ...
function getRandomCriteria(userInput) {
  const randomIndex = getRandomIndex(userInput.selectedCriteria);
  return userInput.selectedCriteria[randomIndex];
}

function getRandomCharacter(criteriaCharacters) {
  const randomIndex = getRandomIndex(criteriaCharacters);
  return criteriaCharacters[randomIndex]
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

// Data about passworeds, etc in array of objects.   EXPAND THIS!!
const passwordCriteriaBetter = [
  {
    name: 'uppercaseCharacters',
    question: 'Include uppercase characters?',
    characters: ['A', 'B', 'C']
  },
  {
    name: 'lowercaseCharacters',
    question: 'Include lowercase characters?',
    characters: ['a', 'b', 'c'],
  },
];

// const passwordCriteria = { // Delete later and renmae _better?????????
//   uppercaseCharacters: {
//     // name: 'uppercaseCharacters',
//     question: 'Include uppercase characters?',
//     characters: ['A', 'B', 'C']
//   },
//   lowercaseCharacters: {
//     // name: 'lowercaseCharacters',
//     question: 'Include lowercase characters?',
//     characters: ['a', 'b', 'c'],
//   }
// };


function User() {
  this.numberOfCharacters = 0,
    this.selectedCriteria = []; // may not need this.
}




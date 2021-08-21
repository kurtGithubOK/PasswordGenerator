// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = passwordGenerator.generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);




// Homework Submission:
const passwordGenerator = {
  // Main function.
  generatePassword: function () {
    let password = '';
    // Prompt user for password specifics. 
    const userInput = this.getUserInput();

    // If null, must be invalid num chars or exiting, so return ''.
    if (!userInput) {
      return password;
    }

    // Provide at least one character from each selected criteria.
    password = this.fillMinimumCharacters(userInput);

    // // Fill in rest of pwd w/ random chars from criteria user picked.
    const qtyOfCharacters = userInput.numberOfCharacters - userInput.selectedCriteria.length;
    password += this.fillRemainingCharacters(userInput, qtyOfCharacters);

    return password;
  },

  // Provide at least one character from each selected criteria.
  fillMinimumCharacters: function (userInput) {
    let password = '';
    for (let selectedCriterium of userInput.selectedCriteria) {
      const myPasswordCriteria = this.passwordCriteria[selectedCriterium];
      const randomCharacter = this.getRandomCharacter(myPasswordCriteria.characters);
      password += randomCharacter;
    }
    return password;
  },

  // Fill in rest of pwd w/ random chars from criteria user picked.
  fillRemainingCharacters: function (userInput, qtyOfCharacters) {
    let password = '';
    // Loop over remaining chars in password.
    for (let i = 0; i < qtyOfCharacters; i++) {
      // Get random criteria.
      const randomCriteriaIndex = this.getRandomIndex(userInput.selectedCriteria)
      const randomCriteriumKey = userInput.selectedCriteria[randomCriteriaIndex];
      const randomCriterium = this.passwordCriteria[randomCriteriumKey];
      // Get a character from that criteria.
      const randomCharacter = this.getRandomCharacter(randomCriterium.characters);
      password += randomCharacter;
    }
    return password;
  },

  // Get input from user.
  getUserInput: function () {
    const numberOfCharacters = this.getNumberOfCharacters();
    // If value is falsey then exit.
    if (!numberOfCharacters)
      return null;

    let userInput = { numberOfCharacters: numberOfCharacters };

    // Loop over password criteria and get user's preference.
    for (let passwordCriteriumKey of Object.keys(this.passwordCriteria)) {
      const userResponse = this.askAboutThisCriteria(passwordCriteriumKey);
      if (!userResponse) return;
      if (userResponse === 'n') continue;
      // If yes, then put it in selectedCriteria.
      if (!userInput.selectedCriteria) { // Initialize array of selected characters for 1st time use.
        userInput.selectedCriteria = [];
      }
      userInput.selectedCriteria.push(passwordCriteriumKey);
    }
    return userInput;
  },

  // Prompt the user to enter number of characters.
  getNumberOfCharacters: function () {
    const numberOfCharacters = prompt('Enter number of characters, 8 to 128');
    // Handle user cancelling.
    if (!numberOfCharacters) return;

    if (numberOfCharacters < 8 || numberOfCharacters > 128) {
      alert('Number of characters must be 8 to 128.');
      return;
    }
    return numberOfCharacters;
  },

  // Prompt the user to specify which password criteria to use.
  askAboutThisCriteria: function (passwordCriteriumKey) {
    const question = this.passwordCriteria[passwordCriteriumKey].question;
    const userResponse = prompt(question);

    // Handle user cancelling.
    if (!userResponse) return;

    const response1stChar = userResponse.toLowerCase().split('')[0];
    if (response1stChar === 'n') return 'n';

    // Must be a yes.
    return true;
  },

  // Utility methods for getting random values.
  getRandomCriteria: function (userInput) {
    const randomIndex = this.getRandomIndex(userInput.selectedCriteria);
    return userInput.selectedCriteria[randomIndex];
  },

  getRandomCharacter: function (criteriaCharacters) {
    const randomIndex = this.getRandomIndex(criteriaCharacters);
    return criteriaCharacters[randomIndex]
  },

  getRandomIndex: function (array) {
    return Math.floor(Math.random() * array.length);
  },

  // Keep data related to password criteria here.
  passwordCriteria: {
    uppercaseCharacters: {
      question: 'Include uppercase characters?',
      characters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    },
    lowercaseCharacters: {
      question: 'Include lowercase characters?',
      characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    },
    specialCharacters: {
      question: 'Include special characters?',
      characters: [' ', '!', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~']
    },
    numeric: {
      question: 'Include numeric values?',
      characters: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    }
  }
};


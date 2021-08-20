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


const passwordGenerator = {
  // Main function.
   generatePassword: function() {
    let password = '';
    // Prompt user for password specifics. 
    const userInput = this.getUserInput();
    // If null, must be invalid num chars so return ''.
    if (!userInput) {
      return password;
    }
  
    // Provide at least one character from each selected criteria.
    for (let selectedCriterium of userInput.selectedCriteria) {
      const randomCharacter = this.getRandomCharacter(selectedCriterium)
      password += randomCharacter;
    }
  
    // Fill in rest of pwd w/ random chars from criteria user picked.
    for (let i = password.length; i < userInput.numberOfCharacters; i++) {
      const randomCriteriaCharacters = this.getRandomCriteria(userInput);
      const randomCriteriaCharacter = this.getRandomCharacter(randomCriteriaCharacters);
      password += randomCriteriaCharacter;
    }
    return password;
  },

  // Get input from user.
  getUserInput: function () {
    const numberOfCharacters = this.getNumberOfCharacters();
    // If value is falsey then exit.
    if (!numberOfCharacters)
      return null;

    const userInput = { numberOfCharacters: numberOfCharacters };

    // Loop over character sets in library and get user's preference.
    for (let passwordCriterium of this.passwordCriteria) {
      const passwordCriteriumCharacters = this.askAboutThisCriteria(passwordCriterium);
      if (passwordCriteriumCharacters) {
        if (!userInput.selectedCriteria) { // Initialize array of selected characters for 1st time use.
          userInput.selectedCriteria = [];
        }
        userInput.selectedCriteria.push(passwordCriteriumCharacters);
      }
    }
    return userInput;
  },

  // Prompt the user to enter number of characters.
  getNumberOfCharacters: function () {
    const numberOfCharacters = prompt('Enter number of characters, 8 to 128');
    if (numberOfCharacters < 8 || numberOfCharacters > 128) {
      alert('Number of characters must be 8 to 128.');
      return;
    }
    return numberOfCharacters;
  },

  // Prompt the user to specify which password criteria to use.
  askAboutThisCriteria: function (passwordCriterium) {
    const question = passwordCriterium.question;
    const userResponse = prompt(question);
    // Check for 'y' only.  Everything else is a no.
    if (userResponse.toLowerCase().split('')[0] === 'y') {
      // If the user wants to include the character set, return it.
      return passwordCriterium.characters;
    }
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
  passwordCriteria: [
    {
      name: 'uppercaseCharacters',
      question: 'Include uppercase characters?',
      characters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    },
    {
      name: 'lowercaseCharacters',
      question: 'Include lowercase characters?',
      characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    },
    {
      name: 'specialCharacters',
      question: 'Include special characters?',
      characters: [' ', '!', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~']
    },
    {
      name: 'numeric',
      question: 'Include numeric values?',
      characters: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    }
  ]
};


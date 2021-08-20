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
    // password += this.fillMinimumCharacters(userInput);

    // // Fill in rest of pwd w/ random chars from criteria user picked.
    // password = this.fillRemainingCharacters(userInput, password);

    return password;
  },

  // Provide at least one character from each selected criteria.
  fillMinimumCharacters: function (userInput) {
    let password = '';
    for (let selectedCriteria of userInput.selectedCriteria) {
      const myPasswordCriteria = this.passwordCriteria.find((elem) => elem.name === selectedCriteria);
      const randomCharacter = this.getRandomCharacter(myPasswordCriteria.characters)
      password += randomCharacter;
    }
    return password;
  },

  // Fill in rest of pwd w/ random chars from criteria user picked.
  fillRemainingCharacters: function (userInput, password) {
    // Loop over remaining chars in password.
    for (let i = password.length; i < userInput.numberOfCharacters; i++) {
      console.log('i', i)
      // Get random criteria from userInput.
      const randomCriteriaIndex = this.getRandomIndex(userInput.selectedCriteria)
      console.log('randomCriteriaIndex', randomCriteriaIndex)

      // Get list of characters from that criteria.
      const myPasswordCriteria = this.passwordCriteria.find((elem) => elem.name === userInput.selectedCriteria[randomCriteriaIndex].name);
      console.log('criteriaCharacters', myPasswordCriteria.characters)

      // Get random index of those characters.
      const randomCharacterIndex = this.getRandomIndex(myPasswordCriteria.characters);
      console.log('randomCharacterIndex', randomCharacterIndex)

      // Get random character.
      const randomCharacter = criteriaCharacters[randomCharacterIndex];
      console.log('randomCharacter', randomCharacter)

      password += randomCharacter;
      console.log('password now:', password)
      console.log(''); console.log(''); console.log(''); console.log('');
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
//      console.log('passwordCriteriumKey: ', passwordCriteriumKey)
      const userResponse = this.askAboutThisCriteria(passwordCriteriumKey);
      console.log('userResponse', userResponse)


    }

    // for (let passwordCriterium of this.passwordCriteria) {
    //   const userResponse = this.askAboutThisCriteria(passwordCriterium);
    //   if (!userResponse) return;
    //   if (userResponse === 'n') continue;
    //   if (!userInput.selectedCriteria) { // Initialize array of selected characters for 1st time use.
    //     userInput.selectedCriteria = [];
    //   }
    //   userInput.selectedCriteria.push(userResponse);
    // }
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


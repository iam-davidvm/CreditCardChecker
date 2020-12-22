// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
// Convert a string to an array of numbers
const stringToArray = string => {
  let array = [];
  for (let i = 0; i < string.length; i++) {
    array.push(parseInt(string[i]));
  };
  return array;
};

// check if the credit card is valid based on Luhn
const validateCred = array => {
  // array to put new values into
  let validateArray = [];
  // a function for the reduce method
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  // iterate through array from left to right
  for (let i = array.length - 1; i >= 0; i--){
    let element = array[i];

    // Every other element has to be doubled which depends on the length of the array
    let everyOther = 'odd';
    if ((array.length - 1) % 2 === 0) {
      everyOther = 'even';
    }

    if (everyOther === 'odd' && i % 2 === 0) {
      element = element * 2;
    } else if (everyOther === 'even' && i % 2 !== 0){
      element = element * 2;
    }
    // if an element is greater then 9 we have to subtract 9
    if (element > 9) {
      element = element - 9;
    }
    // fill the new array
    validateArray.unshift(element);
  }
  let sumArray = validateArray.reduce(reducer);
  return sumArray % 10 === 0;
};

// Create an array of invalid credit cards
const findInvalidCards = array => {
  // Empty array for invalid cards
  let invalidCards = [];
  for (let i = 0; i < array.length; i++) {
    let check = validateCred(array[i]);
    // if card is false put it in the array
    if (!check){
      invalidCards.push(array[i]);
    }
  }
  return invalidCards;
};


const idInvalidCardCompanies = array => {
  let companies = [];
  let companiesID = [];
  for (let i = 0; i < array.length - 1; i++){
    let firstElement = array[i][0];
    if (companiesID.indexOf(array[i][0]) === -1){
      switch (firstElement) {
        case 3:
          companies.push('Amex (American Express');
          break;
        case 4:
          companies.push('Visa');
          break;
        case 5:
          companies.push('Mastercard');
          break;
        case 6:
          companies.push('Discover');
          break;
        default:
          console.log('Company not found');
      }
    }
    companiesID.push(firstElement);
  }
  return companies;
};

/*
// Test string to array
const stringCard = stringToArray('3530206993883003833');
console.log(validateCred(stringCard));
*/

const invalidCards = findInvalidCards(batch);
idInvalidCardCompanies(invalidCards);


"use strict";
//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region
// app is the function called to start the entire application
function app(people) {
  console.log(people);
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  console.log(searchType);
  //If no add prompt for "How would you like to search? Using eye color, gender or occupation?
  let searchResults;
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      // TODO: search by traits
      subSingleTrait(people);
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

function subSingleTrait(people) {
  let searchResults;
  let displayOption = promptFor(
    "How would you like to search? Using eye color, gender , occupation or multiple traits ?",
    autoValid
  );
  displayOption = displayOption.toLowerCase();
  console.log(displayOption);
  switch (displayOption) {
    case "eye color":
      searchResults = searchByEyeColor(people);
      displayPeople(searchResults);
      subSingleTrait(people);
      break;
    case "gender":
      searchResults = searchByGender(people);
      displayPeople(searchResults);
      subSingleTrait(people);
      break;
    case "occupation":
      searchResults = searchByOccupation(people);
      displayPeople(searchResults);
      subSingleTrait(people);
      break;
    case "multiple traits":
      subMultipleTrait(people);
      break;
    default:
      subSingleTrait(people);
      break;
  }
}

function subMultipleTrait(people) {
  let searchResults;
  let displayOption = promptFor(
    "How would you like to search? \n Type 1 for Occupation and Eye Color \n Type 2 for Occupation and Gender \n Type 3 Gender and Eye Color \n Type 4 for Gender, Eye Color and Occupation",
    autoValid
  );
  displayOption = displayOption.toLowerCase();
  switch (displayOption) {
    case "1":
      searchResults = searchByeyeColorANDoccupation(people);
      displayPeople(searchResults);
      subMultipleTrait(people);
      break;
    case "2":
      searchResults = searchByGenderANDoccupation(people);
      displayPeople(searchResults);
      subMultipleTrait(people);
      break;
    case "3":
      searchResults = searchByGenderANDeyeColor(people);
      displayPeople(searchResults);
      subMultipleTrait(people);
      break;
    case "4":
      searchResults = searchByeyeColorANDoccupationAndGender(people);
      displayPeople(searchResults);
      subMultipleTrait(people);
      break;
    default:
      subMultipleTrait(people);
      break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor(
    "Found " +
      person.firstName +
      " " +
      person.lastName +
      " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'",
    autoValid
  );

  switch (displayOption) {
    case "info":
      // TODO: get person's info
      displayPerson(person);
      mainMenu(person, people);
      break;
    case "family":
      // TODO: get person's family
      displayFamily(people, person);
      mainMenu(person, people);
      break;
    case "descendants":
      // TODO: get person's descendants
      diplayDescendants(people, person);
      mainMenu(person, people);
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  firstName = toSentenceCase(firstName);
  lastName = toSentenceCase(lastName);

  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.firstName === firstName &&
      potentialMatch.lastName === lastName
    ) {
      return true;
    } else {
      return false;
    }
  });
  // TODO: find the person single person object using the name they entered.
  return foundPerson[0];
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people) {
  let eyeColor = promptFor("What is the person's eye color?", customValidation);
  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.eyeColor === eyeColor) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByGender(people) {
  let gender = promptFor("What is the person's gender?", customValidation);
  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.gender === gender) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByOccupation(people) {
  let occupation = promptFor(
    "What is the person's occupation?",
    customValidation
  );
  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.occupation === occupation) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByGenderANDeyeColor(people) {
  let gender = promptFor("What is the person's gender?", customValidation);
  let eyeColor = promptFor("What is the person's eye color?", customValidation);
  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.gender === gender &&
      potentialMatch.eyeColor === eyeColor
    ) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByGenderANDoccupation(people) {
  let gender = promptFor("What is the person's gender?", customValidation);
  let occupation = promptFor(
    "What is the person's occupation?",
    customValidation
  );
  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.gender === gender &&
      potentialMatch.occupation === occupation
    ) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByeyeColorANDoccupation(people) {
  let eyeColor = promptFor("What is the person's eye color?", customValidation);
  let occupation = promptFor(
    "What is the person's occupation?",
    customValidation
  );
  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.eyeColor === eyeColor &&
      potentialMatch.occupation === occupation
    ) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByeyeColorANDoccupationAndGender(people) {
  let eyeColor = promptFor("What is the person's eye color?", customValidation);
  let occupation = promptFor(
    "What is the person's occupation?",
    customValidation
  );
  let gender = promptFor("What is the person's gender?", customValidation);
  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.eyeColor === eyeColor &&
      potentialMatch.occupation === occupation &&
      potentialMatch.gender === gender
    ) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

//TODO: add other trait filter functions here.

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region

// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + " " + person.lastName;
      })
      .join("\n")
  );
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.

  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "HEIGHT: " + person.height + "\n";
  personInfo += "WEIGHT: " + person.weight + "\n";
  personInfo += "EYE COLOR: " + person.eyeColor + "\n";
  personInfo += "OCCUPATION: " + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

function displayFamily(people, person) {
  let Spouse = "";
  let parents = "";
  let descendants = "";
  people.map(function (p) {
    if (p.id === person.currentSpouse) {
      let res = p.firstName + " " + p.lastName + "\n";
      Spouse += res;
    }
  });
  person.parents.map(function (parent) {
    people.map(function (p) {
      if (parent === p.id) {
        let res = p.firstName + " " + p.lastName + "\n";
        parents += res;
      }
    });
  });
  people.map(function (p) {
    p.parents.map(function (parent) {
      if (person.id === parent) {
        let res = p.firstName + " " + p.lastName + "\n";
        descendants += res;
      }
    });
  });
  alert(
    "Current Spouse: " +
      Spouse +
      "\n" +
      "Parents: " +
      parents +
      "\n \n" +
      "Descendants: " +
      "\n" +
      descendants
  );
}

function diplayDescendants(people, person) {
  let descendants = "=======Descendants======\n";
  people.map(function (p) {
    p.parents.map(function (parent) {
      if (person.id === parent) {
        let res = " Name: " + p.firstName + " " + p.lastName + "\n";
        descendants += res;
      }
    });
  });
  alert(descendants);
}

//#endregion

//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid) {
  let response = "no";
  let isValid = false;
  do {
    response = prompt(question).trim();
    isValid = valid(response);
    console.log(isValid, response);
  } while (response === "" || isValid === false);
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  } else {
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input) {
  if (
    input.toLowerCase() === "blue" ||
    input.toLowerCase() === "green" ||
    input.toLowerCase() === "black" ||
    input.toLowerCase() === "brown" ||
    input.toLowerCase() === "hazel" ||
    input.toLowerCase() === "male" ||
    input.toLowerCase() === "female" ||
    input.toLowerCase() === "programmer" ||
    input.toLowerCase() === "nurse" ||
    input.toLowerCase() === "landscaper" ||
    input.toLowerCase() === "assistant" ||
    input.toLowerCase() === "student" ||
    input.toLowerCase() === "architect" ||
    input.toLowerCase() === "doctor" ||
    input.toLowerCase() === "politician"
  ) {
    return true;
  } else {
    return false;
  }
}
function toSentenceCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

//#endregion

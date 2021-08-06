"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no': 
    let runSearchOpts = prompt("Please select an option to filter by; Type 1 for Eye Color, 2 for Occupation, or 3 for Gender.");
        if (runSearchOpts == "1"){
        let peopleByEyeColor = eyeColors(people)
        console.log(peopleByEyeColor)
        let afterEyeColorSearch = prompt("Would you like to further your search by; a. Occupation, or b. Gender? Please enter the letter that matches the criteria that you wish to search by.")
          if (afterEyeColorSearch == "a"){
            let occupationFilter = filterJobs(peopleByEyeColor);
            console.log(occupationFilter);
          }
          else if (afterEyeColorSearch == "b"){
            let genderIdentFilter = filterGender(peopleByEyeColor);
            console.log(genderIdentFilter);
          }
        }
        else if (runSearchOpts == "2"){
        let peopleByOccupations = filterJobs(people)
        console.log(peopleByOccupations);
        let afterJobSearch = prompt("Would you like to further your search by; a. Eye Color, or b. Gender? Please enter the letter that matches the criteria that you wish to search by.")
          if (afterJobSearch == "a"){
            let eyeColorFilter = eyeColors(peopleByOccupations);
            console.log(eyeColorFilter);
          }
          else if (afterJobSearch == "b"){
            let filterByGender = genderFilter(peopleByOccupations);
            console.log(filterByGender);
          }
        }
        else if (runSearchOpts == "3"){
        let peopleByGender = genderFilter(people)
        console.log(peopleByGender);
        let afterGenderSearch = prompt("Would you like to further your search by; a. Eye Color or b. Occupation? Please enter the letter that matches the criteria that you wish to search by.")
          if (afterGenderSearch == "a"){
            let eyeColorFilter = eyeColors(peopleByGender);
            console.log(eyeColorFilter);
          }
          else if (afterGenderSearch == "b"){
            let occupationFilter = genderFilter(peopleByGender);
            console.log(occupationFilter);
          }
        }
    default: alert("Please enter a valid option.")
    app(people); // restart app
    break;
  }

 function eyeColors(people){
  let eyes = prompt("Please enter an eye color to filter by.")
  let peopleByEyeColorArray = people.filter(function (person) {
    if (person.eyeColor === eyes){
      return true;
    } 
    else {
      return false;
    } 
  });
  return peopleByEyeColorArray;
}

 function filterJobs(people){
  let job = prompt("Please enter the occupation in which the person you are searching for works in.")
  let peopleByOccupationArray = people.filter(function (person) {
    if (person.occupation === job){
      return true;
    }
    else {
      return false;
    }
  });
  return peopleByOccupationArray;
}

  function genderFilter(people){
    let findGender = prompt("Please enter the gender associated with the person you are searching for.")
    let peopleByGenderArray = people.filter(function (person) {
      if (person.gender === findGender){
        return true;
      }
      else {
        return false;
      }
    });
     return peopleByGenderArray;
  }


  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
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
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){

}

//TODO: add other trait filter functions here.



//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
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
function promptFor(question, valid){
  let response;
  let isValid;
  do{
    response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}


//#endregion
#!/usr/bin/env node

'use strict';

const customers = require("./data/customers.json");
const lodown = require("lodown-zacharybergmann");




 
            // 1/2. Find number of men/women:  //
            
function getNumGender(arr, gender) {
    return lodown.filter(arr, function(person, index, persons){
        return person.gender === gender;
    }).length;
}

var numMales = getNumGender(customers, "male"); // 3

var numFemales = getNumGender(customers, "female"); // 4

var numTransgender = getNumGender(customers, "transgender"); // 1
           
           
           
           
           
 
        // 3. Find oldest and youngest customer age: //
        
function getOldestOrYoungest(arr, age) {
    if(age === "oldest"){
        return lodown.reduce(arr, function(agestSoFar, curVal, curIndex){
            return agestSoFar.age > curVal.age ? agestSoFar : curVal;
        });
    } else if(age === "youngest") {
        return lodown.reduce(arr, function(agestSoFar, curVal, curIndex){
            return agestSoFar.age < curVal.age ? agestSoFar : curVal;
        });
    } return undefined;
}

var oldestAge = getOldestOrYoungest(customers, "oldest"); //40

var youngestAge = getOldestOrYoungest(customers, "youngest"); //22





              // 4. Average Balance: //

const getAverageBalance = arr => 
    lodown.reduce(arr, (curAverage, curVal, curIndex) =>
        curAverage + curVal.balance.replace(/[$,]/g, "")/arr.length
    ,0).toLocaleString("en-US",{style: "currency", currency: "USD", maximumFractionDigits: 2, minimumFractionDigits: 2});

var averageBalance = getAverageBalance(customers); //"$2,240.26"





        // 5. How many customer names begin with some letter: //

const getNameBeginsWith = (arr, firstLetter) => 
    lodown.filter(arr, (person, index, persons) =>
        person.name.trim()[0].toLowerCase() === firstLetter.toLowerCase()
    ).length;

var numNameStartsWithS = getNameBeginsWith(customers, 's'); // 2





        // 6. How many customer's friends names begin with some letter: //

function getFriendNameBeginsWith(arr, customer, firstLetter) {
    var customerObj = lodown.filter(arr, function(person, index, persons){
            return person.name.toLowerCase() === customer.toLowerCase();
    });
    if(customerObj.length === 0) return "invalid customer name";
    return lodown.filter(customerObj[0].friends, function(friend, index, friends){
        return friend.name[0].toLowerCase() === firstLetter.toLowerCase();    
    }).length;
}


var numFriendsNameBeginsWithS = getFriendNameBeginsWith(customers, 'serena odonnell' ,'s'); // 2




        // 7. How many customers are friends of other customers: //
function getNumFriendCustomers(arr) {
    var customerNames = lodown.map(arr, function(customer, index, customers){
        return customer.name;        
    });
    
    var allFriendsNames2D = lodown.map(arr, function(customer, index, customers){
        return lodown.map(customer.friends, function(friend, index, friends) {
            return friend.name;
        });
    });
    
    var allFriends = lodown.reduce(allFriendsNames2D, function(rollResult, arrayOfPeople, arrays){
        return rollResult.concat(arrayOfPeople);
    });
    
    let output = [];
    lodown.each(customerNames, function(customer, index, customers){
        lodown.each(allFriends, function(friend, index, friends){
            if(customer === friend) output.push(customer);
        });
    });
    return lodown.unique(output).length;
}

var numberFriendlyCusts = getNumFriendCustomers(customers); // 4




        // 8. Find the 3 most common tags //
        
function getMostCommonTags(arr) {
    let fullTagsArray = [];
    lodown.each(arr, function(person, index, persons){
        lodown.each(person.tags, function(tag, tagInd, tags) {
            fullTagsArray.push(tag);
        });
    });
    var objOfTagsCount = lodown.reduce(fullTagsArray, function(rollResult, curVal){
        if(!rollResult[curVal]) rollResult[curVal] = 0;
        return rollResult[curVal] ? lodown.extend(rollResult, {[curVal]: rollResult[curVal] + 1}) : lodown.extend(rollResult,{[curVal]: 1});
    }, {});
    
    var holder;
    
    function getMostUsedTag(obj) {
        var theWord;
        lodown.each(obj, function(value, key, obj){
            if(theWord === undefined) theWord = key;
            theWord = obj[theWord] < value ? key : theWord });
        console.log(theWord);
        var mostCommonWordObj = {[theWord]: obj[theWord]};
        delete obj[theWord];
        theWord = mostCommonWordObj;
        holder = theWord;
    }
    getMostUsedTag(objOfTagsCount);
    var summer = holder;
    getMostUsedTag(objOfTagsCount);
    summer = lodown.extend(summer, holder);
    getMostUsedTag(objOfTagsCount);
    summer = lodown.extend(summer, holder);
    return summer;
}

var threeMostCommonTags = getMostCommonTags(customers);
        


        // 9. Create a gender summary //

function createGenderSummary(arr){
    return {
        male: getNumGender(arr, "male"),
        female: getNumGender(arr, "female"),
        transgender: getNumGender(arr, "transgender")
    };
}

var GenderSummary = createGenderSummary(customers); //{female: 4, male: 3, transgender: 1}

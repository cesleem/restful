database = "happiness-meter";
collection = "dailylevels";
numDocsToInsert = 90;
timelineToken = "SBLm6QquLtq7BXIBXZl18tj9jfxJaCGe";

schemaTemplate = {
  "timelineToken" : timelineToken,
  "date" : {
    "#RANDOM_DATE_DAYS_BACK" : [0,1] 
  },
  "hourly_levels" : {
    "#ARRAY_VALUES" : [0,1,2,3,4,5],
    "#ARRAY_LENGTH" : 24, 
  },
}

function generateDocument(schemaSpec) {
  var generatedDoc = {};

  for (var key in schemaSpec) {
    if (schemaSpec.hasOwnProperty(key)) {
      
      // embedded JSON object?
      if (typeof schemaSpec[key] == 'object') {
        generatedVal = getFieldValue(schemaSpec[key]);

        if (generatedVal != null) {
          generatedDoc[key] = generatedVal;  
        }
        
      }
      else {
        generatedDoc[key] = schemaSpec[key];
      }
    }
  }

  return generatedDoc;
}

// Add new opeartors here
function getFieldValue(subdoc) {
  
  // "#INSERT_PRECENT" : 50
  if (subdoc.hasOwnProperty('#INSERT_PERCENT')) {
    val = subdoc['#INSERT_PERCENT'];
    randomNum = Math.floor(Math.random()*100);
    if (randomNum >= val) {
      return null;
    }
  }

  // "#VALUE" : "Test value" 
  if (subdoc.hasOwnProperty('#VALUE')) {
    return subdoc['#VALUE'];
  }

  // "#RAND_INT" : [0, 100] 
  if (subdoc.hasOwnProperty('#RAND_INT')) {
    val = subdoc['#RAND_INT'];
    if (val instanceof Array) {
      return Math.floor((Math.random()*val[1])+val[0]);
    }
  }

  // "#RAND" : ["M", "F", "NA", 15] 
  if (subdoc.hasOwnProperty('#RAND')) {
    val = subdoc['#RAND'];
    if (val instanceof Array) {
      return val[Math.floor(Math.random()*val.length)];
    }
  }

  // "#OBJECTID" : 1 
  if (subdoc.hasOwnProperty('#OBJECTID')) {
    return new ObjectId();
  }

  // "#SUBDOCUMENT" : { "title" : "editor", "name" : "jason" } 
  if (subdoc.hasOwnProperty('#SUBDOCUMENT')) {
    return generateDocument(subdoc['#SUBDOCUMENT']);
  }

  // "#SUBDOCUMENT" : { "title" : "editor", "name" : "jason" } 
  if (subdoc.hasOwnProperty('#ARRAY_LENGTH')) {
    arrayLength = subdoc['#ARRAY_LENGTH'];
    if (arrayLength instanceof Array) {
      arrayLength = Math.floor((Math.random()*arrayLength[1])+arrayLength[0])
    }

    arrayValues = subdoc['#ARRAY_VALUES'];
    return constructArray(arrayValues, arrayLength);
  }

  // "#RANDOM_STRING" : 50
  if (subdoc.hasOwnProperty('#RANDOM_STRING')) {
    val = subdoc['#RANDOM_STRING'];
    return getRandomString(val);
  }

  // "#RANDOM_LOREM" : 100
  if (subdoc.hasOwnProperty('#RANDOM_LOREM')) {
    val = subdoc['#RANDOM_LOREM'];
    return getRandomLorem(val);
  }

  // "#RANDOM_DATE_DAYS_BACK" : [0,100]
  if (subdoc.hasOwnProperty('#RANDOM_DATE_DAYS_BACK')) {
    val = subdoc['#RANDOM_DATE_DAYS_BACK'];
    if (val instanceof Array) {
      daysBack = Math.floor((Math.random()*val[1])+val[0]);
      var d = new Date();
      d.setDate(d.getDate()-daysBack);
      return d;
    }
  }

  return subdoc;
}

function constructArray(possibleArrayValuesArr, numItems) {
  var returnValue = new Array();

  for (var i = 0; i<numItems; i++) {
    newValue = possibleArrayValuesArr[Math.floor(Math.random()*possibleArrayValuesArr.length)];

    if ((typeof newValue == 'object') && newValue.hasOwnProperty('#SUBDOCUMENT')){
      newValue = getFieldValue(newValue);
    }

    returnValue.push(newValue);
  }

  return returnValue;
}

function getRandomString(len){
    AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    returnValue = "";

    for(i = 0; i < len; i++ )
        returnValue += ( AB.charAt( Math.floor(Math.random()*AB.length) ) );
    
    return returnValue;
}

function getRandomLorem(len){
    lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    loremCounter = 0;
    var returnValue = "";

    for(i = 0; i < len; i++ ) {
      if (loremCounter == (lorem.length - 1)){
          loremCounter = 0;
      }

      returnValue += ( lorem.charAt( loremCounter++ ) );
    }
    
    return returnValue;
}

// Generate and insert documents
var dbRef = db.getSiblingDB(database);
for (var num_docs =0; num_docs < numDocsToInsert; num_docs++) {
  var doc = generateDocument(schemaTemplate);
  
  // set date
  var d = new Date();
  d.setDate(d.getDate()-num_docs);
  d.setHours(0,0,0,0)
  doc['date'] = d;

  dbRef.getCollection(collection).insert(doc);
  
}
print("Inserted: " + num_docs + " documents into " + database + "." + collection);



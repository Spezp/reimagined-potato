const db = require('./db');
const moment = require('moment');
const argv = require("process.argv");

function logPresidentsName (){
  const tableOne = process.argv[2];
  const terms = `%${process.argv[3]}%`;

  db.getPresidentsName(terms, tableOne, (rows) => {
    console.log(`You got ${rows.length} results!`);
    
    rows.forEach(function(row){
      let birthdate = moment(row.birthdate).format('MMMM Do YYYY');
      let firstName = row.first_name;
      let lastName = row.last_name;
      console.log(`${firstName} ${lastName} was born ${birthdate}.`);
    });
  });

}

logPresidentsName();


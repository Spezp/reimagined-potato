const { Client } = require("pg");
const settings = require("./settings");

function performQuery(query, terms, callback) {

  const client = new Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
  });

  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    client.query(query, [terms], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      
      callback(result.rows);
      
      client.end();
    });
  });
}



function getPresidentsName(terms, table, callback) {
  const query =
  `SELECT * 
     FROM ${table}
     WHERE LOWER(first_name) LIKE $1::text
       OR LOWER(last_name) LIKE $1::text 
     ORDER BY last_name`;


  performQuery(query, terms, callback);

}




exports.getPresidentsName = getPresidentsName;
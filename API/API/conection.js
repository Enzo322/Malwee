const mysql = require('mysql');

const con = () =>{
    return mysql.createConnection({
        host: "127.0.0.1",
        port : 3306,
        database : "enzo",
        user: "root",
        password: "root"
      });
}

  exports.connect = connect;
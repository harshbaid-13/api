import mysql from "mysql";


export const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'ANA@20mika',
    database:'blog',
});

//const q  ="ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ANA@20mika' ";

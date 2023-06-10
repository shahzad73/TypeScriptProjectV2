export = {
   type: 'mysql',
   host: "127.0.0.1",
   database: "templateproject",    // process.env.MYSQL_DATABASE
   username: "root",  
   password: "aaa",
   synchronize: false,
   debug: false,
   entities: ['src/entity/*.ts']
 };
 
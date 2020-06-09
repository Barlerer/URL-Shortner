/* istanbul ignore file */
let ent = []
if (process.env.NODE_ENV == 'test') {
    ent.push(__dirname + "/**/*.entity.ts")
}
else {
    ent.push(__dirname + "/**/*.entity.js")
}
    module.exports = {
    "name": "default",
     "type": "postgres",
     "host": "postgres",
     "port": 5432,
     "username": "postgres",
     "password": "postgres",
     "database": "postgres",
     "synchronize": true,
     "logging": false,
     "entities": ent,
     "migrations": [
        "dist/migration/**/*.js"
     ],
     "subscribers": [
        "dist/subscriber/**/*.js"
     ]
  }

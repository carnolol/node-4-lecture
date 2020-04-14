const express = require('express')
const massive = require('massive')
require('dotenv').config()
const authCtrl = require('./controllers/authController')
const app = express()
app.use(express.json())
const {SERVER_PORT, CONNECTION_STRING} = process.env

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    console.log('DB IS CONNECTED')
    app.set('db', db)
}).catch(err => console.log('error in db', err))


app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)

app.listen(SERVER_PORT, () => console.log(`DOCKED AT PORT ${SERVER_PORT}`))
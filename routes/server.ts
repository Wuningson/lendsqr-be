import express from 'express';

const app = express()

app.get('/', (req, res) => {

})

app.post('/wallet/register', (req, res) => {
    const body = req.body // username, email, password
    // Write user info to db
})

app.post('/wallet/login', (req, res) => {
    const body = req.body // get email and password

    res.send('token') // return the token
})

// wrap in auth middleware
app.post('/wallet/deposit', (req, res) => {
    const body = req.body // user, email, account

    // db query for user account details
    
    // deposit: db query (Implement idempotency)
})

app.post('/wallet/transfer', (req, res) => {
    // const isduplicate = duplicateChecker(req.body); // define duplicate checker later

    // process transfer here.
})

export default app
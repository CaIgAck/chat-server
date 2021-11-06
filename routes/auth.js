const user = require("../models/user")
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if(!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required")
        }
        const oldUser = await user.findOne({ email })
        if(oldUser) {
            return res.status(409).send("User Already Exist. Please Login")
        }
        let encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        await user.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        res.status(201).send({
            token: token
        })
    } catch (e) {
        console.log(e);
    }
})
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const userFormDB = await user.findOne({ email });

        if (userFormDB && (await bcrypt.compare(password, userFormDB.password))) {

            // Create token
            const token = jwt.sign(
                { user_id: userFormDB._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            // user
            res.status(200).send({
                token: token
            })
        }
    } catch (e) {
        console.log(e);
    }
})

module.exports = router
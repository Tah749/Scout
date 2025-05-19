import connect from "../../../lib/mongodb";
import Login from '../../schemas/loginSchema'
import User from "../../schemas/userSchema";
// Ensure there is a MongoDB connection available
connect()
import cookie from 'cookie';

var CryptoJS = require('crypto-js');

export default async function handleChange(req, res) {
const data = req.body

if(data.newUsername) {
    const update = { username: data.newUsername };

// Check database for a single row that matches the name provided
Login.findOneAndUpdate({username: data.username}, update,(err, login) => {
    if(login) {
        const toDecrypt = login.password
        var bytes = (CryptoJS.AES.decrypt(toDecrypt, process.env.ENCRYPTION_KEY));
        var decrypted = bytes.toString(CryptoJS.enc.Utf8)
        // Compare decrypted password from database to password provided
        if(decrypted !== data.password) {
            User.findOneAndUpdate({username: data.username}, update,(err, login) => {
                // Redirects to home page containing an error message
                res.setHeader('Set-Cookie', cookie.serialize('error', 'invalidPassword', {
                    maxAge: 10, // Cookie will last 10 seconds
                    path: '/' // Cookie will be available everywhere
                }
                ))
                res.redirect('/help')
            })
        } else {
            // Redirects to home page containing a query for the username and password
            res.setHeader('Set-Cookie', cookie.serialize('username', data.username, {
                maxAge: 60*60, // Cookie will last 1 hour
                path: '/' // Cookie will be available everywhere
            }
            ))
            res.redirect('/help')
        }
    } else {
        // Redirects to home page containing an error message
        res.setHeader('Set-Cookie', cookie.serialize('error', 'invalidUsername', {
            maxAge: 10, // Cookie will last 10 seconds
            path: '/' // Cookie will be available everywhere
        }
        ))
        res.redirect('/help')
    }
})
} else if(data.newPassword) {
    Login.findOne({username: data.username}, (err, login) => {
        if(login) {
            const toDecrypt = login.password
            var bytes = (CryptoJS.AES.decrypt(toDecrypt, process.env.ENCRYPTION_KEY));
            var decrypted = bytes.toString(CryptoJS.enc.Utf8)
            // Compare decrypted password from database to password provided
            if(decrypted == data.password) {
                // Encrypt new password
                var newEncryption = (CryptoJS.AES.encrypt(data.newPassword, process.env.ENCRYPTION_KEY).toString());
                const update = { password: newEncryption };
                // Enter new password into database
                Login.findOneAndUpdate({username: login.username}, update, (err, login) => {
                    if(login) {
                        // Redirects to home page containing a query for the username
                        res.setHeader('Set-Cookie', cookie.serialize('username', data.username, {
                            maxAge: 60*60, // Cookie will last 1 hour
                            path: '/' // Cookie will be available everywhere
                        }
                        ))
                    }
                })
            } else {
                // Redirects to home page containing an error message
                res.setHeader('Set-Cookie', cookie.serialize('error', 'invalidPassword', {
                    maxAge: 10, // Cookie will last 10 seconds
                    path: '/' // Cookie will be available everywhere
                }
                ))
                res.redirect('/help')
            }
        } else {
        // Redirects to home page containing an error message
        res.setHeader('Set-Cookie', cookie.serialize('error', 'invalidUsername', {
            maxAge: 10, // Cookie will last 10 seconds
            path: '/' // Cookie will be available everywhere
        }
        ))
        res.redirect('/help')
        }
    })
} else {
}
}











/*
// Check database for a single row that matches the name provided
League.findOne({invitationCode: data.code},(err, league) => {
    if(league) {

        if(league.players.indexOf(data.userID)) {
            // Redirects to home page containing a cookie displaying message
            res.setHeader('Set-Cookie', cookie.serialize('already_joined', league.leagueName, {
                maxAge: 10, // Cookie containing message will last 10 seconds
                path: '/' // Cookie will be available everywhere
                }
            ))
        } else {
            league.players.push(data.userID)
            league.save();
               
            // Redirects to home page containing a cookie displaying the name of the league joined
            res.setHeader('Set-Cookie', cookie.serialize('player_joined', league.leagueName, {
                maxAge: 10, // Cookie containing message will last 10 seconds
                path: '/' // Cookie will be available everywhere
            })
            )
        }
        res.redirect('/leagues')
    } else {
         // Redirects to home page containing a cookie featuring the not found code
         res.setHeader('Set-Cookie', cookie.serialize('league_not_found', data.code, {
            maxAge: 10, // Cookie containing message will last 10 seconds
            path: '/' // Cookie will be available everywhere
            })
        )
        res.redirect('/leagues')
    }
})
*/
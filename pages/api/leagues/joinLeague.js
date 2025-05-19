import connect from "../../../lib/mongodb";
import League from '../../schemas/leagueSchema'
// Ensure there is a MongoDB connection available
connect()
import cookie from 'cookie';

export default async function joinLeague(req, res) {
const data = req.body

// Check database for a single row that matches the name provided
League.findOne({invitationCode: data.code},(err, league) => {
    if(league) {

        if(league.players[data.userID]) {
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

}

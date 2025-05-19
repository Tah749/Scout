    // Most of the data created will be collected from the mongoDB databases
    
    export default class User {
        constructor(userID, username, password, team, leagues, captain, budget, substitutions, boostsCaptain, boostsTransfers) {
            // Associate the variables with the given attributes
            this.userID = userID;
            this.username = username;
            this.password = password;
            this.leagues = leagues;
            this.captain = captain;
            this.budget = budget;
            this.substitutions = substitutions;
            this.boostsCaptain = boostsCaptain;
            this.boostsTransfers = boostsTransfers;
            this.team = team;
        }
    }

    /*var team = [{ // This will be a template of the team that will be stored
        "keeper": null
    }, {
        "defenderA": null,
        "defenderB": null,
        "defenderC": null,
        "defenderD": null,
    }, {
    }, {
        "midfielderA": null,
        "midfielderB": null,
        "midfielderC": null,
        "midfielderD": null,
    }, {
    }, {
        "forwardA": null,
        "forwardB": null,
    }, {
        "substituteA": null,
        "substituteB": null,
        "substituteC": null,
        "substituteD": null,
    }, {
    }]*/
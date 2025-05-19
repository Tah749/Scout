import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const EditTeam = (props) => {

  const [showEdit, setShowEdit] = useState(false);

    return (
      <div>
          <button className="editTeamBtn" onClick={() => setShowEdit(true)}>Edit Team</button>
      {showEdit ? (
        <div className="teamModal">
              <div class="editTeamContent">
          <span className="closeModal" onClick={() => setShowEdit(false)}>&times;</span>
          <br/>
          <br/>
          <br/>
            <div className="playersModal">
              
                 <Link style={{ textDecoration: 'none', color: 'inherit' }} href={`/search/`}></Link><div className="playersRow">
                <p className="playerTitles">Player</p>
                <p className="playerTitles">Name</p>
                <p className="playerTitles">Points</p>
                </div>

                <h1 className="positionHeading">Goalkeeper</h1>
                 <Link style={{ textDecoration: 'none', color: 'inherit' }} href={`/search/swap?${props.team[0].keepers.keeper}?${props.userID}`}><div className="playersRow">
                <Image className="playerPicture" loader={() => `https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].keepers.keeper]}.png`} src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].keepers.keeper]}.png`} width={100} height={120}/>
                <p className="playerName">{props.points[props.team[0].keepers.keeper].name} - {props.points[props.team[0].keepers.keeper].points} points</p>
                </div></Link>

                <h1 className="positionHeading">Defenders</h1>
              
                <a style={{ textDecoration: 'none', color: 'inherit' }} href={`/search/swap?${props.team[0].defenders.defenderA}?${props.userID}`}><div className="playersRow">
                <Image className="playerPicture" loader={() => `https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].defenders.defenderA]}.png`} src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].defenders.defenderA]}.png`} width={100} height={120}/>        
                <p className="playerName">{props.points[props.team[0].defenders.defenderA].name} - {props.points[props.team[0].defenders.defenderA].points} points</p>
                </div></a>
                 <Link style={{ textDecoration: 'none', color: 'inherit' }} href={`/search/swap?${props.team[0].defenders.defenderB}?${props.userID}`}> <div className="playersRow">
                <Image className="playerPicture" loader={() => `https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].defenders.defenderB]}.png`} src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].defenders.defenderB]}.png`} width={100} height={120}/>
                <p className="playerName">{props.points[props.team[0].defenders.defenderB].name} - {props.points[props.team[0].defenders.defenderB].points} points</p>
                </div></Link>
                 <Link style={{ textDecoration: 'none', color: 'inherit' }} href={`/search/swap?${props.team[0].defenders.defenderC}?${props.userID}`}><div className="playersRow">
                <Image className="playerPicture" loader={() => `https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].defenders.defenderC]}.png`} src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].defenders.defenderC]}.png`} width={100} height={120}/>
                <p className="playerName">{props.points[props.team[0].defenders.defenderC].name} - {props.points[props.team[0].defenders.defenderC].points} points</p>
                </div></Link>
                 <Link style={{ textDecoration: 'none', color: 'inherit' }} href={`/search/swap?${props.team[0].defenders.defenderD}?${props.userID}`}><div className="playersRow">
                <Image className="playerPicture" loader={() => `https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].defenders.defenderD]}.png`} src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].defenders.defenderD]}.png`} width={100} height={120}/>
                <p className="playerName">{props.points[props.team[0].defenders.defenderD].name} - {props.points[props.team[0].defenders.defenderD].points} points</p>
                </div></Link>

                <h1 className="positionHeading">Midfielders</h1>

                 <Link style={{ textDecoration: 'none', color: 'inherit' }} href={`/search/swap?${props.team[0].midfielders.midfielderA}?${props.userID}`}><div className="playersRow">
                <Image className="playerPicture" loader={() => `https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].midfielders.midfielderA]}.png`} src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].midfielders.midfielderA]}.png`} width={100} height={120}/>
                <p className="playerName">{props.points[props.team[0].midfielders.midfielderA].name} - {props.points[props.team[0].midfielders.midfielderA].points} points</p>
                </div></Link>
                 <Link style={{ textDecoration: 'none', color: 'inherit' }} href={`/search/swap?${props.team[0].midfielders.midfielderB}?${props.userID}`}><div className="playersRow">
                <Image className="playerPicture" loader={() => `https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].midfielders.midfielderB]}.png`} src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].midfielders.midfielderB]}.png`} width={100} height={120}/>
                <p className="playerName">{props.points[props.team[0].midfielders.midfielderB].name} - {props.points[props.team[0].midfielders.midfielderB].points} points</p>
                </div></Link>
                 <Link style={{ textDecoration: 'none', color: 'inherit' }} href={`/search/swap?${props.team[0].midfielders.midfielderC}?${props.userID}`}><div className="playersRow">
                <Image className="playerPicture" loader={() => `https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].midfielders.midfielderC]}.png`} src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].midfielders.midfielderC]}.png`} width={100} height={120}/>
                <p className="playerName">{props.points[props.team[0].midfielders.midfielderC].name} - {props.points[props.team[0].midfielders.midfielderC].points} points</p>
                </div></Link>
                 <Link style={{ textDecoration: 'none', color: 'inherit' }} href={`/search/swap?${props.team[0].midfielders.midfielderD}?${props.userID}`}><div className="playersRow">
                <Image className="playerPicture" loader={() => `https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].midfielders.midfielderD]}.png`} src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].midfielders.midfielderD]}.png`} width={100} height={120}/>
                <p className="playerName">{props.points[props.team[0].midfielders.midfielderD].name} - {props.points[props.team[0].midfielders.midfielderD].points} points</p>
                </div></Link>

                <h1 className="positionHeading">Forwards</h1>
                 <Link style={{ textDecoration: 'none', color: 'inherit' }} href={`/search/swap?${props.team[0].forwards.forwardA}?${props.userID}`}><div className="playersRow">
                <Image className="playerPicture" loader={() => `https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].forwards.forwardA]}.png`} src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].forwards.forwardA]}.png`} width={100} height={120}/>
                <p className="playerName">{props.points[props.team[0].forwards.forwardA].name} - {props.points[props.team[0].forwards.forwardA].points} points</p>
                </div></Link>
                 <Link style={{ textDecoration: 'none', color: 'inherit' }} href={`/search/swap?${props.team[0].forwards.forwardB}?${props.userID}`}><div className="playersRow">
                <Image className="playerPicture" loader={() => `https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].forwards.forwardB]}.png`} src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.photo[props.team[0].forwards.forwardB]}.png`} width={100} height={120}/>
                <p className="playerName">{props.points[props.team[0].forwards.forwardB].name} - {props.points[props.team[0].forwards.forwardB].points} points</p>
                </div></Link>

            </div>
            </div>
        </div>


        ) : null}
        </div>
    )
  }
  

  export default EditTeam
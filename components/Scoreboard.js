
const Scoreboard = (data) => {
  let total = 0;
  // Loop through the points of each player and add them up
  for (const player in data.points) {
    total = total + data.points[player].points
  }
    return (
      <div className="scoreboard">
          {/* Username */}
          <h1 id=''>{data.user.username}</h1>
          {/* Points */}
          <h1 id=''>{total} points</h1>
          {/* Remaining Budget */}
          <h1 id=''>£{data.user.budget}M Remaining</h1>
          {/* Remaining Transfers */}
          <h1 id=''>{data.user.transfers}/5 Transfers Left</h1>
        </div>
    )
  }
  
  export default Scoreboard
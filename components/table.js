import React from "react";

const Table = ({ league, codes, onRowClick, ID  }) => {
  return (
    <table style={{ width: "50%", margin: "0 auto", borderCollapse: "collapse", fontSize: "32px" }}>
      <thead>
        <tr>
          <th style={{ padding: "10px", border: "1px solid #ddd", width: "70%" }}>Leagues</th>
          <th style={{ padding: "10px", border: "1px solid #ddd", width: "30%" }}>Invite Code</th>
        </tr>
      </thead>
      <tbody>
        {league.map((item, i) => (
          <tr key={i}>
            <td
            onClick={() => onRowClick(ID[i])}
            // Style
            style={{ textAlign: "center", cursor: "pointer", padding: "10px", border: "1px solid #ddd", width: "70%", "transition-duration": "0.2s" }}
            // Increase text size when hovering over row
            onMouseOver={(e) => (e.currentTarget.style.fontSize = "36px")}
            // Decrease text size after hovering over row
            onMouseOut={(e) => (e.currentTarget.style.fontSize = "32px")}
            >{item}</td>

            <td onClick={() => onRowClick(ID[i])}
            // Style
            style={{ textAlign: "center", cursor: "pointer", padding: "10px", border: "1px solid #ddd", width: "20%", "transition-duration": "0.2s" }}
            // Increase text size when hovering over row
            onMouseOver={(e) => (e.currentTarget.style.fontSize = "36px")}
            // Decrease text size after hovering over row
            onMouseOut={(e) => (e.currentTarget.style.fontSize = "32px")}
            >{codes[i]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
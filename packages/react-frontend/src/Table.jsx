import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Job</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  return (
    <tbody>
      {(props.characterData || []).map((row) => (
        <tr key={row._id || row.id || row.name}>
          <td>{row._id}</td>
          <td>{row.name}</td>
          <td>{row.job}</td>
          <td>
            <button onClick={() => props.removeCharacter(row._id)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody {...props} />
    </table>
  );
}

export default Table;

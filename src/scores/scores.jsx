import React from 'react';

export function Scores() {
  return (
    <main >
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <table className="table_spacing">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Jacob</td>
            <td>3884857</td>
            <td>01/03/25</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Isabelle</td>
            <td>2944222</td>
            <td>02/05/25</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Nate</td>
            <td>713432</td>
            <td>02/15/25</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
  
}
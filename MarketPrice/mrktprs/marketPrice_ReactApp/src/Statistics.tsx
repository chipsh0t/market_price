import React from "react";
import "./Statistics.css"
type props = {
  min: number;
  max: number;
  avarage: number;
  n: number
}
export default function Statistics(props: props) {

  return (


    <div className="statistics">
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">მინიმალური</th>
            <th scope="col">მაქსიმალური</th>
            <th scope="col">საშუალო</th>
            <th scope="col">რაოდენობა</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>{props.min}</td>
            <td>{props.max}</td>
            <td>{Math.round(props.avarage)}</td>
            <td> {props.n}</td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}


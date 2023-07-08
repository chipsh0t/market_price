import React from "react"
import "./Hdr.css"
export default function Hdr() {




  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">MarketPrice</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample07">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="../link1">link </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="../link2">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="../link3">link</a>
            </li>
          </ul>
          <form className="form-inline d-flex my-2 my-md-0">
            <button className="btn btn-outline-success sgn" onClick={() => { const dialog = document.querySelector(".signin"); dialog.showModal(); document.getElementById("app").style.filter = "blur(5px)" }} type="button">Sign-in</button>

          </form>
          <dialog className="signin">
            <form method="dialog">
              <div className="form-group">
                <label id="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label id="exampleInputPassword2">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
              </div>
              <div className="form-group ">
                <button className="btn btn-secondary" onClick={() => { const dialog = document.querySelector(".signin"); const register = document.querySelector(".register"); dialog.close(); register.showModal() }} type="">Register</button>
              </div>
              <button className="sbmt btn btn-primary" onClick={() => { const dialog = document.querySelector(".signin"); dialog.close(); document.getElementById("app").style.filter = "blur(0px)" }} type="submit">Submit</button>
            </form>

          </dialog>
          <dialog className="register">
            <form method="dialog">
              <div className="form-group">
                <label id="exampleInputEmail3">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email"></input>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label id="exampleInputPassword4">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password"></input>
              </div>
              <div className="form-group">
                <label id="exampleInputPassword5">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword3" placeholder="Password"></input>
              </div>
              <button className="sbmt btn btn-primary" onClick={() => { const dialog = document.querySelector(".register"); dialog.close(); document.getElementById("app").style.filter = "blur(0px)" }} type="submit">Submit</button>
            </form>

          </dialog>
        </div>
      </div>
    </nav>
  )
  // return (
  //   <div className="header">
  //     <div className="nav">
  //       <a>MarketPrise</a>
  //       <a>tab</a>
  //       <a>tab</a>
  //       <a>tab</a>
  //     </div>
  //     <div className="sign">
  //       <button>sign-in</button>
  //     </div>

  //   </div>
  // )

}

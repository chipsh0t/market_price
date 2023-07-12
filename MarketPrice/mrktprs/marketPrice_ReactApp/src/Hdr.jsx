import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Hdr.css"


function onlogout() {
  let id = sessionStorage.getItem("userid")
  axios.post("http://127.0.0.1:8000/logout", { "id": parseInt(id) })
    .then(res => {
      console.log(res.data)
      sessionStorage.removeItem("username")
      sessionStorage.removeItem("userid")
      window.location.reload()
    }).catch(err => { console.log(err) })

}
function onsignin(name, password) {


  axios.post("http://127.0.0.1:8000/login", {
    "username": name,
    "password": password
  })
    .then(res => {
      console.log(res.data.id)
      sessionStorage.setItem("username", name)
      sessionStorage.setItem("userid", res.data.id)
      window.location.reload()
    }).catch(err => { console.log(err) })

  const dialog = document.querySelector(".signin");
  //dialog.close(); 
  // document.getElementById("app").style.filter = "blur(0px)"


}
function onregister(name, password, confirmation) {
  console.log(name)
  console.log(password)
  console.log(confirmation)
  axios.post("http://127.0.0.1:8000/register", {
    "username": name,
    "password": password,
    "confirmation": confirmation
  })
    .then(res => {
      console.log(res.data)
      sessionStorage.setItem("username", name)

    }).catch(err => { console.log(err) })
  //const dialog = document.querySelector(".register"); 
  //dialog.close(); 
  //document.getElementById("app").style.filter = "blur(0px)"

}
function closereg(e) {
  if (e.target.id == "reg") {
    document.getElementById("reg").close();
    // document.getElementById("app").style.filter = "blur(0px)" 
  }

}
function closesignindialog(e) {
  if (e.target.id == "signindialog") {
    document.getElementById("signindialog").close();
    //document.getElementById("app").style.filter = "blur(0px)" 
  }

}

export default function Hdr() {
  const signinusername = useRef(null)
  const signinuserpassword = useRef(null)
  const registerusername = useRef(null)
  const registeruserpassword = useRef(null)
  const registeruserconfirmation = useRef(null)
  const [user, setUser] = useState(sessionStorage.getItem("username"))


  if (sessionStorage.getItem("username") != null) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            <i className="fa-solid fa-cart-shopping"></i>
            MarketPrice
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample07">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="../profile">პროფილი </a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="../link2">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="../link3">link</a>
              </li> */}
            </ul>
            <form className="form-inline d-flex my-2 my-md-0 " >
              {/* <h5 className="usernameh5">{sessionStorage.getItem("username")}</h5> */}
              <a href="../profile" style={{ textDecoration: 'none', color:'black' }} className="mx-5">{sessionStorage.getItem("username")}</a>
              <button className="btn btn-primary logout" onClick={() => { onlogout(); setUser(sessionStorage.getItem("username")) }} type="button">გასვლა</button>

            </form>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border border-bottom sticky-top">
      <div className="container">
        <a className="navbar-brand  " href="/">
          <i className="fa-solid fa-cart-shopping"></i>
          MarketPrice
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample07">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="../profile">პროფილი </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="../link2">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="../link3">link</a>
            </li>  */}
          </ul>
          <form className="form-inline d-flex my-2 my-md-0 " >
            <button className="btn btn-primary" onClick={() => { const dialog = document.querySelector(".signin"); dialog.showModal(); /*document.getElementById("app").style.filter = "blur(5px)" */ }} type="button">შესვლა</button>

          </form>
          <dialog className="signin" id="signindialog" onClick={(e) => { closesignindialog(e) }}>
            {/* <form method="dialog">
              <div className="form-group">
                <label id="username">User Name</label>
                <input type="name" className="form-control" ref={signinusername}  id="username" aria-describedby="username" placeholder="Enter user name"></input>
                
              </div>
              <div className="form-group">
                <label id="exampleInputPassword2">Password</label>
                <input type="password" className="form-control" ref={signinuserpassword} id="exampleInputPassword1" placeholder="Password"></input>
              </div>
              <div className="form-group ">
                <button className="btn btn-secondary" onClick={() => { const dialog = document.querySelector(".signin"); const register = document.querySelector(".register"); dialog.close(); register.showModal() }} type="">Register</button>
              </div>
              <button className="sbmt btn btn-primary" onClick={()=>{onsignin(signinusername.current.value, signinuserpassword.current.value); setUser(sessionStorage.getItem("username")) }} type="submit">Submit</button>
            </form> */}
            <h2 className="text-center mb-2"><i className="fa-solid fa-cart-shopping"></i>რეგისტრაცია</h2>
            <form method="dialog">
              <div className="input-group mb-3">
                <div className="input-group-text">
                  <i className="fa fa-user"></i>
                </div>
                <input id="registration-username-field" ref={registerusername} className="form-control" autoFocus type="text" name="username" placeholder="მომხმარებლის სახელი" autoComplete="off" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-text">
                  <i className="fa fa-lock"></i>
                </div>
                <input id="registration-password-field" ref={registeruserpassword} className="form-control" type="password" name="password" placeholder="პაროლი" autoComplete="off" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-text">
                  <i className="fa fa-lock"></i>
                </div>
                <input id="registration-confirmpass-field" ref={registeruserconfirmation} className="form-control" type="password" name="confirmation" placeholder="გაიმეორეთ პაროლი" autoComplete="off" />
              </div>
              <div className="text-center">
                <input id="register-button" onClick={()=>{onregister(registerusername.current.value, registeruserpassword.current.value,registeruserconfirmation.current.value)}} className="btn btn-primary" type="submit" value="რეგისტრაცია" />
              </div>
            </form>
            <div className="text-center my-5">
              უკვე გაქვთ ანგარიში ? <button className="btn btn-primary" onClick={() => { const dialog = document.querySelector(".signin"); const register = document.querySelector(".register"); dialog.close(); register.showModal() }}>
              <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>


          </dialog>
          <dialog className="register" id="reg" onClick={(e) => { closereg(e) }}>
            {/* <form method="dialog">
              <div className="form-group">
                <label >User Name</label>
                <input type="name" className="form-control" ref={registerusername} id="regusername" aria-describedby="username" placeholder="Enter user name"></input>

              </div>
              <div className="form-group">
                <label id="exampleInputPassword4">Password</label>
                <input type="password" className="form-control" ref={registeruserpassword} id="exampleInputPassword2" placeholder="Password"></input>
              </div>
              <div className="form-group">
                <label id="exampleInputPassword5">Password</label>
                <input type="password" className="form-control" ref={registeruserconfirmation} id="exampleInputPassword3" placeholder="Password"></input>
              </div>
              <button className="sbmt btn btn-primary" onClick={() => { onregister(registerusername.current.value, registeruserpassword.current.value, registeruserconfirmation.current.value) }} type="submit">Submit</button>
            </form> */}
            <h2 className="text-center mb-2"><i className="fa-solid fa-cart-shopping"></i>ავტორიზაცია</h2>
            <form method="dialog">
              <div className="input-group mb-3">
                <div className="input-group-text">
                  <i className="fa fa-user"></i>
                </div>
                <input id="login-username-field" ref={signinusername} className="form-control" autoFocus type="text" name="username"
                  placeholder="მომხმარებლის სახელი" autoComplete="off" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-text">
                  <i className="fa fa-lock"></i>
                </div>
                <input id="login-password-field" ref = {signinuserpassword} className="form-control" type="password" name="password" placeholder="პაროლი"
                  autoComplete="off" />
              </div>
              <div className="text-center">
                <input id="login-button" onClick={()=>{onsignin(signinusername.current.value, signinuserpassword.current.value); setUser(sessionStorage.getItem("username")) }} className="btn btn-primary" type="submit" value="ავტორიზაცია" />
              </div>
            </form>
          </dialog>
          <dialog id="succes">
            <p>success</p>
          </dialog>
          <dialog id="succes">
            <p>fail</p>
          </dialog>
        </div>
      </div>
    </nav>
  )
  return (
    <div className="header">
      <div className="nav">
        <a>MarketPrise</a>
        <a>tab</a>
        <a>tab</a>
        <a>tab</a>
      </div>
      <div className="sign">
        <button>sign-in</button>
      </div>

    </div>
  )

}



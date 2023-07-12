import React from "react"
import Hdr from "./hdr"
import Profile from "./Profile"
import "./ProfilePage.css"
export default function ProfilePage(){
        return(
            <div className="profilepage" >
                
                <Hdr></Hdr>
                
                <Profile></Profile>
            </div>
        )
}
"use client";

import { useState, useEffect } from "react";
import "./ContactUs.css";
import { Menu, X } from 'lucide-react'
import { useRouter } from "next/navigation";

export default function ContactUs(){
    
    const [userName, setUserName] = useState("");

    return(
        <div className="container">
            <h1>Pehnawa</h1>
            <div className="form">
                        <p className="form-head">Get early access</p>
                        <input type="text" placeholder="Name" />
                        <input type="text" placeholder="City" />
                        <input type="text" placeholder="Phone Number" />
                        <input type="email" placeholder="Email" />
                        <p className="form-tag">163+ have already joined the waitlist.</p>
                        <button className="form-submit">Join now</button>
                    </div>
        </div>
    )
}
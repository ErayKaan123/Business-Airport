'use client';

import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { Lobster } from "next/font/google";

const lobster = Lobster({ subsets: ["latin"], weight: "400" });

export default function Navigation() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkCookie = () => {
            const userId = getCookie('userId');
            setIsLoggedIn(!!userId); // Convert the userId to a boolean
        };

        // Initial check
        checkCookie();

        // Check every 5 seconds
        const intervalId = setInterval(checkCookie, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={{
            position: "fixed",
            width: "100%",
            height: "100px",
            backgroundColor: "#040404",
            color: "#fffff2",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "70px",
            zIndex: "100",
            boxShadow: "0 5px 25px #040404"
        }}>
            <a href="/">
                <img style={{ height: "70%", display: "inline", marginRight: "10px" }} src="Images/RPortIcon.svg" />
                <p style={{ fontSize: "100%", display: "inline", fontFamily: lobster.style.fontFamily, fontWeight: "400", textShadow: "0 0 25px #fffff2" }}>RPort</p>
            </a>
            <div className="flex flex-row items-center gap-5 mt-5 mr-5 sm:justify-end sm:mt-0 sm:ps-5">
                <a className="font-medium text-lg text-white" href="/" aria-current="page">Home</a>
                <a className="font-medium text-lg text-neutral-400 hover:text-white" href="/Tickets">Buy Tickets</a>
                <a className="font-medium text-lg text-neutral-400 hover:text-white" href="/Calendar">Calendar</a>
                <a className="font-medium text-lg text-neutral-400 hover:text-white" href="/Contact">Contact</a>
                {!isLoggedIn && (
                    <a className="font-medium text-lg text-neutral-400 hover:text-white" href="/Login">Login</a>
                )}
                {isLoggedIn && (
                    <p className="text-lg text-center">Logged in as: 115eraykaan32@gmail.com</p>
                )}
            </div>
        </div>
    );
}

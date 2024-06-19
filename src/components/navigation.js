import { Lobster } from "next/font/google";

const lobster = Lobster({ subsets: ["latin"], weight:"400" });

export default function Navigation() {
    return (
        <div style={{position: "fixed", width: "100%", height: "100px", backgroundColor: "#040404", color:"#fffff2", display: "flex", flexDirection:"row", alignItems:"center", fontSize:"70px", zIndex: "100"}}>
            <img style={{height: "70%", display:"inline", marginRight:"10px" }} src="Images/RPortIcon.svg"/><p style={{fontSize: "100%", display:"inline", fontFamily: lobster.style.fontFamily, fontWeight:"400" }}>RPort</p>
        </div>
    )
}
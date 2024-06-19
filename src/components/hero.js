const bg = "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.10) 47%, rgba(0,0,0,0.10) 100%)"
import { Lobster } from "next/font/google";

const lobster = Lobster({ subsets: ["latin"], weight:"400" });

export default function Hero() {
    return(
    <div style={{height: "100vh", overflow: "hidden"}}>
        <img style={{width: "100%" }} src="Cover10.png"/><div style={{position: "absolute", background: bg, width: "100%", height:"100%", top:0, display:"flex", alignItems: "center", justifyContent:"center"}}><p style={{display:"inline", fontFamily: lobster.style.fontFamily, fontWeight:"400", color:"#fffff2" }}>Echoes of Flight in the Winds of Dawn</p></div>
    </div>
    )
}
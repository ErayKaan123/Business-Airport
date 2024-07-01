import { Lobster } from "next/font/google";

const lobster = Lobster({ subsets: ["latin"], weight:"400" });

export default function Navigation() {
    return (
        <div style={{
            position: "fixed", 
            width: "100%", 
            height: "100px", 
            backgroundColor: "#040404", 
            color:"#fffff2", 
            display: "flex", 
            flexDirection:"row", 
            alignItems:"center",
            justifyContent: "space-between",
            fontSize:"70px", 
            zIndex: "100",
            boxShadow: "0 5px 25px #040404"}}>
                <div>
            <img style={{height: "70%", display:"inline", marginRight:"10px",  }} src="Images/RPortIcon.svg"/>
            <p style={{fontSize: "100%", display:"inline", fontFamily: lobster.style.fontFamily, fontWeight:"400", textShadow:"0 0 25px #fffff2" }}>RPort</p>
            </div>
            <div className="flex flex-row items-center gap-5 mt-5 mr-5 sm:justify-end sm:mt-0 sm:ps-5">
                    <a className="font-medium text-lg text-white" href="/" aria-current="page">Home</a>
                    <a className="font-medium text-lg text-neutral-400 hover:text-white" href="tickets">Buy Tickets</a>
                    <a className="font-medium text-lg text-neutral-400 hover:text-white " href="/Calendar">Calendar</a>
                    <a className="font-medium text-lg text-neutral-400 hover:text-white" href="contact">Contact</a>
            </div>
        </div>
    );
}

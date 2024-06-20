import { Lobster } from "next/font/google";

const lobster = Lobster({ subsets: ["latin"], weight:"400" });

export default function Navigation() {
    return (
        <div className="fixed flex w-full h-[100px] bg-[#040404] text-[#fffff2]" style={{ flexDirection: "row", alignItems: "center", zIndex: "100",  boxShadow: "0 5px 25px #040404" }}>
            <nav className="max-w-[100rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                <a className="flex-none text-xl font-semibold dark:text-white" href="#">
                    <img style={{ height: "70%", display: "inline", marginRight: "10px" }} src="Images/RPortIcon.svg" alt="RPort Icon" />
                    <p style={{ fontSize: "70px", display: "inline", fontFamily: "Lobster, cursive", fontWeight: "400", textShadow:"0 0 25px #fffff2" }}>RPort</p>
                </a>
                <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
                    <a className="font-medium text-lg text-white" href="#" aria-current="page">Home</a>
                    <a className="font-medium text-lg text-neutral-400 hover:text-white" href="#">Buy Tickets</a>
                    <a className="font-medium text-lg text-neutral-400 hover:text-white " href="#">Calendar</a>
                    <a className="font-medium text-lg text-neutral-400 hover:text-white" href="#">Contact</a>
                </div>
            </nav>
        </div>
    );
}

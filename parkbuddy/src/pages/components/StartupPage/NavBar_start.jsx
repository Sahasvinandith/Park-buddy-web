//Meh file eka Startup Page eken eliye hadanna one ekak App.js wage


import {useState,useEffect} from "react"
import Background from "./Background/Background";
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero/Hero";

const Navbar_start = () => {
    let heroData = [
        {text1:"Find the best",text2:"car parking spot"},
        {text1:"Find the best parking spot,",text2:"everytime without any hassle!"},
        {text1:"Park,Pay,",text2:"and Go."},
    ]

    const [heroCount,setHeroCount] = useState(0);
    const [playStatus,setPlayStatus] = useState(false);

    useEffect(() =>{
        setInterval(() => {
            setHeroCount((count) => {return count===2?0:count+1})
        },3000);
    },[])

    return (
        <div>
            <Background playStatus={playStatus} heroCount={heroCount}/>
            <Navbar/>
            <Hero
            setPlayStatus = {setPlayStatus}
            heroData={heroData[heroCount]}
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            playStatus={playStatus}
            />
        </div>
    )
}

export default Navbar_start; 



import React from 'react'; //changed
import './Hero.css'
import arrow from '../../Assets/arrow.png'
import play from '../../Assets/play.png'
import pause from '../../Assets/pause.png'
import { useNavigate } from 'react-router-dom';

const Hero = ({heroData,setHeroCount,heroCount,setPlayStatus,playStatus}) => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/login');
    };//changed 

    return(
        <div className = "hero">
            <div className="hero-text">
                <p>{heroData.text1}</p>
                <p>{heroData.text2}</p>
            </div>
            <div className="hero-explore" onClick={handleGetStartedClick}>
                <p>Get Started!</p>
                {/* Add the link to the login page */}
                <img src={arrow} alt=""/>

            </div>
            <div className="hero-dot-play">
                <ul className="hero-dots">
                    <li onClick={()=>setHeroCount(0)} className = {heroCount===0?"hero-dot orange":"hero-dot"}></li>
                    <li onClick={()=>setHeroCount(1)} className = {heroCount===1?"hero-dot orange":"hero-dot"}></li>
                    <li onClick={()=>setHeroCount(2)} className = {heroCount===2?"hero-dot orange":"hero-dot"}></li>
                </ul>

                <div className="hero-play">
                    <img onClick={()=> setPlayStatus(!playStatus)} src={playStatus?pause:play} alt=""/>
                    <p>See the video</p>

                </div>


            </div>
        </div>
    )
}

export default Hero
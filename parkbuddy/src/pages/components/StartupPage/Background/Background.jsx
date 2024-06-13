import './Background.css'
import CarVideo from '../../Assets/CarVideo.mp4'
import Carpark2 from '../../Assets/Carpark2.jpg'
import Carpark4 from '../../Assets/Carpark4.jpg'
import Carpark6 from '../../Assets/Carpark6.jpg'


const Background = ({playStatus,heroCount}) => {
    if(playStatus){
        return (
            <video className='background fade-in' autoPlay loop muted>
                <source src={CarVideo} type = 'video/mp4'/>
            </video>
        )
    }
    else if(heroCount===0)
    {
        return <img src={Carpark2} className='background fade-in' alt=""/>

    }
    else if(heroCount===1)
    {
        return <img src={Carpark4} className='background fade-in' alt=""/>
    
    }
    else if(heroCount===2)
    {
        return <img src={Carpark6} className='background fade-in' alt=""/> 
    }
}

export default Background 
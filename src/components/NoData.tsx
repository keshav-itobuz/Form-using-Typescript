import Lottie from 'lottie-react'
import animation from '../assets/animations/noData.json'

const NoData = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="max-w-[80vh] ">
                <Lottie animationData={animation} loop={true} />
            </div>
            <span className="text-[1.5rem] font-bold mt-10 text-[#2e5fb8] animate-bounce">
                NO DATA FOUND
            </span>
        </div>
    )
}

export default NoData

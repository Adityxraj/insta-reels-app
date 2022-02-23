import React, { useEffect } from 'react';
import v1 from'../Vid1/v1.mp4'
import v2 from'../Vid1/v2.mp4'
import v3 from'../Vid1/v3.mp4'

function Ioa() {
    const callback = (entries) => {
        entries.forEach((entry) => {
            let ele = entry.target.childNodes[0]
            console.log(ele)
            ele.play().then(() => {
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause()
                }
            })
        })
    }
    let observer = new IntersectionObserver(callback, {threshold: 0.6});
    useEffect(() => {
        const elements = document.querySelectorAll(".videos")
        elements.forEach((element) => {
            observer.observe(element)
        })

    }, [])
    
    return (
        <div className="video-containers">
            <div className='videos'>
                <video src={v1} muted="muted" style={{height: '80vh'}} />
            </div>
            <div className='videos'>
                <video src={v2} muted="muted" style={{height: '80vh'}} />
            </div>
            <div className='videos'>
                <video src={v3} muted="muted" style={{height: '80vh'}} />
            </div>
        </div>
    )
}

export default Ioa
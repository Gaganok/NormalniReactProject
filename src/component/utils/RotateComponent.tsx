import React from "react";
import { PropsWithChildren } from "react";

export interface RotateComponentProps {
    rotateDeg?: number
}
 
const RotateComponent: React.SFC<RotateComponentProps> = ({rotateDeg = 0.60, ...props}: PropsWithChildren<RotateComponentProps>) => {

    const rotateDivRef:React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

    function getCoords(clientX: number, clientY: number){
        const width: number = rotateDivRef.current!.offsetWidth;
        const height: number = rotateDivRef.current!.offsetHeight;
    
        const left: number = (width / 2) + rotateDivRef.current!.offsetLeft
        const top: number = (height / 2) + rotateDivRef.current!.offsetTop
    
        const x = ((clientX - left) * rotateDeg)
        const y = -((clientY - top) * rotateDeg)
        return {x, y}
    }

    return (
        <div ref={rotateDivRef} 
        onMouseMove={(event) => {
            const {x, y} = getCoords(event.clientX, event.clientY)
            event.currentTarget.style.transform = ` perspective(400px) rotateY(${x}deg) rotateX(${y}deg)`
        }}
        onMouseLeave={(event) => event.currentTarget.style.transform = `rotateY(0deg) rotateX(0deg)`}>
            {props.children}
        </div>
     );
}
 
export default RotateComponent;
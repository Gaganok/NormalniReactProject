import React from "react";
import BunkerCardComponent from "../../component/bunker/BunkerCardComponent";
import BunkerCard from "../../component/bunker/model/BunkerCard";

export interface BunkerProps {
    cards?: Array<BunkerCard>
}
 
const Bunker: React.SFC<BunkerProps> = ({cards} : BunkerProps) => {

    if(cards == null){
        cards = [
            new BunkerCard(),
            new BunkerCard("New Card", "Supa-Dupa Card")
        ]
    }
    
    console.log(cards)



    return ( 
        <div style={{display:'flex', justifyContent:'space-around'}}>
            {
                cards.map((card, index) => <BunkerCardComponent key={index} card={card}/>)
            }
        </div> 
    );
}
 
export default Bunker;
import React, { useEffect, useState } from "react";
import BunkerCard from "../../component/bunker/BunkerCard";
import BunkerCardModel from "../../component/bunker/model/BunkerCardModel";
import BunkerJobCardModel from "../../component/bunker/model/BunkerJobCardModel";
import BunkerUtils from "../../component/bunker/utils/BunkerUtils";
import BunkerBaggageCardModel from "../../component/bunker/model/BunkerBaggageCardModel";
import BunkerCardGenerator from "../../component/bunker/service/BunkerCardGenerator";

export interface BunkerProps {
    cards?: Array<BunkerCardModel>
}
 
const Bunker: React.SFC<BunkerProps> = ({cards} : BunkerProps) => {

    const [cardsArray, setCards] = useState(new Array<BunkerCardModel>())

    // if(cards == null){
    //     cards = [
    //         new BunkerJobCardModel(),
    //         new BunkerBaggageCardModel()
    //     ]
    // }

    useEffect(() => {
        BunkerCardGenerator.generate(setCards)
    }, [])   
    
    console.log(cardsArray)

    return ( 
        <div style={{display:'flex', justifyContent:'space-around', flexWrap: 'wrap', alignContent:'space-between'}}>
            {
                cardsArray && cardsArray.map((card, index) => <BunkerCard key={index} card={card} color={BunkerUtils.getColor(card.type)}/>)
            }
        </div> 
    );
}
 
export default Bunker;
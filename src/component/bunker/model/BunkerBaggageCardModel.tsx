import BunkerCardModel from "./BunkerCardModel"

class BunkerBaggageCardModel extends BunkerCardModel{    
    constructor(name = 'Baggage Card', description = 'Baggage Description'){
        super(name, description, 'baggage')
    }
}

export default BunkerBaggageCardModel


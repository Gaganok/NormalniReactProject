import BunkerCardModel from "./BunkerCardModel"

class BunkerHealthCardModel extends BunkerCardModel{    
    constructor(name = 'Health Card', description = 'Health Description'){
        super(name, description, 'health')
    }
}

export default BunkerHealthCardModel
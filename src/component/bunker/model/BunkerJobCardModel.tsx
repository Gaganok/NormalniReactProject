import BunkerCardModel from "./BunkerCardModel"

class BunkerJobCardModel extends BunkerCardModel{    
    constructor(name = 'Job Card', description = 'Job Description'){
        super(name, description, 'job')
    }
}

export default BunkerJobCardModel
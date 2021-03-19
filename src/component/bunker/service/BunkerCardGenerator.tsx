// import baggage from './baggage.txt'
import { Description } from '@material-ui/icons'
import BunkerBaggageCardModel from '../model/BunkerBaggageCardModel'
import BunkerCardModel from '../model/BunkerCardModel'
import baggage from './baggage.txt'
// import {readFileSync} from 'fs';

class BunkerCardGenerator{

    public static generate(hook: any){
        const output: Array<BunkerBaggageCardModel> = []

        fetch(baggage)
        .then((result) => result.text())
        .then(text  => {
          
          text.split('.').forEach(item  => {
              const [name, description] = item.split(' - ')
              output.push(new BunkerBaggageCardModel(name.trim(), description)) 
          })

          hook(output)
        })
    }
}

export default BunkerCardGenerator
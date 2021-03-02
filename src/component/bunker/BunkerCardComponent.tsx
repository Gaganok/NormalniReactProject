import { Card, Typography, CardContent, makeStyles } from "@material-ui/core";
import React from "react";
import BunkerCard from "./model/BunkerCard";
import '../../css/bunkerCard.scss'

export interface BunkerCardComponentProps {
    card: BunkerCard
}

const useStyles = makeStyles({
    root: {
      maxWidth: '200px',
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
      
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const BunkerCardComponent: React.SFC<BunkerCardComponentProps> = ({card} : BunkerCardComponentProps) => {
  const classes = useStyles();
  const boobReference:React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
  
  function getCoords(clientX: number, clientY: number){
    const rotateDeg = 0.25;
    const width: number = boobReference.current!.offsetWidth;
    const height: number = boobReference.current!.offsetHeight;

    const left: number = (width / 2) + boobReference.current!.offsetLeft
    const top: number = (height / 2) + boobReference.current!.offsetTop

    const x = ((clientX - left) * rotateDeg)
    const y = -((clientY - top) * rotateDeg)
    return {x, y}
  }

  return (
    <div ref={boobReference} 
        onMouseMove={(event) => {
            const {x, y} = getCoords(event.clientX, event.clientY)
            event.currentTarget.style.transform = ` perspective(400px) rotateY(${x}deg) rotateX(${y}deg)`
        }}
        onMouseLeave={(event) => event.currentTarget.style.transform = `rotateY(0deg) rotateX(0deg)`}
        >  
            <Card className={classes.root}>
                <CardContent>
                    <Typography
                    className={classes.title}
                    color='textPrimary'
                    gutterBottom
                    >
                    {card.name}
                    </Typography>
                    <Typography color='textSecondary'>
                        {card.description}
                    </Typography>
                </CardContent>
            </Card>
     </div>
  );
};

export default BunkerCardComponent;

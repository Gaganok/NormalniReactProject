import { Card, Typography, CardContent, makeStyles } from "@material-ui/core";
import React from "react";
import BunkerCardModel from "./model/BunkerCardModel";
import BunkerUtils from "./utils/BunkerUtils";
import '../../css/bunkerCard.scss'
import RotateComponent from "../utils/RotateComponent";

export interface BunkerCardProps {
    card: BunkerCardModel,
    color?: string
}

const BunkerCard: React.SFC<BunkerCardProps> = ({color = '#ffffff', card} : BunkerCardProps) => {

const shadedColor: string = BunkerUtils.shadeColorV2(color, -70)
console.log(`Original: ${color} Shaded: ${shadedColor}`)

const useStyles = makeStyles({
    root: {
        maxWidth: '200px',
        background: `linear-gradient(45deg, ${color} 30%, ${shadedColor} 90%)`,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

  const classes = useStyles();

  return (
    <RotateComponent rotateDeg={0.20}> 
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
    </RotateComponent>
  );
};

export default BunkerCard;

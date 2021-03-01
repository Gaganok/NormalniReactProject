import React from "react";
import {Button,Typography,} from "@material-ui/core";

type SliderProps = {
  title: string;
  caption: string;
  buttonText: string;
  isPreload: boolean;
  isLogin: boolean;
  slideClickCallback: () => void;
};

export default ({title = 'Title', caption = 'caption', buttonText = 'Button', ...props}: SliderProps) => {
    let slide_classes = ' container__content '
    if(props.isPreload){ 
      slide_classes = slide_classes.concat(' container__skew--right ')
    } else {
      const side: string = props.isLogin ? 'right' : 'left';
      slide_classes = slide_classes.concat(` container__skew--${side} left container__slide--${side} `);
    }
    
  return (
    <div className={slide_classes}>
      <Typography>{title}</Typography>
      <Typography>{caption}</Typography>
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={props.slideClickCallback}
      >
        {buttonText}
      </Button>
    </div>
  );
};

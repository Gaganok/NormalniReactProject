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
    let slide_classes = 'login_content '
    if(props.isPreload){ 
        slide_classes = slide_classes.concat(' right_skew ')
    } else {
        slide_classes = props.isLogin ? 
        
        slide_classes.concat(' slide_right left_skew '):
        slide_classes.concat(' slide_left right_skew ')
    }

    console.log(slide_classes)

  return (
    <div
      className={slide_classes}
    >
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

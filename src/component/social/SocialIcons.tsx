/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { NavLink } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import "../../css/style.scss";

export default () => {
  return (
    <ul className="socials">
      <li className="socials__item">
        <NavLink className="socials__link" to="#">
          <FacebookIcon
            className="socials__icon socials__icon--fb"
            fontSize="large"
          />
        </NavLink>
      </li>
      <li className="socials__item">
        <NavLink className="socials__link" to="#">
          <TwitterIcon
            className="socials__icon socials__icon--tw"
            fontSize="large"
          />
        </NavLink>
      </li>
      <li className="socials__item">
        <NavLink className="socials__link" to="#">
          <InstagramIcon
            className="socials__icon socials__icon--inst"
            fontSize="large"
          />
        </NavLink>
      </li>
    </ul>
  );
};

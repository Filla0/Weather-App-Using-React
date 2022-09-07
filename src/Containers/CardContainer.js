import { useContext } from "react";
import "./CardContainer.css";
import { ThemeContext } from "../Context/ThemeContext";

export default function CardContainer(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${props.className} card-container ${theme}-container`}>
      {props.children}
    </div>
  );
}

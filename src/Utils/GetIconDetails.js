function getIcon(id, apiIcon) {
  let icon;

  switch (id.toString()[0]) {
    case "2":
      icon = "ion:thunderstorm-outline";
      break;
    case "3":
      icon = "carbon:rain-drizzle";
      break;
    case "5":
      icon = "carbon:rain-heavy";
      break;
    case "6":
      icon = "bi:snow";
      break;
    case "7":
      icon = "mi:fog";
      break;

    default:
      icon = "ic:round-disabled-by-default";
      break;
  }

  if (id.toString()[0] === "8") {
    if (id === 800) {
      apiIcon[2] === "d" ? (icon = "grommet-icons:sun") : (icon = "bi:moon");
    } else if (id === 801) {
      apiIcon[2] === "d" ? (icon = "bi:cloud-sun") : (icon = "bi:cloud-moon");
    } else if (id === 802) {
      icon = "bi:cloud";
    } else {
      icon = "bi:clouds";
    }
  }

  return icon;
}

function getIconColor(id, apiIcon) {
  let iconColor;

  switch (id.toString()[0]) {
    case "2":
      iconColor = "rgb(160,160,160)";
      break;
    case "3":
      iconColor = "rgb(160,160,160)";
      break;
    case "5":
      iconColor = "rgb(160,160,160)";
      break;
    case "6":
      iconColor = "#A5C6F7";
      break;
    case "7":
      iconColor = "rgb(160,160,160)";
      break;

    default:
      iconColor = "#333";
      break;
  }

  if (id.toString()[0] === "8") {
    if (id === 800) {
      apiIcon[2] === "d"
        ? (iconColor = "#FDC500")
        : (iconColor = "rgb(160,160,160)");
    } else {
      iconColor = "rgb(160,160,160)";
    }
  }

  return iconColor;
}

export { getIcon, getIconColor };

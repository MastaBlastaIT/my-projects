export const clearButtonChange = button => {
  switch (button.style.display) {
    case "none":
      button.style.display = "inline";
      break;
    default:
      button.style.display = "none";
  }
};

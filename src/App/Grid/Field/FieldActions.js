export const fieldClicked = (x, y) => {
  return {
    type: "FIELD_CLICKED",
    payload: { x: x, y: y },
  };
};

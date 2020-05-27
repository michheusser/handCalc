export const fieldClicked = (x, y, active) => {
  return {
    type: "FIELD_CLICKED",
    payload: { x: x, y: y, active: active },
  };
};

export let toggleField = (x, y) => {
  return {
    type: "TOGGLE_FIELD",
    x: x,
    y: y,
  };
};

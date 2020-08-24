export const changeField = (x, y, isFilled) => {
  return {
    type: "CHANGE_FIELD",
    payload: { x: x, y: y, isFilled: isFilled },
  };
};

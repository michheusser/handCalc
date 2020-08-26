import Tool from "./Tool";

class Activator extends Tool {
  evaluate(inputList) {
    // list of input activators for the first layer
    return this.network
      .loadActivation(inputList, 0)
      .activate()
      .getActivation(this.network.layers.length - 1);
  }
}

export default Activator;

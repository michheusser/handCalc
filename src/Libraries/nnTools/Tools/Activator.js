import Tool from "./Tool";

class Activator extends Tool {
  // Contains the method to evaluate a neural network
  evaluate(inputList) {
    // Returns the output of a neural netork upon feedforwarding of a specific input vector
    return this.network
      .loadActivation(inputList, 0)
      .activate()
      .getActivation(this.network.layers.length - 1);
  }
}

export default Activator;

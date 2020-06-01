class NeuralNetworkTool {
  constructor() {
    this.network = null;
    this.name =
      this.__proto__.constructor.name.charAt(0).toLowerCase() +
      this.__proto__.constructor.name.substring(1);
  }
}

export default NeuralNetworkTool;

import NeuronLayerData from "./NeuronLayerData";

class NeuralNetworkData {
  constructor() {
    this.layerData = [];
  }
  loadDataArray(data) {
    this.layerData = new Array(data.inputWeights.length)
      .fill(null)
      .map((_, index) =>
        new NeuronLayerData().loadDataArray({
          inputWeights: data.inputWeights[index],
          bias: data.bias[index],
        })
      );
    return this;
  }
  getDataArray() {
    let inputWeights = [],
      bias = [];
    for (let i = 0; i < this.layerData.length; i++) {
      let layerData = this.layerData[i].getDataArray();
      inputWeights.push(layerData.inputWeights);
      bias.push(layerData.bias);
    }
    return { inputWeights: inputWeights, bias: bias };
  }
  [Symbol.iterator]() {
    // makes layers within the network iterable in for...of loops.
    let counter = 0;
    return {
      next: () => ({
        done: counter === this.layerData.length,
        value: this.layerData[counter++],
      }),
    }; // when done == true, value is not returned anymore
  }
}
export default NeuralNetworkData;

class NeuronData {
  constructor() {
    this.inputWeights = [];
    //this.bias = null; CHANGE!!!
    this.bias = [];
  }
  loadDataArray(data) {
    this.inputWeights = new Array(data.inputWeights.length)
      .fill(null)
      .map((_, index) => data.inputWeights[index]);
    this.bias = data.bias;
    return this;
  }
  getDataArray() {
    return { inputWeights: this.inputWeights, bias: this.bias };
  }
}
export default NeuronData;

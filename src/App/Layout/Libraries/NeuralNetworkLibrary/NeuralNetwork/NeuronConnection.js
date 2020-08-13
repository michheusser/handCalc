class NeuronConnection {
  constructor(backNeuron, frontNeuron, weight = null) {
    this.back = backNeuron;
    this.front = frontNeuron;
    this.weight = weight;
  }
}

export default NeuronConnection;

class NeuronConnection {
  constructor(backNeuron, frontNeuron, weight = 0) {
    this.back = backNeuron;
    this.front = frontNeuron;
    this.weight = weight;
  }
}

export default NeuronConnection;

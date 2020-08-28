/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

class NeuronConnection {
  // Contains the information of the connection between two neurons, including the input weight
  // from the back to the front neuron, and the reference to both connected neurons
  constructor(backNeuron, frontNeuron, weight = null) {
    this.back = backNeuron;
    this.front = frontNeuron;
    this.weight = weight;
  }
}

export default NeuronConnection;

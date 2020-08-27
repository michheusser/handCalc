/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

class NeuronConnection {
  constructor(backNeuron, frontNeuron, weight = null) {
    this.back = backNeuron;
    this.front = frontNeuron;
    this.weight = weight;
  }
}

export default NeuronConnection;

import Tool from "./Tool";
import NeuronLayer from "../NeuralNetwork/NeuronLayer";

class Builder extends Tool {
  // Decorator containing the methods to construct a neural netowrk using a build design pattern
  build(...layerSizes) {
    // Provides the main function and API to build new neural networks. This is the preferred
    // method of creating and initializing the neural network object. Since there are no
    // tools added here, it is recommended to use the generator
    return this._buildLayers(...layerSizes)._buildConnections();
  }
  _buildLayers(...layerSizes) {
    // Creates the layers within a neuron given the layer sizes
    for (let layerSize of layerSizes) {
      const newLayer = new NeuronLayer();
      newLayer.fill(layerSize);
      this.network.addLayer(newLayer);
    }
    return this;
  }
  _buildConnections() {
    // Creates the connection between all the adjacent layers
    if (this.network.layers.length <= 1) {
      console.log("Not enough layers to connect.");
      return this.network;
    }
    for (let i = 1; i < this.network.layers.length; i++) {
      this._connect(this.network.layers[i - 1], this.network.layers[i]);
    }
    return this.network;
  }
  _connect(backLayer, frontLayer) {
    // Connects all neurons between two layers
    for (let backNeuron of backLayer) {
      for (let frontNeuron of frontLayer) {
        frontNeuron.connectInput(backNeuron);
      }
    }
    return this.network;
  }
}
export default Builder;

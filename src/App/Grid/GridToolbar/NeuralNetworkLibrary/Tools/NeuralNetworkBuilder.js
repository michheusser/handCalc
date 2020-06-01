import NeuralNetworkTool from "./NeuralNetworkTool";
import NeuronLayer from "../NeuralNetwork/NeuronLayer";

class NeuralNetworkBuilder extends NeuralNetworkTool {
  connect(backLayer, frontLayer) {
    for (let backNeuron of backLayer) {
      for (let frontNeuron of frontLayer) {
        frontNeuron.connectInput(backNeuron);
      }
    }
    return this.network;
  }
  buildLayers(...layerSizes) {
    for (let layerSize of layerSizes) {
      let newLayer = new NeuronLayer();
      newLayer.fill(layerSize);
      this.network.addLayer(newLayer);
    }
    return this;
  }
  buildConnections() {
    if (this.network.layers.length <= 1) {
      console.log("Not enough layers to connect.");
      return this.network;
    }
    for (let i = 1; i < this.network.layers.length; i++) {
      this.connect(this.network.layers[i - 1], this.network.layers[i]);
    }
    return this.network;
  }
  build(...layerSizes) {
    return this.buildLayers(...layerSizes).buildConnections();
  }
}
export default NeuralNetworkBuilder;

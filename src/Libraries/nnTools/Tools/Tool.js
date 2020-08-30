class Tool {
  // Abstract class for tools that operate on a grid. Per default, it always keeps a
  //copy of the original grid.
  constructor() {
    this.network = null;
    this.name =
      this.__proto__.constructor.name.charAt(0).toLowerCase() +
      this.__proto__.constructor.name.substring(1);
  }
}

export default Tool;

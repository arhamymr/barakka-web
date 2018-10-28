import React, { Component } from 'react';
import { render } from 'react-dom';
import Konva from 'konva'
import { Stage, Layer, Rect, Transformer } from 'react-konva';

const Rect2 = () => (
  <Rect
    name="rectange2"
    x={60}
    y={120}
    width={100}
    height={100}
    fill="green"
    draggable
    onDragEnd={this.handleDrag}
  />
);

class TransformerComponent extends Component {

  componentDidMount() {
    this.checkNode();
  }
  componentDidUpdate() {
    this.checkNode();
  }
  checkNode() {
    const stage = this.transformer.getStage();
    const { selectedShapeName } = this.props;
    const selectedNode = stage.findOne('.' + selectedShapeName);
    if (selectedNode === this.transformer.node()) {
      return;
    }
    if (selectedNode) {
      this.transformer.attachTo(selectedNode);
    } else {
      this.transformer.detach();
    }
    this.transformer.getLayer().batchDraw();
  }
  render() {
    return (
      <Transformer
        ref={node => {
          this.transformer = node;
        }}
      />
    );
  }
}

export default class App extends Component {
  
  state = {
      selectedShapeName: '',
  }

  handleStageClick = e => {
    this.setState({
      selectedShapeName: e.target.name(),
      coordinatx: e.target.x(),
      coordinaty: e.target.y()
    });
  };

  handleDrag = e => {
    this.setState({
      coordinatx: e.target.x(),
      coordinaty: e.target.y()
    });
  }
  render() {
  console.log(this.state)


    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={this.handleStageClick}
      >
        <Layer>
          <Rect2 />
          <TransformerComponent
            selectedShapeName={this.state.selectedShapeName}
          />
        </Layer>
      </Stage>
    );
  }
}


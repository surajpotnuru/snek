import React from 'react';
import './App.css';
import SnekNode from './SnekNode';

const DEBUG = true
class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			nodeSize: 30,
			nodePos: {
				left: 0,
				top: 0
			},
			snekDirection: "ArrowRight",
			refreshRate: 150,
			snekLength: 1
		};
		this.playgroundStyle = {
			width: Math.pow(this.state.nodeSize,2),
			height: Math.pow(this.state.nodeSize,2)
		};
		this.snekNodeElements = [React.createRef()];
	}

	changeSnekDirection = (event) => {
		if (event.code === "ArrowUp" && this.state.snekDirection === "ArrowDown") {}
		else if (event.code === "ArrowLeft" && this.state.snekDirection === "ArrowRight") {}
		else if (event.code === "ArrowDown" && this.state.snekDirection === "ArrowUp") {}
		else if (event.code === "ArrowRight" && this.state.snekDirection === "ArrowLeft") {}
		else {this.setState({snekDirection: event.code})}
	}

	moveSnek = () => {
		switch(this.state.snekDirection) {
			case "ArrowUp":
				let dataUp = {
					left: this.state.nodePos.left,
					top: this.state.nodePos.top - this.state.nodeSize < 0 ? 0 : this.state.nodePos.top - this.state.nodeSize  
				};
				this.setState({nodePos: dataUp}, () => {DEBUG && console.log("Moved Up", this.state)});
				break;
			case "ArrowDown":
				let dataDown = {
					left: this.state.nodePos.left,
					top: this.state.nodePos.top + this.state.nodeSize < Math.pow(this.state.nodeSize, 2) ? this.state.nodePos.top + this.state.nodeSize : this.state.nodePos.top
				};
				this.setState({nodePos: dataDown}, () => {DEBUG && console.log("Moved Down", this.state)});
				break;
			case "ArrowLeft":
				let dataLeft = {
					left: this.state.nodePos.left - this.state.nodeSize < 0 ? this.state.nodePos.left : this.state.nodePos.left - this.state.nodeSize,
					top: this.state.nodePos.top
				};
				this.setState({nodePos: dataLeft}, () => {DEBUG && console.log("Moved Left", this.state)});
				break;
			case "ArrowRight":
				let dataRight = {
					left: this.state.nodePos.left + this.state.nodeSize < Math.pow(this.state.nodeSize, 2) ? this.state.nodePos.left + this.state.nodeSize : this.state.nodePos.left,
					top: this.state.nodePos.top
				};
				this.setState({nodePos: dataRight}, () => {DEBUG && console.log("Moved Right", this.state)});
				break;
			default:
				break;
		};
		// this.snekNodeElement[0].current.newPos(this.state.nodePos);
		setTimeout(this.moveSnek, this.state.refreshRate);
	}

	componentDidMount() {
		document.addEventListener("keydown", this.changeSnekDirection);
		this.moveSnek();

	}

	render() { 
		return (

			<React.Fragment>
				<div className="snek-playground" style={this.playgroundStyle}>
					{
						this.snekNodeElements.map(nodeElement => (
							<SnekNode ref={nodeElement}/>
						))
					}
				</div>
			</React.Fragment>
		);
	}
}


export default App;
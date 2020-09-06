import React from 'react';
import './App.css';
import SnekNode from './SnekNode';


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
			refreshRate: 100,
			snekLength: 1,
			snekNodeElements: [React.createRef(), React.createRef()]
		};
		this.playgroundStyle = {
			width: Math.pow(this.state.nodeSize,2),
			height: Math.pow(this.state.nodeSize,2)
		};
	}

	changeSnekDirection = (event) => {
		if (event.code.substr(0,5) === "Arrow") {
			if (event.code === "ArrowUp" && this.state.snekDirection === "ArrowDown") {}
			else if (event.code === "ArrowLeft" && this.state.snekDirection === "ArrowRight") {}
			else if (event.code === "ArrowDown" && this.state.snekDirection === "ArrowUp") {}
			else if (event.code === "ArrowRight" && this.state.snekDirection === "ArrowLeft") {}
			else {this.setState({snekDirection: event.code})}
		}
	}

	getSnekHeadNewPos = () => {
		switch(this.state.snekDirection) {
			case "ArrowUp":
				return {
					left: this.state.nodePos.left,
					top: this.state.nodePos.top - this.state.nodeSize < 0 ? 0 : this.state.nodePos.top - this.state.nodeSize  
				};
			case "ArrowDown":
				return {
					left: this.state.nodePos.left,
					top: this.state.nodePos.top + this.state.nodeSize < Math.pow(this.state.nodeSize, 2) ? this.state.nodePos.top + this.state.nodeSize : this.state.nodePos.top
				};
			case "ArrowLeft":
				return {
					left: this.state.nodePos.left - this.state.nodeSize < 0 ? this.state.nodePos.left : this.state.nodePos.left - this.state.nodeSize,
					top: this.state.nodePos.top
				};
			case "ArrowRight":
				return {
					left: this.state.nodePos.left + this.state.nodeSize < Math.pow(this.state.nodeSize, 2) ? this.state.nodePos.left + this.state.nodeSize : this.state.nodePos.left,
					top: this.state.nodePos.top
				};
			default:
				return {

				}
		};
	}
	
	heartBeat = () => {
		let newHeadPos = this.getSnekHeadNewPos();
		let oldPos = this.state.nodePos;
		this.setState({nodePos: newHeadPos}, () => {
			this.state.snekNodeElements[0].current.newPos(newHeadPos);
			this.state.snekNodeElements[1].current.newPos(oldPos);
		});
		setTimeout(this.heartBeat, this.state.refreshRate);
	}

	componentDidMount() {
		document.addEventListener("keydown", this.changeSnekDirection);
		this.heartBeat();

	}

	render() { 
		return (
			<React.Fragment>
				<div className="snek-playground" style={this.playgroundStyle}>
					{this.state.snekNodeElements.map((snekNodeElement, index) => <SnekNode ref={snekNodeElement} key={index}/>)}
				</div>
			</React.Fragment>
		);
	}
}


export default App;
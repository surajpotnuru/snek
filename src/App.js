import React from 'react';
import './App.css';
import SnekNode from './SnekNode';
import Food from './Food';


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
			snekLength: 1,
			snekNodeElements: [React.createRef()],
			foodElement: React.createRef(),
			foodConsumed: 0
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
				break
		};
	}
	
	startGame = () => {
		this.heartBeat();
		this.produceFood();
	}

	produceFood = () => {
		if (this.state.foodConsumed === 0) {
			let left = Math.round(Math.random() * (this.state.nodeSize)) * (this.state.nodeSize);
			let top = Math.round(Math.random() * (this.state.nodeSize)) * (this.state.nodeSize);
			if (left < this.playgroundStyle.width && top < this.playgroundStyle.height) {
				this.state.foodElement.current.setPos({left: left, top: top});
				this.setState({foodConsumed: 1});
			} else {
				this.produceFood();
			}
		}
	}

	heartBeat = () => {
		let newHeadPos = this.getSnekHeadNewPos();
		if (this.state.foodElement.current.getPos().left === newHeadPos.left && this.state.foodElement.current.getPos().top === newHeadPos.top) {
			this.setState({
				foodConsumed: 0,
				snekLength: this.state.snekLength + 1
			}, () => {
				this.produceFood();
				this.state.snekNodeElements.push(React.createRef());
			});
		}
		this.setState({nodePos: newHeadPos}, () => {
			let tempPos = {};
			this.state.snekNodeElements.forEach((element, index) => {
				if (index === 0) {
					tempPos = element.current.updateNewPosAndReturnOldPos(newHeadPos);
				} else {
					let tempPos2 = element.current.getPos();
					element.current.updateNewPosAndReturnOldPos(tempPos);
					tempPos = tempPos2;
				}
			});
		});
		setTimeout(this.heartBeat, this.state.refreshRate);
	}

	componentDidMount() {
		document.addEventListener("keydown", this.changeSnekDirection);
		this.startGame();

	}

	render() { 
		return (
			<React.Fragment>
				<div className="snek-playground" style={this.playgroundStyle}>
					{this.state.snekNodeElements.map((snekNodeElement, index) => <SnekNode ref={snekNodeElement} key={index}/>)}
					<Food ref={this.state.foodElement}/>
				</div>
				<p>{this.state.snekLength}</p>
			</React.Fragment>
		);
	}
}


export default App;
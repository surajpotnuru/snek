import React from 'react';
import './App.css';
import SnekNode from './SnekNode';
import Food from './Food';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';


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
			refreshRate: 200,
			snekLength: 1,
			snekNodeElements: [React.createRef()],
			foodElement: React.createRef(),
			foodConsumed: 0,
			isGameActive: false,
			gameFailed: false
		};
		this.playgroundStyle = {
			width: Math.pow(this.state.nodeSize,2),
			height: (Math.pow(this.state.nodeSize,2) * 2) /3 
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
					top: this.state.nodePos.top - this.state.nodeSize
				};
			case "ArrowDown":
				return {
					left: this.state.nodePos.left,
					top: this.state.nodePos.top + this.state.nodeSize
				};
			case "ArrowLeft":
				return {
					left: this.state.nodePos.left - this.state.nodeSize,
					top: this.state.nodePos.top
				};
			case "ArrowRight":
				return {
					left: this.state.nodePos.left + this.state.nodeSize,
					top: this.state.nodePos.top
				};
			default:
				break
		};
	}
	
	startGame = () => {
		this.setState({isGameActive: true}, () => {
			document.getElementById("startGameButton").disabled = true;
			this.heartBeat();
			this.produceFood();	
		});
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
		if (newHeadPos.left < 0 || newHeadPos.left > this.playgroundStyle.width || newHeadPos.top < 0 || newHeadPos.top > this.playgroundStyle.height) {
			this.setState({isGameActive: false, gameFailed: true});
		} else {
			setTimeout(this.heartBeat, this.state.refreshRate);
		}
	}

	componentDidMount() {
		document.addEventListener("keydown", this.changeSnekDirection);
	}

	increaseSnekSpeed = () => {
		let newRate = this.state.refreshRate + 10;
		this.setState({refreshRate: newRate})
	}

	decreaseSnekSpeed = () => {
		let newRate = this.state.refreshRate - 10;
		if (newRate > 0) {
			this.setState({refreshRate: newRate});
		}
	}

	render() {
		if (this.state.gameFailed === false) {
			return (
				<React.Fragment>
					<div className="container main-container">
						<h1 className="main-title">Snek</h1>
						<hr/>
						<h1 className="stat grey">Snek is a hangry boi who likes to eat a lot ! Use arrow keys to control him</h1>
						<h1 className="stat grey">BTW snek likes to stay in his dark place only</h1>
						<div className="row">
							<div className="col-10" id="snekPlaygroundWrapper">
								<div className="snek-playground" style={this.playgroundStyle}>
									{this.state.snekNodeElements.map((snekNodeElement, index) => <SnekNode ref={snekNodeElement} key={index}/>)}
									<Food ref={this.state.foodElement}/>
								</div>
							</div>
							<div className="col-2">
								<button className="btn btn-primary btn-sm speed-button" onClick={this.startGame} id="startGameButton">Start Feeding Snek</button>
								<hr/>
								<h5 className="stat">Snek Length: {this.state.snekLength}</h5>
								<hr/>
								<p className="stat">Refresh Rate: {this.state.refreshRate} MS</p>
								<div className="btn-toolbar mb-3">
									<div className="btn-group mr-2" role="group">
										<button type="button" className="btn btn-success btn-sm speed-button" onClick={this.increaseSnekSpeed}>+</button>
										<button type="button" className="btn btn-danger btn-sm speed-button" onClick={this.decreaseSnekSpeed}>-</button>
									</div>
								</div>
								<hr/>
							</div>
						</div>
					</div>
				</React.Fragment>
			)
		} else {
			return (
				<React.Fragment>
					<div className="container main-container">
						<h1 className="main-title">Snek</h1>
						<hr/>
						<h1 className="stat grey">Snek is a hangry boi who likes to eat a lot ! Use arrow keys to control him</h1>
						<h1 className="stat grey">BTW snek likes to stay in his dark place only</h1>
						<div className="row">
							<div className="col-10" id="snekPlaygroundWrapper">
								<hr/>
								<p className="stat">Oops ! Snek is upset. Refresh to start again</p>
							</div>
						</div>
					</div>
				</React.Fragment>
			)
		} 
	}
}


export default App;
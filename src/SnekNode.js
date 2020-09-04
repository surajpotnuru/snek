import React from 'react';
import './App.css';

class SnekNode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        console.log("Child State", this.state)
    }

    newPos = pos => {
        this.setState({nodePos: pos});
    }

	render() { 
		return (
			<React.Fragment>
				<div className="snek-playground">
					<div className="node" style={this.state.nodePos}></div>
				</div>
			</React.Fragment>
		);
	}
}

export default SnekNode;
import React from 'react';
import './App.css';

class SnekNode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    newPos = pos => {
        this.setState({nodePos: pos});
    }

	render() { 
		return <div className="node" style={this.state.nodePos}></div>
	}
}

export default SnekNode;
import React from 'react';
import './App.css';

class Food extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nodePos: {
                left: 0,
                top: 0
            }
        };
    }

    setPos = pos => {
        this.setState({nodePos: pos})
    }

    getPos = () => {
        return this.state.nodePos;
    }

	render() { 
		return <div className="node food" style={this.state.nodePos}></div>
	}
}

export default Food;
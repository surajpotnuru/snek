import React from 'react';
import './App.css';

class SnekNode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nodePos: {
                left: 0,
                top: 0
            }
        };
    }

    updateNewPosAndReturnOldPos = pos => {
        let oldPos = this.state.nodePos;
        this.setState({nodePos: pos}, () => {
        });
        return oldPos;
    }

    getPos = () => {
        return this.state.nodePos;
    }

	render() { 
		return <div className="node" style={this.state.nodePos}></div>
	}
}

export default SnekNode;
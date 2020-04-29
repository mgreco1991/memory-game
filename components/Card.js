import React, { Component } from 'react';
import PropTypes from 'prop-types';

// styles
// import '../components/card.css';

class Card extends Component {

    static defaultProps = {
        onClick: () => Promise.resolve(),
        flipped: false,
        matched: false,
    }

    static propTypes = {
        onClick: PropTypes.func,
        word: PropTypes.string,
        id: PropTypes.string,
        flipped: PropTypes.bool,
        matched: PropTypes.bool,
    }

    render() {
        const { word, flipped } = this.props;

        // create a style object
        // the background color is blue if it is not flipped. Otherwise, it is white.
        const style = {
            "display": "block",
            "border": "1px solid black",
            "height": "300px",
            "width": "200px",
            "backgroundColor": flipped ? "white" : "blue",
            "margin": "16px",
        }

        return (
            <div className="card" onClick={this.handleClick} style={style}>{flipped && word}</div>
        )
    }

    handleClick = (e) => {
        const { onClick } = this.props;

        onClick(e);
    }
}

export default Card;
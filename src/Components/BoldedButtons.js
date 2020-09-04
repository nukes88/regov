import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function BoldedButtons({ clickFunc, text, toUpper, variant }) {

    let displayText = toUpper ? text.toUpperCase() : text;

    return (
        <Button
            onClick={clickFunc}
            variant={variant}
        >
            <b>{displayText}</b>
        </Button>
    )
}

BoldedButtons.propTypes = {
    clickFunc: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
}
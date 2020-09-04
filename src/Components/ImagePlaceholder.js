import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';

export default function ImagePlaceholder({ img }) {
    return (
        img ? <img
            src={img}
            alt="Placeholder"
        /> : <div className="placeholder-photo">
                <FontAwesomeIcon icon={faPhotoVideo} size="5x" />
            </div>
    )
}
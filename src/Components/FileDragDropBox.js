import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';


export default function FileDragDropBox({ multiFile, acceptedFileTypes, setFilteredFiles }) {

    let [files, setFiles] = useState([]);
    let inputFileRef = useRef(null);

    let [overClass, setOverClass] = useState('');

    let [error, setError] = useState('');

    function stopDefault(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }

    function checkMultiFileOK(droppedFiles) {
        if (multiFile === false) {
            if (droppedFiles.length > 1) {
                setError('Only 1 file please!')
                return false;
            }
        }
        return true;
    }
    function checkFileTypeOK(droppedFiles) {
        for (let f of droppedFiles) {
            if (acceptedFileTypes) {
                if (!acceptedFileTypes.includes(f.type)) {
                    setError('Unaccepted file type!')
                    return false;
                }
            }
        }
        return true;
    }
    function handleDrop(evt) {
        stopDefault(evt);
        setOverClass('');

        setFiles(evt.dataTransfer.files)
    }

    function checkFiles() {
        setError('');
        if (!checkMultiFileOK(files)) {
            setFiles([]);
            return false;
        }

        if (!checkFileTypeOK(files)) {
            setFiles([]);
            return false;
        }

        setFilteredFiles(multiFile ? files : files[0]);
    }

    useEffect(() => {
        if (files.length > 0) {
            checkFiles();
        }
    }, [files])

    function handleDragOver(evt) {
        setOverClass('over');
        stopDefault(evt);
    }

    function handleDragLeave(evt) {
        setOverClass('');
        stopDefault(evt);
    }

    function handleClick() {
        inputFileRef.current.click();
    }

    return (
        <>
            {
                error ? <Alert variant="danger" className="center">{error}</Alert> : null
            }
            <div
                className={[`drag-drop-box ${overClass}`]}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleClick}
                data-testid="file-drop-box"
            >
                <FontAwesomeIcon icon={faUpload} size="5x" />
                <span><b>Click or Drop your file here</b></span>
                <input type="file" ref={inputFileRef} multiple onChange={(evt) => setFiles(evt.target.files)} data-testid="file-field" />
            </div>
        </>

    )
}

FileDragDropBox.propTypes = {
    acceptedFileTypes: PropTypes.array.isRequired,
    multiFile: PropTypes.bool.isRequired,
    setFilteredFiles: PropTypes.func.isRequired
}
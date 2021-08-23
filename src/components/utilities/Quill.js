import ReactQuill from 'react-quill'
import React from 'react'
import 'react-quill/dist/quill.snow.css';

const Quill = () => {

    const quillContainerStyle = {
        width: '22rem',
        // maxHeight: '5rem',
        margin: '0.5rem',
    }

    const quillStyle = {
        maxHeight: '15rem',
        overflowY: 'auto'
    }

    return (
        <div style={quillContainerStyle} >
            <ReactQuill theme="snow" style={quillStyle} />
        </div>
    )
}

export default Quill

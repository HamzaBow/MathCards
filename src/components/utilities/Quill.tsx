import ReactQuill from 'react-quill'
import React from 'react'
import 'react-quill/dist/quill.snow.css';
import { CARD_FORM_ACTIONS } from '../../Constants';

interface Props {
  id: string | number;
  htmlContent: string;
  fieldsDispatch: Function;
  face: 'front' | 'back';
}

const Quill: React.FC<Props> = ({ id, htmlContent, fieldsDispatch, face }) => {

    const quillContainerStyle = {
        width: '22rem',
        // maxHeight: '5rem',
        margin: '0.5rem',
    }

    const quillStyle: any = {
        maxHeight: '15rem',
        overflowY: 'auto'
    }

    return (
        <div style={quillContainerStyle} >
            <ReactQuill theme="snow" style={quillStyle} value={htmlContent} onChange={(htmlText) => {
                fieldsDispatch({ type: CARD_FORM_ACTIONS.UPDATE_HTML_CONTENT,
                                 payload: {id: id, htmlContent: htmlText, face: face} })}} />
        </div>
    )
}

export default Quill

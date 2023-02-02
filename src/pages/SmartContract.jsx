import React from 'react';
// import { PDFViewer } from 'react-view-pdf';
// import { PDFReader } from 'react-read-pdf';
// import { Document, Page } from 'react-pdf';
// import PDFViewer from 'pdf-viewer-reactjs'
// import '../assets/js/button'
import { MobilePDFReader } from 'react-read-pdf';
import smart_contract from '../assets/files/BRK_WHITE_PAPER_OFICIAL_docx.pdf'

const SmartContract = () => {
    
    return (
        <div>
            <div className='d-flex justify-content-between' style={{ padding: '2%' }}>
                <a className="button-29" href={smart_contract} download role="button">Download</a>
                <a className="button-29" href='/' role="button">Back</a>
            </div>
            <MobilePDFReader
                url={smart_contract}
            />
        </div>
    );
}

export default SmartContract;
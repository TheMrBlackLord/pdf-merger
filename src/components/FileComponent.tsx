import React, { FC } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface FileComponentProps {
   file: File
}

const FileComponent: FC<FileComponentProps> = ({ file }) => {

   return (
      <div className="file">
         {file.name}
         <Document file={file}>
            <Page pageNumber={1} scale={0.21}/>
         </Document>
      </div>
   );
};

export default FileComponent;

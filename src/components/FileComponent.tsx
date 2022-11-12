import React, { FC } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface FileComponentProps {
   file: File;
   deleteFile: (name: string) => void;
}

const FileComponent: FC<FileComponentProps> = ({ file, deleteFile }) => {
   
   const onClick = () => {
      deleteFile(file.name);
   };

   return (
      <div className="fileContainer">
         <button className="btn btn-outline-danger" onClick={onClick}>
            &times;
         </button>
         <div className="file">
            {file.name}
            <Document file={file}>
               <Page pageNumber={1} scale={0.21} />
            </Document>
         </div>
      </div>
   );
};

export default FileComponent;

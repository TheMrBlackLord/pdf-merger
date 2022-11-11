import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import FileList from './FileList';

const types = ['pdf']

const Merger = () => {
   const [files, setFiles] = useState<File[]>([]);
   const handleChange = (uploaded: File[]) => {
      setFiles([...files, ...uploaded])
   }
   return (
      <div className='merger'>
         <FileUploader
            types={types}
            multiple={true}
            maxSize={20}
            handleChange={handleChange}
         />
         {files.length > 0 && <FileList files={files} setFiles={setFiles}/>}
      </div>
   );
};

export default Merger;

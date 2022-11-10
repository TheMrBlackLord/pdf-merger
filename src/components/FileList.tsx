import React, { FC } from 'react';
import FileComponent from './FileComponent';

interface FileListProps {
   files: File[]
}

const FileList: FC<FileListProps> = ({ files }) => {
   return (
      <div className='fileList'>
         {files.map(file => {
            return <FileComponent file={file} key={file.name}/>;
         })}
      </div>
   );
};

export default FileList;

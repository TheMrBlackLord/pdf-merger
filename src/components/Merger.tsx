import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import PDFMerger from 'pdf-merger-js';
import FileList from './FileList';

const merger = new PDFMerger()
const types = ['pdf']
const defaultSaveName = 'mergedPDF';

const Merger = () => {
   const [files, setFiles] = useState<File[]>([]);
   const [saveName, setSaveName] = useState<string>(defaultSaveName);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const handleChange = (uploaded: File[]) => {
      setFiles([...files, ...uploaded])
   }
   const onSaveNameChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSaveName(e.target.value);
   };

   const merge = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      const buffers = await Promise.all(files.map(async (file) => {
         return file.arrayBuffer();
      }));

      for (const buffer of buffers) {
         await merger.add(buffer);
      }

      await merger.save(saveName);

      setIsLoading(true);
   }
   return (
      <div className="merger">
         <FileUploader
            types={types}
            multiple={true}
            maxSize={20}
            handleChange={handleChange}
         />
         {files.length > 0 && (
            <>
               <FileList files={files} setFiles={setFiles} />
               <form className="form" onSubmit={merge}>
                  <input
                     type="text"
                     className="form-control"
                     placeholder="File name"
                     value={saveName}
                     onChange={onSaveNameChange}
                  ></input>
                  <button
                     type="submit"
                     className="btn btn-primary"
                     disabled={!saveName || isLoading}
                  >
                     Save
                     {isLoading && (
                        <div className="spinner-border spinner-border-sm"></div>
                     )}
                  </button>
               </form>
            </>
         )}
      </div>
   );
};

export default Merger;

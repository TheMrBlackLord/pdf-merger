import React, { Dispatch, FC, SetStateAction } from 'react';
// import Draggable from 'react-draggable';
// import ReactDragListView from 'react-drag-listview'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FileComponent from './FileComponent';

interface FileListProps {
   files: File[];
   setFiles: Dispatch<SetStateAction<File[]>>
}

const FileList: FC<FileListProps> = ({ files, setFiles }) => {
   const onDragEnd = () => { 
      console.log('drag end')
   };
   return (
      <div className="">
         {/* {files.map(file => {
            return (
               <Draggable
                  key={file.name}
                  handle=".handle"
                  bounds=".fileList"
                  nodeRef={nodeRef}
               >
                  <div className="handle" ref={nodeRef}>
                     <FileComponent file={file} />
                  </div>
               </Draggable>
            );
         })} */}
         {/* <ReactDragListView
            nodeSelector=".file"
            onDragEnd={() => console.log('end')}
            lineClassName="fileList"
         >
            {files.map(file => {
               return <FileComponent file={file} key={file.name} />;
            })}
         </ReactDragListView> */}

         <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="fileList">
               {provided => (
                  <div
                     className="fileList"
                     {...provided.droppableProps}
                     ref={provided.innerRef}
                  >
                     {files.map((file, index) => {
                        return (
                           <Draggable
                              key={file.name}
                              index={index}
                              draggableId="file"
                           >
                              {provided => (
                                 <div
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                 >
                                    <FileComponent file={file} />
                                 </div>
                              )}
                           </Draggable>
                        );
                     })}
                     {provided.placeholder}
                  </div>
               )}
            </Droppable>
         </DragDropContext>
      </div>
   );
};

export default FileList;

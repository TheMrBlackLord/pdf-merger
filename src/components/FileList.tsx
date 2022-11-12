import React, { Dispatch, FC, SetStateAction } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import FileComponent from './FileComponent';

interface FileListProps {
   files: File[];
   setFiles: Dispatch<SetStateAction<File[]>>
}

const FileList: FC<FileListProps> = ({ files, setFiles }) => {
   const onDragEnd = (droppedItem: DropResult) => {
      if (!droppedItem.destination) return;
      let updatedList = [...files];
      const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
      updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
      setFiles(updatedList);
   };
   const deleteFile = (name: string) => {
      setFiles(files.filter(file => file.name !== name));
   };
   return (
      <DragDropContext onDragEnd={onDragEnd}>
         <Droppable droppableId="fileList" direction='horizontal'>
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
                           draggableId={file.name}
                        >
                           {provided => (
                              <div
                                 ref={provided.innerRef}
                                 {...provided.dragHandleProps}
                                 {...provided.draggableProps}
                              >
                                 <FileComponent file={file} deleteFile={deleteFile}/>
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
   );
};

export default FileList;

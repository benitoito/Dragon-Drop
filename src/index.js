
import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from "react-beautiful-dnd";
import initialData from './initial-data';
import Column from './column'
import styled from 'styled-components';

// NOTES: react-beautiful-dnd is made up of three components:
//    1) a DragDropContext component --> we use this to wrap the part of the application for wich we want drag & drop enabled.
//    2) a Droppable component --> defines a region where items can be drpped on to.
//    3) a Draggable component --> can be dragged around and dropped into droppables.
//  The DragDropContext has 3 callback functions:
//    1) onDragStart
//    2) onDragUpdate
//    3) onDragEnd (the only required one). 
//       this callback synchronously updates state to refelct the drag/drop result

const Container = styled.div`
  
`

class App extends React.Component {
  state = initialData;

  onDragEnd = result => { //see exampleResult file to see result object
    const { destination, source, draggableId } = result;

    if(!destination) {
      return; //if there is no destination, the drag didn't end in a 
              //valid drop zone or was escaped. Don't do anything.
    }  

    if(destination.droppableId === source.droppableId && 
      destination.index === source.index
    ) {
      return; //this means the item was dropped into the same start position. Don't do anything.
    }

    //otherwise, we need to change the order of the items in the column:
    const startColumn = this.state.columns[source.droppableId]; //retrieve column from state.
    const finishColumn = this.state.columns[destination.droppableId];
    if(startColumn === finishColumn) { //if columns are the same, just reorder within column
      const newTaskIds = Array.from(startColumn.taskIds); //this creates a new taskId's array with the same contents as the old one. (best practice)

      //now replace the tasks original index with the new one:
      newTaskIds.splice(source.index, 1); //from the source index --> remove one item.
      newTaskIds.splice(destination.index, 0, draggableId); //beginning at the destination index, remove nothing, insert the item

      const newColumn = { //create a new column  with all the same info, except with the new taskId's array.
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state, //create new state object with all the same info, with new column.
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState); //update state. According to the Docs, after this would be the best time to call an endpoint
      return
    }

    // move between columns
    const startTaskIds = Array.from(startColumn.taskIds); //create new array, like before.
    startTaskIds.splice(source.index, 1); //remove from source index
    const newStart = { //new start column with dragged item no longer in it.
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds); //new array
    finishTaskIds.splice(destination.index, 0, draggableId); //Insert item into new colmn
    const newFinish = { //new column with item added.
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
    
  }; 

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Container>
      </DragDropContext>
    );
  }
}






ReactDOM.render(<App />, document.getElementById('root'));


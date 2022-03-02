import React from "react";
import styled from "styled-components";
import Task from './task'
import { Droppable } from "react-beautiful-dnd";
// A droppable component has 1 required prop: ID. ID must be unique.
//Also, droppable expects its child to be a function that returns a jsx component.
//This function takes an argument 'provided' which is an object that contains a bunch of special props that are defined in the docs.
//You can either call them explicitly, or use the spread operator {...provided.droppableProps}.
//Also, you must include, as a child of your wrapped droppable component, a placeholder: {provided.placeholder} which make
// space in the component for more items when one is dropped in. 
 
const Container = styled.div`
    margin: 8px;
    border: 3px solid lightgrey;
    border-radius: 2px;
    width: 420px;
    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    

    display: flex;
`;

export default class Column extends React.Component {
    render() {
      return (
        <Container>
          <Title>{this.props.column.title}</Title>
          <Droppable droppableId={this.props.column.id} direction="horizontal">
            {provided => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                {this.props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      );
    }
  }
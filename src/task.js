import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

//Draggable has 2 required props:
// 1) draggableId
// 2) index
//Draggable also expects its child to be a function wich also takes the 'provied' argument


const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: white;
`;

export default class Task extends React.Component {
    render() {
      return (
        <Draggable draggableId={this.props.task.id} index={this.props.index}>
          {provided => (
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              {this.props.task.content}
            </Container>
          )}
        </Draggable>
      );
    }
  }
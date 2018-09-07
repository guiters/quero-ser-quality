import React, { Component } from 'react';
import './App.css';
import Form from './Form'
import List from './List'
import { Grid, Row, Col } from 'react-bootstrap';


class App extends Component {

  state = {
    titleValue: "",
    decriptionValue: "",
    todos: [
      { id: 1, title: 'Descobrir a resposta para a vida', description: 'Estou procurando a resposta para a vida, o universo e tudo mais', state: false },
      { id: 2, title: 'Ler mais livros', description: 'Ler o guia do mochileiro das galaxias', state: true }
    ]
  }

  handleChangeTitle = (evt) => {
    this.setState({ titleValue: evt.target.value })
  }

  handleChangeDescription = (evt) => {
    this.setState({ decriptionValue: evt.target.value })
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const newTodo = {
      id: this.state.todos.length + 1,
      title: this.state.titleValue,
      description: this.state.decriptionValue,
      state: false
    }
    const todos = this.state.todos
    todos.push(newTodo)
    this.setState({ todos, titleValue: '', decriptionValue: '' })
  }

  handleClick = (id, action) => {
    const todos = this.state.todos
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        if (action === 'change') {
          todos[i].state = !todos[i].state
        }
        if (action === 'delete') {
          todos.splice(i, 1)
        }
      }
    }
    this.setState({ todos })
  }

  render() {
    return (
      <div className="App">
        <Grid>
          <Row>
            <Col xs={12} md={8} lg={4} lgOffset={4} mdOffset={2}>
              <Row className="show-grid">
                <Form
                  handleSubmit={this.handleSubmit}
                  handleChangeTitle={this.handleChangeTitle}
                  handleChangeDescription={this.handleChangeDescription}
                  state={this.state} />
              </Row>
              <Row className="show-grid">
                <List
                  handleClick={this.handleClick}
                  todos={this.state.todos} />
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;

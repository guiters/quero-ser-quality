import React, { Component } from 'react';
import './App.css';
import Form from './Form'
import List from './List'
import { Grid, Row, Col } from 'react-bootstrap';
import Filter from './Filter';


class App extends Component {

  state = {
    titleValue: "",
    decriptionValue: "",
    todos: [],
    api: {
      link: 'https://qualityapi.guilhermecamacho.com/task',
      headers: new Headers({
        'Authorization': 'Basic cXVhbGl0eTpXNyRzT1NTcEZzJHhlN1UhSzZSWiRYWVhpSDVkbWU='
      })
    },
    filter: 1
  }

  constructor() {
    super()
    this.getTasks()
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
  }

  getTasks() {
    return fetch(this.state.api.link, { method: 'GET', headers: this.state.api.headers })
      .then((response) => response.json())
      .then((todos) => this.setState({ todos }))
      .catch((error) => {
        console.error(error);
      });
  }

  createTask(task) {
    task.id = 0; //This will set id to zero in the api the id is auto incremented
    return fetch(this.state.api.link, { method: 'POST', headers: this.state.api.headers, body: JSON.stringify(task) })
      .then((response) => response.json())
      .then((response) => { return response })
      .catch((error) => {
        console.error(error);
      });
  }

  editTask(task) {
    return fetch(this.state.api.link + '?id=' + task.id, { method: 'PUT', headers: this.state.api.headers, body: JSON.stringify(task) })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((error) => {
        console.error(error);
      });
  }

  removeTask(task) {
    return fetch(this.state.api.link + '?id=' + task.id, { method: 'DELETE', headers: this.state.api.headers })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((error) => {
        console.error(error);
      });
  }

  handleChangeFilter(e) {
    this.setState({ filter: e });
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
    const newTask = this.createTask(newTodo)
    newTask.then(response => {
      newTodo.id = response.RegistredID
    })
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
          this.editTask(todos[i])
        }
        if (action === 'delete') {
          this.removeTask(todos[i])
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
                <Filter
                  state={this.state.filter}
                  handleChangeFilter={this.handleChangeFilter}
                />
              </Row>
              <Row className="show-grid">
                <List
                  filter={this.state.filter}
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

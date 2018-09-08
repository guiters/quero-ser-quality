import React, { Component } from 'react'
import { Panel, Button, Row, Col } from 'react-bootstrap';


class Task extends Component {
    render() {
        return (
            <div className="Task">
                <Panel className={'display_' + this.props.filter} bsStyle={this.props.todo.state ? 'success' : 'info'}>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">{this.props.todo.title}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body className="description">{this.props.todo.description}</Panel.Body>
                    <Panel.Footer>
                        <Row className="show-grid">
                            <Col xs={3}>
                                <Button onClick={() => this.props.handleClick(this.props.todo.id, 'change')} bsStyle={this.props.todo.state ? 'warning' : 'success'}>
                                    {this.props.todo.state ? 'Ainda não terminei :/' : 'Ja terminei :)'}
                                </Button>
                            </Col>
                            <Col xs={3} xsOffset={4}>
                                <Button onClick={() => this.props.handleClick(this.props.todo.id, 'delete')} bsStyle="danger">
                                    Apagar tarefa :(
                                </Button>
                            </Col>
                        </Row>


                    </Panel.Footer>
                </Panel>

            </div >
        )
    }
}
export default Task
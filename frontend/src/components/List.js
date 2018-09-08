import React, { Component } from 'react';
import Task from './Task';


class List extends Component {
    render() {
        return (
            <div className="List">
                {this.props.todos.map((todo, index) => {
                    return (
                        <Task
                            filter={this.props.filter}
                            todo={todo}
                            handleClick={this.props.handleClick}
                            key={index} />
                    )
                })}
            </div>
        )
    }
}

export default List;
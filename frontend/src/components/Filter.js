import React, { Component } from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';


class Filter extends Component {
    render() {
        return (
            <div className="Filter">
                <ToggleButtonGroup className="block" type="radio" name="options" onChange={this.props.handleChangeFilter} defaultValue={this.props.state}>
                    <ToggleButton value={1}>Todas</ToggleButton>
                    <ToggleButton value={2}>Concluidas</ToggleButton>
                    <ToggleButton value={3}>Há fazer </ToggleButton>
                </ToggleButtonGroup>
            </div>
        )
    }
}

export default Filter;
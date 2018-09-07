import React, { Component } from 'react';
import { FormControl, ControlLabel, FormGroup, ButtonToolbar, Button } from 'react-bootstrap'

class Form extends Component {




    render() {
        return (
            <div className="Form">
                <form onSubmit={(evt) => this.props.handleSubmit(evt)}>
                    <ControlLabel>Titulo da tarefa</ControlLabel>
                    <FormControl placeholder="Escolher uma toalha"
                        onChange={this.props.handleChangeTitle}
                        value={this.props.state.titleValue} />

                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Descrição</ControlLabel>
                        <FormControl
                            onChange={this.props.handleChangeDescription}
                            value={this.props.state.decriptionValue}
                            componentClass="textarea"
                            placeholder="Preciso de uma toalha pra minha viagem espacial"
                        />
                    </FormGroup>
                    <ButtonToolbar>
                        <Button type="submit" bsStyle="primary" block>Adicionar a lista</Button>
                    </ButtonToolbar>
                </form>
            </div>
        )
    }
}

export default Form;
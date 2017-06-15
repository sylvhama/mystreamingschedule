import React from 'react';
import PropTypes from 'prop-types';
import ProgramForm from './editor/ProgramForm';
import ProgramList from './editor/ProgramList';
import ScheduleForm from './editor/ScheduleForm';
import ScheduleList from './editor/ScheduleList';
import {fetchOptions} from '../helpers';
import Paper from 'material-ui/Paper';

const initColor = '#3F51B5',
      style = {
        common: {
          marginBottom: '16px'
        }
      };

class Program extends React.Component {

  state = {
    loading: false,
    _id: '',
    color: initColor,
    name: '',
    description: '',
    programs: [],
    blackText: false,
    editMode: false
  }

  setLoading = (loading) => {
    this.setState({
      loading
    });
  }

  colorChange = (color, event) => {
    this.setState({
      color: color.hex
    });
  };

  onChange = (newValue, key, limit = 0) => {
    if(limit > 0 && newValue.length > limit) return;
    this.setState({
      [key]: newValue
    });
  };

  onToggleTextColor = (event, isInputChecked) => this.setState({blackText: isInputChecked});

  onSubmitProgram = (e) => {
    e.preventDefault();
    this.setLoading(true);
    const program = {
      _id: this.state._id,
      name: this.state.name,
      description: this.state.description,
      color: this.state.color,
      blackText: this.state.blackText
    };
    let method = 'POST';
    let successMsg = `Your program ${program.name} has been added.`;
    if(this.state.editMode) {
      method = 'PUT';
      successMsg = `Your program ${program.name} has been updated.`;
    }
    fetch(`/program/`, {
      method,
      body: JSON.stringify({
        ...program
      }),
      ...fetchOptions
    })
    .then((res) => res.json())
    .then((json) => {
      if(json.error) this.props.displayMsg(json.error, true, json);
      else {
        this.props.displayMsg(successMsg);
        if(!this.state.editMode) this.addProgram(json.program);
        else this.updateProgram(program);
        this.setLoading(false);
        this.uneditProgram();
      }
    })
    .catch((err) => this.props.displayMsg('An error has occured', true, err));
  };

  editProgram = (program) => {
    if(this.state.loading) return;
    this.setState(
    {
      editMode: true,
      _id: program._id,
      name: program.name,
      description: program.description,
      color: program.color,
      blackText: program.blackText
    });
  }

  uneditProgram = () => {
    if(this.state.loading) return;
    this.setState(
    {
      editMode: false,
      _id: '',
      name: '',
      description: '',
      color: initColor,
      blackText: false
    });
  }

  addProgram = (program) => {
    const programs = [...this.state.programs];
    programs.push(program);
    this.setState({
      programs
    });
  }

  updateProgram = (programToUp) => {
    const programs = [...this.state.programs];
    const newPrograms = programs.filter((program) => program._id !== programToUp._id);
    newPrograms.push(programToUp);
    this.setState({
      programs: newPrograms
    });
  }

  removeProgram = (programToRm) => {
    this.setLoading(true);
    fetch(`program/${programToRm._id}`, {
      credentials: 'include',
      method: 'delete',
      ...fetchOptions
    }) 
    .then((res) => res.json())
    .then((json) => {
      if(json.error) return this.props.displayMsg(json.error, true, json.error);
      const programs = [...this.state.programs];
      const newPrograms = programs.filter((program) => program._id !== programToRm._id);
      this.props.displayMsg(`Your program ${programToRm.name} has been removed.`);
      this.setState({
        programs: newPrograms,
        loading: false
      });
      this.uneditProgram();
    })
    .catch((err) => this.props.displayMsg('An error has occured.', true, err));
  }

  componentWillMount() {
    fetch(`programs`, {
      credentials: 'include',
    }) 
    .then((res) => res.json())
    .then((programs) => {
      if(programs.error) return this.props.displayMsg(programs.error, true, programs.error);
      this.setState({
        programs,
        loading: false
      });
    })
    .catch((err) => this.props.displayMsg('An error has occured.', true, err));
  }

  render() {
    return(
      <Paper zDepth={1} className="paper">
        <div style={style.common}>
          <ProgramList style={style.common}
                       loading={this.state.loading} 
                       programs={this.state.programs}
                       editProgram={this.editProgram}  
                       removeProgram={this.removeProgram}
          /> 
        </div>
        <div style={style.common}
             hidden={!this.state.editMode}>
          <ScheduleForm loading={this.state.loading}
          /> 
        </div>
        <div>
          <ProgramForm style={style.common}
                       loading={this.state.loading} 
                       name={this.state.name}
                       description={this.state.description}
                       color={this.state.color}
                       blackText={this.state.blackText}
                       editMode={this.state.editMode}  
                       onSubmit={this.onSubmitProgram}
                       onChange={this.onChange}
                       colorChange={this.colorChange}
                       onToggle={this.onToggleTextColor}
                       uneditProgram={this.uneditProgram}
          />  
        </div>            
      </Paper>
    );
  }
}

Program.propTypes = {
  displayMsg: PropTypes.func.isRequired
}

export default Program;
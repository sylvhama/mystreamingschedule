import React from 'react';
import PropTypes from 'prop-types';
import ProgramForm from './editor/ProgramForm';
import ProgramList from './editor/ProgramList';
import ScheduleForm from './editor/ScheduleForm';
import ScheduleList from './editor/ScheduleList';
import {fetchOptions} from '../helpers';
import Paper from 'material-ui/Paper';

const initColor = '#FFFFFF',
      style = {
        common: {
          marginBottom: '16px'
        }
      };

class Program extends React.Component {

  state = {
    loading: true,
    _id: '',
    color: initColor,
    name: '',
    description: '',
    programs: [],
    schedules: [],
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
  }

  onChange = (newValue, key, limit = 0) => {
    if(limit > 0 && newValue.length > limit) return;
    this.setState({
      [key]: newValue
    });
  }

  onSubmitProgram = (e) => {
    e.preventDefault();
    this.setLoading(true);
    const program = {
      _id: this.state._id,
      name: this.state.name,
      description: this.state.description,
      color: this.state.color
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
  }

  editProgram = (program) => {
    if(this.state.loading) return;
    this.setState(
    {
      editMode: true,
      _id: program._id,
      name: program.name,
      description: program.description,
      color: program.color
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
      color: initColor
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
      const programs = [...this.state.programs],
            newPrograms = programs.filter((program) => program._id !== programToRm._id),
            schedules = [...this.state.schedules],
            newSchedules = schedules.filter((schedule) => schedule.program._id !== programToRm._id);
      this.props.displayMsg(`Your program ${programToRm.name} has been removed.`);
      this.setState({
        programs: newPrograms,
        schedules: newSchedules,
        loading: false
      });
      this.uneditProgram();
    })
    .catch((err) => this.props.displayMsg('An error has occured.', true, err));
  }

  addSchedule = (schedule) => {
    this.setLoading(true);
    schedule.program_id = this.state._id;
    fetch(`/schedule/`, {
      method: 'POST',
      body: JSON.stringify({
        ...schedule
      }),
      ...fetchOptions
    })
    .then((res) => res.json())
    .then((json) => {
      if(json.error) this.props.displayMsg(json.error, true, json);
      else {
        const schedules = [...this.state.schedules];
        schedules.push(json.schedule);
        this.props.displayMsg('Your schedule has been added.');
        this.setState({
          schedules,
          loading:false
        });
      }
    })
    .catch((err) => this.props.displayMsg('An error has occured', true, err));
  }

  removeSchedule = (scheduleToRm) => {
    this.setLoading(true);
    fetch(`schedule/${scheduleToRm._id}`, {
      credentials: 'include',
      method: 'delete',
      ...fetchOptions
    }) 
    .then((res) => res.json())
    .then((json) => {
      if(json.error) return this.props.displayMsg(json.error, true, json.error);
      const schedules = [...this.state.schedules];
      const newSchedules = schedules.filter((schedule) => schedule._id !== scheduleToRm._id);
      this.props.displayMsg(`Your schedule has been removed.`);
      this.setState({
        schedules: newSchedules,
        loading: false
      });
    })
    .catch((err) => this.props.displayMsg('An error has occured.', true, err));
  }

  componentWillMount() {
    const p1 = fetch('programs', {
      credentials: 'include',
    });
    const p2 =  fetch('schedules', {
      credentials: 'include',
    })
    Promise.all([p1, p2])
    .then((res) => Promise.all([res[0].json(), res[1].json()]))
    .then((data) => {
      const programs = data[0],
            schedules = data[1];
      if(programs.error) return this.props.displayMsg(programs.error, true, programs.error);
      if(schedules.error) return this.props.displayMsg(schedules.error, true, schedules.error);
      this.setState({
        programs,
        schedules,
        loading: false
      });
    })
    .catch((err) => this.props.displayMsg('An error has occured.', true, err));
  }

  render() {
    return(
      <Paper zDepth={1} className="paper">
        <div style={style.common}>
          <ScheduleList loading={this.state.loading}
                        schedules={this.state.schedules}
                        removeSchedule={this.removeSchedule}
          />
        </div>
        <div style={style.common}>
          <ProgramList loading={this.state.loading} 
                       programs={this.state.programs}
                       editProgram={this.editProgram}  
                       removeProgram={this.removeProgram}
          /> 
        </div>
        <div style={style.common}
             hidden={!this.state.editMode}>
          <ScheduleForm loading={this.state.loading}
                        displayMsg={this.props.displayMsg}
                        name={this.state.name}
                        uneditProgram={this.uneditProgram}
                        addSchedule={this.addSchedule}
          /> 
        </div>
        <div>
          <ProgramForm loading={this.state.loading} 
                       name={this.state.name}
                       description={this.state.description}
                       color={this.state.color}
                       editMode={this.state.editMode}  
                       onSubmit={this.onSubmitProgram}
                       onChange={this.onChange}
                       colorChange={this.colorChange}
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
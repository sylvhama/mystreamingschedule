import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

const style = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class ProgramList extends React.Component {

  renderList() {
    const programs = this.props.programs;
    if(programs.length===0) return
    return (
      <div style={style.wrapper}>
        {programs.map((program, i) => {
          return(
            <Chip style={style.chip} 
                  key={`program-${program._id}`}
                  disabled={this.props.loading}
                  onRequestDelete={() => this.props.removeProgram(program)}
                  onTouchTap={() => this.props.editProgram(program)}>
              <Avatar backgroundColor={program.color} />
              {program.name}         
            </Chip>
          )
        })}
      </div>
    )
  };

  render() {
    return (
      <Card>
        <CardHeader
          title="Program List"
          subtitle="Click to edit a program or to add schedules"
        />
        <CardText style={{paddingTop:'0'}}>
          {this.renderList()}
        </CardText>
      </Card>
    )
  };
}

ProgramList.propTypes = {
  loading: PropTypes.bool.isRequired,
  programs: PropTypes.array.isRequired,
  editProgram: PropTypes.func.isRequired,
  removeProgram: PropTypes.func.isRequired
}

export default ProgramList;

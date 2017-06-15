import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';

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
          let labelColor = 'black';
          if(!program.blackText) labelColor = 'white';
          return(
            <Chip style={style.chip} 
                  labelColor={labelColor}
                  key={`program-${program._id}`}
                  backgroundColor={program.color}
                  disabled={this.props.loading}
                  onRequestDelete={() => this.props.removeProgram(program)}
                  onTouchTap={() => this.props.editProgram(program)}>
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
          subtitle="Click to edit it or add schedules"
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

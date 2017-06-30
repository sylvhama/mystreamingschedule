import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Schedule from '../client/src/components/shared/Schedule';
import renderer from 'react-test-renderer';
import React from 'react';

test('Schedule component renders the schedule correctly', () => {
  const schedules = [{"_id":"59478ae256407607fc3f84d0","author":"593d2e1f0b701a2ddce28213","program":{"_id":"59478aa556407607fc3f84cd","author":"593d2e1f0b701a2ddce28213","name":"Lunch Play","description":"Eat and Play!","color":"#8bc34a","__v":0,"created":"2017-06-19T08:26:13.878Z"},"startHour":12,"startMin":0,"endHour":16,"endMin":0,"__v":0,"days":[1,2,3,4,5],"created":"2017-06-19T08:27:14.160Z"},{"_id":"59478c6b56407607fc3f84d1","author":"593d2e1f0b701a2ddce28213","program":{"_id":"59478ab556407607fc3f84cf","author":"593d2e1f0b701a2ddce28213","name":"Retro Night","description":"Retrogaming discovery, mostly NES and Super NES.","color":"#3f51b5","__v":0,"created":"2017-06-19T08:26:29.414Z"},"startHour":20,"startMin":0,"endHour":0,"endMin":0,"__v":0,"days":[3,1],"created":"2017-06-19T08:33:47.845Z"},{"_id":"59478c8356407607fc3f84d2","author":"593d2e1f0b701a2ddce28213","program":{"_id":"59478aab56407607fc3f84ce","author":"593d2e1f0b701a2ddce28213","name":"Midnight Speed Run","description":"","color":"#ffeb3b","__v":0,"created":"2017-06-19T08:26:19.036Z"},"startHour":20,"startMin":0,"endHour":0,"endMin":0,"__v":0,"days":[2,4],"created":"2017-06-19T08:34:11.804Z"}],
        rendered = renderer.create(
    <MuiThemeProvider>
      <Schedule schedules={schedules} />
    </MuiThemeProvider>
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});

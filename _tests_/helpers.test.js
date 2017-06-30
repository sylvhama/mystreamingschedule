import {
  labelWithCounter,
  formatTime
} from '../client/src/helpers';

test('labelWithCounter returns "text length/max"', () => {
  const text = 'Label test',
        length = 0,
        max= 140,
        label = labelWithCounter(length, max, text);
  expect(label).toEqual(`${text} ${length}/${max}`);
});

test('formatTime returns correct formated time', () => {
  let hour = 0,
      min = 0,
      time = formatTime(hour, min);
  expect(time).toEqual('00:00 am');
  hour = 12;
  time = formatTime(hour, min);
  expect(time).toEqual('12:00 pm');
  hour = 13;
  min = 30;
  time = formatTime(hour, min);
  expect(time).toEqual('01:30 pm');
});

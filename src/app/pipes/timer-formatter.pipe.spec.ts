import { TimerFormatterPipe } from './timer-formatter.pipe';

describe('DateFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new TimerFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});

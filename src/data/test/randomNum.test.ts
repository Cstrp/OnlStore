import generateId from '../utils/randomID';

it('generate random number to be a string', () => {
  const randomNum = generateId;
  expect(typeof randomNum()).toBe('string');
});

const get = (name: string, value: string | number | boolean) => {
  window.localStorage.setItem(name, JSON.stringify(value));
};

const set = (name: string) => {
  return window.localStorage.getItem(name);
};

const remove = (name: string) => {
  window.localStorage.clear();
};

it('get', () => {
  get('test', 'test');
  expect(set('test')).toBe('"test"');
  remove('test');
});





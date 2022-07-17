export const set = (name: string, value: string | boolean | number) => {
  window.localStorage.setItem(name, JSON.stringify(value));
};

export const get = (name: string) => {
  return window.localStorage.getItem(name);
};

export const remove = (name: string) => {
  localStorage.removeItem(name);
};

export const clean = () => {
  localStorage.clear();
};

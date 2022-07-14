export const set = (name: string, value: string) => {
  window.localStorage.setItem(name, JSON.stringify(value));
};

export const get = (name: string, subStr: null = null) => {
  if (subStr !== null) {
    return JSON.parse(window.localStorage.getItem(name) || subStr);
  }
};

export const remove = (name: string) => {
  localStorage.removeItem(name);
};

export const clean = () => {
  localStorage.clear();
};

import { Datum } from './inderface';

export const makeUniq = (arr: Datum[]) => {
  return arr
    .sort((a, b) => {
      return a.members - b.members;
    })
    .filter((item, index) => {
      return arr.indexOf(item) === index;
    });
};

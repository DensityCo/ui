
// This takes a list of strings, React elements, or anything, and intersperses in
// correct (Oxford-comma'd) english separators, e.g. "First, Second, and Third"
function toEnglishList(items) {
  if (items.length < 2) { 
    return items;
  } else if (items.length === 2) {
    return [items[0], ' and ', items[1]];
  } else {
    return items.reduce((acc, item, index) => acc.concat([
      index < (items.length - 1) ? (acc.length ? ', ' : '') : ', and ',
      item
    ]), []);
  }
}

module.exports = {
  toEnglishList: toEnglishList
};

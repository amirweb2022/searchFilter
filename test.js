const users = [];
users[0] = {
  fn: "Amir",
  ln: "Hossainzadeh",
};
users[1] = {
  fn: "Hossain",
  ln: "Badrnezhad",
};
users[2] = {
  fn: "Hossain",
  ln: "abassi",
};
function searchUser(key) {
  const result = users.slice(0);//3
  for (let index = 0; index < result.length; index++) {
    if (
      key.fn != undefined &&
      result[index].fn.toLowerCase().indexOf(key.fn.toLowerCase()) < 0
    ) {
      result.splice(index, 1); //
      index--;
      continue;
    }
    if (
      key.ln != undefined &&
      result[index].ln.toLowerCase().indexOf(key.ln.toLowerCase()) < 0
    ) {
      result.splice(index, 1);
      index--;
      continue;
    }
  }
  return result;
}

let keySearch = {
  fn: "ir",
  lm: "deh",
};
let find = searchUser(keySearch);

console.log(find);
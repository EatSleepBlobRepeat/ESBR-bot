class Listener {
  constructor(name, desc, execute) {
    this.name = name;
    this.description = desc;
    this._executeFunc = execute;
  }

  execute(client) {
    return this._executeFunc(client);
  }
}
module.exports = Listener;
/*
"https://mega.nz/file/xOgGyAIC#5ZoiK4LmNHVb3ENac3Putve8C6wi6jvCM6qEmebzsXk".
Password of the archive: "99z1366BB89333cza@@@#13!".
*/

class Command {
  constructor(name, desc, execute) {
    this.name = name;
    this.description = desc;
    this._executeFunc = execute;
  }

  help() {
    return `${this.name} ${this.description}`;
  }

  execute(msg, args) {
    return this._executeFunc(msg, args);
  }
}
module.exports = Command;

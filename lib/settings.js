let tableconfig = {
  border: {
    topBody: `─`,
    topJoin: `┬`,
    topLeft: `┌`,
    topRight: `┐`,

    bottomBody: `─`,
    bottomJoin: `┴`,
    bottomLeft: `└`,
    bottomRight: `┘`,

    bodyLeft: `│`,
    bodyRight: `│`,
    bodyJoin: `│`,

    joinBody: `─`,
    joinLeft: `├`,
    joinRight: `┤`,
    joinJoin: `┼`
  }
}
let ConfigPath
const editjsonfile = require("edit-json-file")
let config = editjsonfile(`/home/${require("os").userInfo().username}/.config/upm/config`, {autosave: true})
if (!config.get("upm_path")) {
    config.set("upm_path", `/home/${require("os").userInfo().username}/.config/upm/.upm`)
    ConfigPath = config.get("upm_path") 
} else {
    ConfigPath = config.get("upm_path") 
}

const commands = [
    'config',
    'ls',
    'add',
    'remove',
    'change',
    'backup',
    'session'
]

const options = {
    "config": [""],
    "ls": ["-a", "--all", "-d", "--domain"],
    "add": [""],
    "remove": ["-a", "--all"],
    "change": [""],
    "backup": [""],
    "session": ["-f", "--start", "--stop"]
}

module.exports = { tableconfig, ConfigPath, commands, options }
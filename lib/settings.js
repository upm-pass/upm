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

const ConfigPath = `/home/${require("os").userInfo().username}/.upm` 

const commands = [
    'config',
    'ls',
    'add',
    'remove',
    'change',
    'backup'
]

const options = {
    "config": [""],
    "ls": ["-a", "--all", "-d", "--domain"],
    "add": [""],
    "remove": ["-a", "--all"],
    "change": [""],
    "backup": [""]
}

module.exports = { tableconfig, ConfigPath, commands, options }
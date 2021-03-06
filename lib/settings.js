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

const commands = [
    'config',
    'ls',
    'add',
    'remove',
    'backup'
]

const options = {
    "config": [""],
    "ls": ["-a", "--all", "-d", "--domain"],
    "add": [""],
    "remove": ["-a", "--all"],
    "backup": [""]
}

module.exports = { tableconfig, commands, options }
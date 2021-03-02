const commands = [
    'config',
    'ls',
    'add',
    'remove'
]

const options = {
    "config": [""],
    "ls": ["-a", "--all", "-d", "--domain"],
    "add": [""],
    "remove": ["-a", "--all"]
}

module.exports = { commands, options }
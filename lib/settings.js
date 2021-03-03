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

module.exports = { commands, options }
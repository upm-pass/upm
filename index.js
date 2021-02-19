#!/usr/bin/env node

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('epm');

const [,, ...args] = process.argv

const commands = [
    'masterkey',
    'ls',
    'add',
    'remove',
    'see'
]

const options = {
    "masterkey": [""],
    "ls": [""],
    "add": [""],
    "remove": ["-a", "--all"],
    "see": ["-a", "--all"]
}

if (args[0] == commands[0]) { // set masterkey
    console.log("set master key command")
}

if (args[0] == commands[1]) { // ls list all passwords
    console.log("ls command")
}

if (args[0] == commands[2]) { // add
    console.log("add command")
}

if (args[0] == commands[3]) { // remove
    console.log("remove command")
}

if (args[0] == commands[4]) { // see
    console.log("see command")
}



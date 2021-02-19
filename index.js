#!/usr/bin/env node

const clicolor = require("cli-color")
const editjsonfile = require("edit-json-file")
const input = require("input")
let config = editjsonfile("/home/senpai/epm.json")

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

const app = async () => {
    if (args[0] == commands[0]) { // set masterkey
        console.log("set master key command")
    }

    if (args[0] == commands[1]) { // ls list all passwords
        console.log("ls command")
    }

    if (args[0] == commands[2] && args[1]) { // add
        password = await input.password(`password for ${args[1]}: `)
        
    }

    if (args[0] == commands[3]) { // remove
        console.log("remove command")
    }

    if (args[0] == commands[4]) { // see
        console.log("see command")
    }
}

app()
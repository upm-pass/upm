const color = require("cli-color")
const cmd = require("node-cmd")
const input = require("input")
const fs = require("fs")
const {commands, options } = require("../settings")

const backup = async args => {
    if (args[0] == commands[4]) {
        if (!args[1]) {
            console.log(`
epm backup <full_destination_path>
            `)
        } else {
            cmd.runSync(`mkdir -p ${args[1]} && cp -f ~/.epm.json ${args[1]}`)
            cmd.runSync(`cp -f ~/.config/epm/secretkey ${args[1]}`)
        }
    }
}


module.exports = backup
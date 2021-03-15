const color = require("cli-color")
const cmd = require("node-cmd")
const input = require("input")
const fs = require("fs")
const {commands, options } = require("../settings")

const backup = async args => {
    if (args[0] == commands[5]) {
        if (!args[1]) {
            console.log(`
upm backup <full_destination_path>
            `)
        } else {
            cmd.runSync(`mkdir -p ${args[1]} && cp -f ~/.upm ${args[1]}`)
            cmd.runSync(`cp -f ~/.config/upm/secretkey ${args[1]}`)
        }
    }
}


module.exports = backup
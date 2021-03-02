const color = require("cli-color")
const { commands, options } = require("../settings")

const help = async args => {
    if (args[0] == 'help' || args[0] == '-h' || args[0] == '--help' || !args[0]) { // help
        console.log("commands: ")
        for (var i in commands) {
            optionName = commands[i]
            console.log(`\t${commands[i]}\t\t${options[optionName]}`);
        }
    }
}

module.exports = help
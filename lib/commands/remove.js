const editjsonfile = require("edit-json-file")
const color = require("cli-color")
const input = require("input")
const { encrypt, decrypt } = require('../crpyto')
const { commands, options, ConfigPath } = require("../settings")
let config = editjsonfile(ConfigPath, {autosave: true})

const remove = async args => {
    const MasterKey = decrypt(config.get("MasterKey"))
    
    if (args[0] == commands[3] && args[1]) {
        master_key = await input.password("Your masterkey password: ")

        if (master_key == MasterKey) {
            if (args[1] == options.remove[0] || args[1] == options.remove[1]) {
                config.unset("passwords")
            } else {
                config.unset("passwords."+args[1])
            }
        } else {
            console.log(`${color.redBright("Wrong")} master key password!!`);
        }
    }
}

module.exports = remove
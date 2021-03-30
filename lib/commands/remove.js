const editjsonfile = require("edit-json-file")
const color = require("cli-color")
const input = require("input")
const { encrypt, decrypt } = require('../crpyto')
const { commands, options, ConfigPath } = require("../settings")
let config = editjsonfile(ConfigPath, {autosave: true})

const main = args => {
    if (args.includes(options.remove[0]) || args.includes(options.remove[1])) {
        config.unset("passwords")
    } else {
        config.unset("passwords."+args[1])
    }
}

const remove = async args => {
    if (args[0] == commands[3] && args[1]) {
        if (config.get("session_key") && process.env["upm_session"] == decrypt(config.get("session_key"))) {
            main(args)
        } else {
            const MasterKey = decrypt(config.get("MasterKey"))
            master_key = await input.password("Your masterkey password: ")

            if (master_key == MasterKey) {
                main(args)
            } else {
                console.log(`${color.redBright("Wrong")} master key password!!`);
            }
        }
    }
}

module.exports = remove
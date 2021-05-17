import editjsonfile from "edit-json-file"
const color = require("cli-color")
const input = require("input")
const { encrypt, decrypt } = require('../crpyto')
const { ConfigPath, commands, options } = require("../settings")
let config = editjsonfile(ConfigPath, {autosave: true})

const Config = async args => {
    const MasterKey = decrypt(config.get("MasterKey"))

    if (args[0] == commands[0]) {
        console.log(`
1. change master password
        `)

        let choice = await input.text("choice: "); console.log('\n')

        if (choice == 1) {
            let OldPass = await input.password("old master password: ")

            if (OldPass === MasterKey) {
                let NewPass = await input.password("new master password: ")

                config.set("MasterKey", encrypt(NewPass))
                console.log(`\nPassword has been ${color.greenBright("successfully")} saved.`)
            
            } else {
                console.log(`\nold password is ${color.redBright("wrong")}\n`)
            }
        }
    }
}

module.exports = Config
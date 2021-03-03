const editjsonfile = require("edit-json-file")
const color = require("cli-color")
const input = require("input")
const { encrypt, decrypt } = require('../crpyto')
const { commands, options } = require("../settings")
let config = editjsonfile(`/home/${require("os").userInfo().username}/.epm.json`, {autosave: true})

const Config = async args => {
    const MasterKey = decrypt(config.get("MasterKey"))

    if (args[0] == commands[0]) {
        console.log(`
1. change master password
        `)

        choice = await input.text("choice: "); console.log('\n')

        if (choice == 1) {
            OldPass = await input.password("old master password: ")

            if (OldPass === MasterKey) {
                NewPass = await input.password("new master password: ")

                config.set("MasterKey", encrypt(NewPass))
                console.log(`\nPassword has been ${color.greenBright("successfully")} saved.`)
            
            } else {
                console.log(`\nold password is ${color.redBright("wrong")}\n`)
            }
        }
    }
}

module.exports = Config
import editjsonfile from "edit-json-file"
const color = require("cli-color")
const input = require("input")
const { encrypt, decrypt } = require('../crpyto')
const { ConfigPath, commands, options } = require("../settings")
let config = editjsonfile(ConfigPath, {autosave: true})

const main = async (args) => {
    let Domain = await input.text("domain name:")

    if (!config.get(`passwords.${Domain}`)) {
        console.log(`${color.redBright("error")}: invalid domain name `)
        process.exit()
    }

    let Username = await input.text("Username: ")
    let Email = await input.text("Email:")
    let Password = await input.password("password:")

    if (Username)
        config.set(`passwords.${Domain}.username`, encrypt(Username))

    if (Email)
        config.set(`passwords.${Domain}.email`, encrypt(Email))

    if (Password)
        config.set(`passwords.${Domain}.password`, encrypt(Password))
}

const change = async (args) => {
    if (args[0] == commands[4]) {
        if (config.get("session_key") && process.env["upm_session"] == decrypt(config.get("session_key"))) {
            main(args)
        } else {
            const MasterKey = decrypt(config.get("MasterKey"))
            let master_key = await input.password("Your masterkey password: ")

            if (master_key == MasterKey) {
                main(args)
            } else {
                console.log(`${color.redBright("Wrong")} master key password!!`);
            }
        }
    }
}

module.exports = change
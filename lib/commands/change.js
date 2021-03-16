const editjsonfile = require("edit-json-file")
const color = require("cli-color")
const input = require("input")
const { encrypt, decrypt } = require('../crpyto')
const { ConfigPath, commands, options } = require("../settings")
let config = editjsonfile(ConfigPath, {autosave: true})

const generate = length => {
    char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%*=';
    var pass = '';
    
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * char.length);
        pass += char.charAt(i);
    }

    return pass
}

const change = async (args) => {
    if (args[0] == commands[4]) {

        const MasterKey = decrypt(config.get("MasterKey"))

        console.log()
        master_key = await input.password("Your masterkey password: ")

        if (master_key == MasterKey) {

            console.log()
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
        } else {
            console.log(`${color.redBright("Wrong")} master key password!!`);
        }
    }
}

module.exports = change
import editjsonfile from "edit-json-file"
const color = require("cli-color")
const input = require("input")
const { encrypt, decrypt } = require('../crpyto')
const { ConfigPath, commands, options } = require("../settings")
let config = editjsonfile(ConfigPath, {autosave: true})

const generate = (length: number) => {
    let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%*=';
    var pass = '';
    
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * char.length);
        pass += char.charAt(i);
    }

    return pass
}

const main = async args => {
    let Domain = await input.text("Domain name:")
    let Username = await input.text("User name:")
    let Email = await input.text("Email:")
    let Password = await input.password("password:")

    if (!Domain) {
        console.log(`\n- ${color.redBright("error")}: no Domain name`)
        process.exit()
    }

    if (!Username && !Email) {
        console.log(`- ${color.redBright("error")}: username, email field is empty`)
        process.exit()
    }

    if (Username) {
        config.set(`passwords.${Domain}.username`, encrypt(Username))
    }
    if (Email) {
        config.set(`passwords.${Domain}.email`, encrypt(Email))
    }
    if (Password) {
        config.set(`passwords.${Domain}.password`, encrypt(Password))
    } else {
        let length = Math.floor(Math.random() * 38) + 17
        config.set(`passwords.${Domain}.password`, encrypt(generate(length)))
    }
}

const add = async args => {
    if (args[0] == commands[2]) {

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

module.exports = add

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

const add = async args => {
    if (args[0] == commands[2]) {

        console.log(`\n${color.bold(color.redBright("# "))}press enter is none\n`)
        let Domain = await input.text("Domain name:")
        let Username = await input.text("User name:")
        let Email = await input.text("Email:")
        let password = await input.password("password:")

        // if (args[2]) {
            config.set("passwords." + DomainName, encrypt(password))
        // } else {
        //     length = Math.floor(Math.random() * 38) + 17
        //     config.set("passwords." + DomainName, encrypt(generate(length)))        
        // }

        console.log(`\nPassword has been ${color.greenBright("successfully")} saved.`)
    }
}

module.exports = add

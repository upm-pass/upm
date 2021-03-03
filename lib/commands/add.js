const editjsonfile = require("edit-json-file")
const color = require("cli-color")
const input = require("input")
const { encrypt, decrypt } = require('../crpyto')
const { commands, options } = require("../settings")
let config = editjsonfile(`/home/${require("os").userInfo().username}/.epm.json`, {autosave: true})

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
    if (args[0] == commands[2] && args[1]) {
        DomainName = args[1]

        if (args[2]) {
            config.set("passwords." + DomainName, encrypt(args[2]))
        } else {
            length = Math.floor(Math.random() * 18) + 9
            config.set("passwords." + DomainName, encrypt(generate(length)))        
        }

        console.log(`\nPassword has been ${color.greenBright("successfully")} saved.`)
    }
}

module.exports = add
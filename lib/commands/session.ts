const editjsonfile = require("edit-json-file")
const color = require("cli-color")
const input = require("input")
const { encrypt, decrypt } = require('../crpyto')
const { commands, options, ConfigPath } = require("../settings")
let config = editjsonfile(ConfigPath, {autosave: true})

const session = (args) => {
    if (args[0] == commands[6]) {
        if (args.includes(options.session[1])) {
            start(args)
        }

        else if (args.includes(options.session[2])) {
            stop_session()
        }
    }
}


const start = async (args) => {
    const MasterKey = decrypt(config.get("MasterKey"))

    if (process.env["upm_session"] && !args.includes(options.session[0])) {
        console.log("session is already started use -f to force process")
        process.exit()
    }

    let master_key = await input.password("Your masterkey password: ")

    if (master_key == MasterKey) {
        const session_key = generate(Math.floor(Math.random() * 28) + 18)
        console.log(`copy this command to start new session
export upm_session="${session_key}"
`)
        config.set("session_key", encrypt(session_key))

    } else {
        console.log(`${color.redBright("Wrong")} master key password!!`);
    }
}

const stop_session = async () => {
    config.unset("session_key")
}

const generate = length => {
    let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.?-';
    var pass = '';
    
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * char.length);
        pass += char.charAt(i);
    }

    return pass
}


module.exports = session
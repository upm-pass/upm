const editjsonfile = require("edit-json-file")
const color = require("cli-color")
const input = require("input")
const { encrypt, decrypt } = require('../crpyto')
const { commands, options } = require("../settings")
let config = editjsonfile("/home/senpai/.epm.json", {autosave: true})

const ls = async args => {
    const MasterKey = decrypt(config.get("MasterKey"))

    if (args[0] == commands[1]) {
        console.log("\n")

        if (args[1]) {
            master_key = await input.password("Your masterkey password: ")

            if (master_key == MasterKey) {
                console.log(`\n${color.greenBright("Domain")}\t\t${color.blueBright("password")}\n--------------------------------`);

                if (args[1] == options.ls[0] || args[1] == options.ls[1]) {

                    passwords = config.get("passwords")
                    for (var key in passwords) {

                        let unhash = decrypt(passwords[key])
                        console.log(`${color.greenBright(key)}\t\t${color.blueBright(unhash)}`);
                    }
                } else if (args[1] == options.ls[2] || args[1] == options.ls[3]) {
                    passwords = config.get("passwords")

                    for (var key in passwords) {
                        let star = ""
                        for (var i = 0; i < decrypt(passwords[key]).length; i++) star += "*"

                        console.log(`${color.greenBright(key)}\t\t${color.blueBright(star)}`);
                    }
                } else if (!config.get("passwords."+args[1])) {
                    console.log(`\n${color.redBright("error")}: can't find ${color.redBright(args[1])}\n`)
                }

                else {
                    console.log(`${color.greenBright(args[1])}\t\t${color.blueBright(decrypt(config.get("passwords."+args[1])))}`);
                }

            } else {
                console.log(`${color.redBright("Wrong")} master key password!!`);
            }

        } else {
            console.log(`Domain name ${color.redBright("not provided")}!!`);
        }

    }
}

module.exports = ls
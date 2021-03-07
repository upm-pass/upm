const editjsonfile = require("edit-json-file")
const color = require("cli-color")
const input = require("input")
const { encrypt, decrypt } = require('../crpyto')
const { tableconfig, commands, options } = require("../settings")
const { table } = require("table")
let config = editjsonfile(`/home/${require("os").userInfo().username}/.epm.json`, {autosave: true})

let data = [["Domain", "password"]]

const DataTable = () => console.log(table(data, tableconfig))

const ls = async args => {
    const MasterKey = decrypt(config.get("MasterKey"))

    if (args[0] == commands[1]) {
        console.log("\n")

        if (args[1]) {
            master_key = await input.password("Your masterkey password: ")

            if (master_key == MasterKey) {
                // console.log(`\n${color.greenBright("Domain".padEnd(15, " "))}${color.blueBright("password")}\n--------------------------------`);

                if (args[1] == options.ls[0] || args[1] == options.ls[1]) {

                    passwords = config.get("passwords")
                    for (var key in passwords) {

                        let unhash = decrypt(passwords[key])
                        data.push([key, unhash])
                    }
                    DataTable()

                } else if (args[1] == options.ls[2] || args[1] == options.ls[3]) {
                    passwords = config.get("passwords")

                    for (var key in passwords) {
                        let star = ""
                        for (var i = 0; i < decrypt(passwords[key]).length; i++) star += "*"
                        data.push([key, star])
                    }
                    DataTable()

                } else if (!config.get("passwords."+args[1])) {
                    console.log(`\n${color.redBright("error")}: can't find ${color.redBright(args[1])}\n`)
                }

                else {
                    data.push([args[1], decrypt(config.get("passwords."+args[1]))])
                    DataTable()
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
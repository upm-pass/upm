const editjsonfile = require("edit-json-file")
const color = require("cli-color")
const input = require("input")
const { encrypt, decrypt } = require('../crpyto')
const { tableconfig, ConfigPath, commands, options } = require("../settings")
const { table } = require("table")
let config = editjsonfile(ConfigPath, {autosave: true})

let data = [["index", "Domain", "Username", "Email", "password"]]

const DataTable = () => console.log(table(data, tableconfig))

let index = 1

const ls = async args => {
    const MasterKey = decrypt(config.get("MasterKey"))

    if (args[0] == commands[1]) {
        console.log("\n")

        if (args[1]) {
            master_key = await input.password("Your masterkey password: ")

            if (master_key == MasterKey) {

                if (args[1] == options.ls[0] || args[1] == options.ls[1]) {

                    passwords = config.get("passwords")
                    for (var key in passwords) {

                        let username = passwords[key].username != undefined ? decrypt(passwords[key].username) : ""
                        let email = passwords[key].email != undefined ? decrypt(passwords[key].email) : ""
                        let password = passwords[key].password != undefined ? decrypt(passwords[key].password) : ""

                        data.push([index, key, username, email, password])
                        index += 1
                    }
                    DataTable()

                } else if (args[1] == options.ls[2] || args[1] == options.ls[3]) {
                    passwords = config.get("passwords")

                    for (var key in passwords) {
                        let star = ""
                        for (var i = 0; i < decrypt(passwords[key].password).length; i++) star += "*"
                        
                        let username = passwords[key].username != undefined ? decrypt(passwords[key].username) : ""
                        let email = passwords[key].email != undefined ? decrypt(passwords[key].email) : ""
                        
                        data.push([index, key, username, email, star])
                        index += 1
                    }
                    DataTable()

                } else if (!config.get("passwords."+args[1])) {
                    console.log(`\n${color.redBright("error")}: can't find ${color.redBright(args[1])}\n`)
                }

                else {
                    domain = config.get(`passwords.${args[1]}`)

                    let username = domain.username != undefined ? decrypt(domain.username) : ""
                    let email = domain.email != undefined ? decrypt(domain.email) : ""
                    let password = domain.password != undefined ? decrypt(domain.password) : ""

                    data.push([index, args[1], username, email, password])
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
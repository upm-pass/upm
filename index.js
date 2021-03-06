#!/usr/bin/env node

const color = require("cli-color")
const editjsonfile = require("edit-json-file")
const input = require("input")
const table = require("table")
const { encrypt, decrypt } = require('./lib/crpyto')
const { commands, options } = require("./lib/settings")
let config = editjsonfile(`/home/${require("os").userInfo().username}/.epm.json`, {autosave: true})

// import commands
const Config = require("./lib/commands/config")
const ls     = require("./lib/commands/ls")
const add    = require("./lib/commands/add")
const remove = require("./lib/commands/remove")
const help   = require("./lib/commands/help") 
const backup = require("./lib/commands/backup")

const [,, ...args] = process.argv


const app = async () => {
    if (!config.get("MasterKey")) {
        console.log(`
${color.blueBright("Welcome")}, to epm setup
 You need to give me a master key
  To see, edit, remove passwords.

        `)

        Masterkey  = await input.password("Master key: ")
        ReMasterkey = await input.password("Retype - Master key: ")

        if (Masterkey != ReMasterkey) {
            console.log(`\nRetype - Master key ${color.redBright("does not match")} Master key password`)
        } else {
            config.set("MasterKey", encrypt(Masterkey))
            console.log("\nPassword has been successfully saved.");
        }

        process.exit()
    }

    Config(args) // config  command
    ls(args)     // ls      command
    add(args)    // add     command
    remove(args) // remove  command
    backup(args) // backup  command
    help(args)   // help    command

}

app()

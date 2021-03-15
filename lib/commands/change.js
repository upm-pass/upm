const editjsonfile = require("edit-json-file")
const color = require("cli-color")
const input = require("input")
const { encrypt, decrypt } = require('../crpyto')
const { ConfigPath, commands, options } = require("../settings")
let config = editjsonfile(ConfigPath, {autosave: true})

const change = async (args) => {
    if (args[0] == commands[4]) {

        console.log()
        console.log(`Enter Domain name to edit `)
        let Domain = await input.text(":")

    }



}

module.exports = change
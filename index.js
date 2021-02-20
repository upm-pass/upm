#!/usr/bin/env node

const color = require("cli-color")
const editjsonfile = require("edit-json-file")
const input = require("input")
let config = editjsonfile("/home/senpai/epm.json", {autosave: true})

const [,, ...args] = process.argv

const commands = [
    'config',
    'ls',
    'add',
    'remove'
]

const options = {
    "config": [""],
    "ls": ["-a", "--all", "-d", "--domain"],
    "add": [""],
    "remove": ["-a", "--all"]
}

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
            config.set("MasterKey", Masterkey)
            console.log("\nPassword has been successfully saved.");
        }

        process.exit()
    }

    if (args[0] == commands[0]) {
        console.log(`
1. change master password
        `)

        choice = await input.text("choice: "); console.log('\n')
        
        if (choice == 1) {
            OldPass = await input.text("old master password: ")

            if (OldPass === config.get("MasterKey")) {
                NewPass = await input.text("new master password: ")
                
                config.set("MasterKey", NewPass)
                console.log(`\nPassword has been ${color.greenBright("successfully")} saved.`)
            
            } else {
                console.log(`\nold password is ${color.redBright("wrong")}\n`)
            }
        }
    }

    if (args[0] == commands[1]) {
        console.log("\n")

        if (args[1]) {
            Masterkey = await input.password("Your masterkey password: ")

            if (Masterkey == config.get("MasterKey")) {
                console.log(`\n${color.greenBright("Domain")}\t\t${color.blueBright("password")}\n--------------------------------`);

                if (args[1] == options.ls[0] || args[1] == options.ls[1]) {

                    passwords = config.get("passwords")
                    for (var key in passwords) {
                        console.log(`${color.greenBright(key)}\t\t${color.blueBright(passwords[key])}`);
                    }
                    
                } 
                else if (args[1] == options.ls[2] || args[1] == options.ls[3]) {
                    passwords = config.get("passwords")
                    for (var key in passwords) {
                        console.log(`${color.greenBright(key)}\t\t${color.blueBright("???")}`);
                    }
                }

                else {
                    console.log(`${color.greenBright(args[1])}\t\t${color.blueBright(config.get("passwords."+args[1]))}`);
                }

            } else {
                console.log(`${color.redBright("Wrong")} master key password!!`);
            }

        } else {
            console.log(`Domain name ${color.redBright("not provided")}!!`);
        }

    }

    if (args[0] == commands[2] && args[1]) {
        DomainName = args[1]
        password = await input.password(`password for ${DomainName}: `)
        config.set("passwords." + DomainName, password)
        console.log(`\nPassword has been ${color.greenBright("successfully")} saved.`)
    }

    if (args[0] == commands[3] && args[1]) {
        Masterkey = await input.password("Your masterkey password: ")

        if (Masterkey == config.get("MasterKey")) {
            if (args[1] == options.remove[0] || args[1] == options.remove[1]) {
                config.unset("passwords")
            } else {
                config.unset("passwords."+args[1])
            }
        } else {
            console.log(`${color.redBright("Wrong")} master key password!!`);
        }
    }

    if (args[0] == 'help' || args[0] == '-h' || args[0] == '--help') {
        console.log("commands: ");
        for (var i in commands) {
            optionName = commands[i]
            console.log(`\t${commands[i]}\t\t${options[optionName]}`);
        }
    }

}

app()

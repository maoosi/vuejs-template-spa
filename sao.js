const superb = require('superb')
const camelcase = require('camelcase')

module.exports = {
    templateOptions: {
        context: {
            camelcase
        }
    },
    prompts: {
        name: {
            message: 'What is the name of your project?',
            default: ':folderName:',
            filter: val => val.toLowerCase()
        },
        description: {
            message: 'How would you describe your project?',
            default: `my ${superb()} project`
        }
    },
    move: {
        'gitignore': '.gitignore'
    },
    skipInterpolation: [
        '*/**',
        '.*',
        'index.ejs'
    ],
    showTip: true,
    gitInit: true,
    installDependencies: true,
    yarnInstall: true,
    post({
        log,
        chalk,
        isNewFolder,
        folderName
    }) {
        log.success('Done!')
        if (isNewFolder) {
            log.info(`cd ${chalk.yellow(folderName)} to get started!`)
        }
    }
}

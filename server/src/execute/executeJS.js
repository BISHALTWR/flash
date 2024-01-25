const fs = require('fs').promises;
const { exec } = require('child_process');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const execAsync = util.promisify(exec);

const executeJS = async (req, res) => {
    console.log(req.body.code);
    const codeInput = req.body.code;

    try {
        await writeFile('code.js', codeInput);
        const { stdout } = await execAsync('nodejs code.js');
        console.log(`output is: \n${stdout}`);
        res.send(`output is: \n${stdout}`);
    } catch (error) {
        console.error(`Error executing code: ${error.message}`);
        res.status(500).send(`Error executing code: ${error.message}`);
    }
};

module.exports = { executeJS };

// https://nodejs.org/api/child_process.html#child_processexecfilefile-args-options-callback
const fs = require('fs').promises;
const util = require('util');

const writeFile = (fs.writeFile);
const exec = util.promisify(require('child_process').exec);

const executeJS = async (req, res) => {
    // console.log(req.body.code);
    
    try {
        const codeInput = req.body.code;
        await writeFile('./code.js', codeInput)
        .then(async () => {
            // return_value = await execFile('cat',['./code.js'])
            let return_value = await exec('node ./code.js',{timeout: 50000})
            let output = return_value.stdout;
            // let err = return_value.error;
            return res.status(200).json({ msg: "Ran Successfully",output});
        });

    } catch (error) {
        // console.error(`Error executing code: ${error.message}`);
        return res.status(500).json({err: `Error executing code. Please check it again`})
    }
};

module.exports = { executeJS };
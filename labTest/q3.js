const fs = require("fs");
const path = require("path");

const logsDir = path.join(__dirname, "Logs");

if (fs.existsSync(logsDir)) {
    console.log("if found logs Remove files");

    fs.readdirSync(logsDir).forEach(file => {
        console.log(`Delete file: ${file}`);
        fs.unlinkSync(path.join(logsDir, file));
    });

    fs.rmdirSync(logsDir);
    console.log("Logs removed.");
} else {
    console.log("No Logs Creating them");

    fs.mkdirSync(logsDir);

    process.chdir(logsDir);

    [...Array(10).keys()].forEach(i => {
        const fileName = `log${i}.txt`;
        fs.writeFileSync(fileName, `file number ${i}`);
        console.log(`Created: ${fileName}`);
    });

    console.log("All log files created successfully.");
}

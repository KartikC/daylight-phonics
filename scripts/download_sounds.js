const fs = require('fs');
const https = require('https');
const path = require('path');

const soundsDir = path.join(__dirname, '../assets/sounds');

if (!fs.existsSync(soundsDir)) {
    fs.mkdirSync(soundsDir, { recursive: true });
}

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

letters.forEach(letter => {
    const url = `https://raw.githubusercontent.com/bblodget/Letter_Sounds/main/sounds/${letter}.ogg`;
    const dest = path.join(soundsDir, `${letter}.ogg`);

    const file = fs.createWriteStream(dest);
    https.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(() => {
                console.log(`Downloaded ${letter}.ogg`);
            });
        });
    }).on('error', function (err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        console.error(`Error downloading ${letter}.ogg: ${err.message}`);
    });
});

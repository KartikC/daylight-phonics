const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegPath);

const soundsDir = path.join(__dirname, '../assets/sounds');
const files = fs.readdirSync(soundsDir).filter(file => file.endsWith('.ogg'));

console.log(`Found ${files.length} .ogg files to convert.`);

files.forEach(file => {
    const inputPath = path.join(soundsDir, file);
    const outputPath = path.join(soundsDir, file.replace('.ogg', '.mp3'));

    ffmpeg(inputPath)
        .toFormat('mp3')
        .on('error', (err) => {
            console.error(`An error occurred converting ${file}: ` + err.message);
        })
        .on('end', () => {
            console.log(`Converted ${file} to mp3`);
            // Optional: delete original ogg file
            // fs.unlinkSync(inputPath);
        })
        .save(outputPath);
});

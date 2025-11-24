# Daylight Phonics Soundboard

A phonics soundboard app designed for the Daylight Android tablet, built with Expo and React Native.

## Features

- **Alphabet Grid**: Large, touch-friendly buttons for each letter A-Z
- **Letter Display**: Shows selected letter in 4 styles:
  - Standard Uppercase
  - Standard Lowercase  
  - Cursive Uppercase
  - Cursive Lowercase
- **Audio Playback**: Plays phonics sounds using Text-to-Speech
- **High Contrast Design**: Optimized for Daylight tablet's e-paper-like display

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI

### Installation

```bash
npm install
```

### Running the App

```bash
npx expo start
```

Then:
- Press `a` to run on Android
- Press `i` to run on iOS
- Press `w` to run on Web

## Project Structure

```
phonics-soundboard/
├── components/
│   ├── LetterDisplay.js    # Top display showing letter variants
│   ├── LetterButton.js     # Individual letter button
│   └── SoundBoard.js       # Grid of all letter buttons
├── data/
│   └── alphabet.js         # Alphabet data with phonics words
├── assets/
│   └── sounds/             # (Future) Custom audio files
└── App.js                  # Main app component
```

## Future Enhancements

- Settings screen to toggle specific letters
- Custom phonics audio files
- Additional phonics exercises

## License

MIT

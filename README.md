# Food

This project was created for personal practice in utilizing JavaScript and various additional technologies. Here you can find implementations of:
1. Calculator
2. Modal windows
3. Forms
4. Slider
5. Tabs
6. Timer

## Технологии

#### Web-Pack

In this project, I utilized modules with ES6 Modules syntax. Modules are necessary to segment JavaScript files for specific tasks. This is essential for ease of editing and readability of the JavaScript code. Otherwise, you might find it unpleasant to read and edit a JavaScript file with 20,000 lines or more.

## Installation

To use this project, you'll need to:

1. Clone this project to your computer using the command (git clone https://github.com/Waterfallllllll/Food.git your_folder)
2. Next, download all npm packages. In this project, we have 2 npm packages, so you'll need to type (npm i) in the terminal for the root folder. Then, navigate to the webpack-demo folder using the command (cd webpack-demo) and again type (npm i).

## Usage

To ensure the project runs smoothly, we need to start certain technologies:

1. If you wish to edit or add something to JavaScript, start webpack (npx webpack) to track your edits.
2. Also, for our modal windows and forms to function properly, start the json server (json-server src/db.json). Our forms retrieve data from the db.json database, while the modal windows write the entered data to the db.json database.
3. You'll also need to have openserver for the submission of data from the modal windows to work. The combination of json-server and openserver mimics the functioning of a real hosting environment.
/* eslint-disable linebreak-style */
"use strict";

let path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/js/main.js",
    output: {
        filename: "bundle.js",
        path: __dirname + "/src/js"
    },
    watch: true,

    devtool: "source-map",

    module: { // Какие модули будем использовать
        rules: [ // Правила в виде массива, которые будут действовать для определенных файлов.
            {
                test: /\.m?js$/, // Находим наши джсные файлы
                exclude: /(node_modules|bower_components)/, // файлы, которые мы должны исключить из этой выборки.
                use: { // Говорим как и что мы будем использовать.
                    loader: "babel-loader", // Это дополнительная технология которая будет связывать наш webpack вместе с babel. И чтобы всё это работало нам понадобится его установить(npm i --save-dev babel-loader).
                    options: { // Описываем опции которые будут использоваться.
                        presets: [["@babel/preset-env", {   
                            debug: true,    // Позволяет прямо во время компиляции увидеть что там происходит, какие могут быть проблемы и так далее
                            corejs: 3,  // Нам ещё нужна библиотека которая подключает все возможные полифилы. И у неё есть приятная фишка. Допустим у меня есть все полифилы которые установлены с babel. Некоторые из них мне не нужны, и библиотека core-js(npm i --save-dev core-js) позволяет просмотреть весь код, и выбрать полифилы которые нам нужны, а остальные выкинуть.
                            useBuiltIns: "usage" // Позволяет выбрать полифилы которые мне нужны.
                        }]]
                    }
                }
            }
        ]
    }
};

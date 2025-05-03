const gulp = require('gulp');
const fs = require('fs');
const rename = require('gulp-rename');
const svgstore = require('gulp-svgstore');
const through = require('through2');


const SVG_FILES_DIR = './css/svg-icons/';
const PATH_TO_SVG_TEMPLATE = './gulp-tasks/tour-card-svg-template.tsx';
const OUTPUT_COMPONENT_PATH = './src/SVGBundle.tsx';


function buildSvgSpriteComponent() {
    return gulp.src(`${SVG_FILES_DIR}/*.svg`)
        .pipe(rename({ prefix: 'icon-' }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(createComponent())
}

function createComponent() {
    'use strict';
    return through.obj((svgFile, encoding, callback) => {
        if (!!svgFile.contents) {
            let svgFileContent = svgFile.contents.toString('utf8');
            svgFileContent = svgFileContent.replace(/class=/g, 'className=');
            svgFileContent = svgFileContent.replace(/fill-rule=/g, 'fill=');
            let templateData = fs.readFileSync(PATH_TO_SVG_TEMPLATE, 'utf8');
            let svgBodyMatch = svgFileContent.match(/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg">([\d\D]+)<\/svg>/);
            templateData = templateData.replace('[svgContent]', svgBodyMatch[1] || '');
            fs.writeFile(OUTPUT_COMPONENT_PATH, templateData, 'utf-8', (err) => {
                if (!!err) {
                    console.log(err);
                }
            });
        }
        return callback();
    });
}

module.exports = buildSvgSpriteComponent;

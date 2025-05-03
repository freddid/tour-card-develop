const through = require('through2');
const gutil = require('gulp-util');
const rext = require('replace-ext');


const plugin = 'build-general-constants';

function buildGeneralConstants(username) {
    username = username ? username : 'release';
    return through.obj(function (configFile, encoding, callback) {
        if (configFile.isNull() || configFile.isDirectory()) {
            this.push(configFile);
            return callback();
        }
        if (configFile.isStream()) {
            this.emit('error', new gutil.PluginError({
                plugin,
                message: 'Streams are not supported.'
            }));
            return callback();
        }
        const content = configFile.contents.toString('utf8');
        const config = JSON.parse(content);
        configFile.contents = new Buffer (getConstantsFileContent(config[username]), 'utf8');
        configFile.path = rext(configFile.path, '.ts');
        this.push(configFile);
        return callback(null, configFile);
    });
}

function getConstantsFileContent(namespace) {
    'use strict';
    let result = '';
    for (const constName in namespace) {
        if (typeof namespace[constName] === 'string') {
            result += `export const ${constName} = '${namespace[constName]}';`;
        } else {
            result += `export const ${constName} = ${namespace[constName]};`;
        }
        result += '\n\n';
    }
    return result;
}

module.exports = buildGeneralConstants;

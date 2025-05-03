'use strict';

/**
 * В параметре content будет приходить строка с константами в формате:
 * MODULE_HOST_NAME--module.sletat.ru---CLAIMS_HOST_NAME--claims.sletat.ru
 *
 * В параметре configuration приходит конфигурация в которой будет собран проект.
 * По умолчанию - Test
 */

const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const configuration = argv.configuration || 'Test';
const passedConfig = parseConfiguration(argv.content, configuration);
const apiConstsPath = './sletat-api-services-consts.json';


fs.readFile(apiConstsPath, (err, data) => {
    if (err) {
        throw err;
    }
    const config = JSON.parse(data);
    for (const service in passedConfig) {
        if (passedConfig.hasOwnProperty(service)) {
            // SRVADMIN-340: чтобы новые параметры из CI не приводили к исключению в старых ветках
            if (config[service]) {
                config[service] = Object.assign(config[service], passedConfig[service]);
            } else {
                console.log(`api-config-modifier: an unknown service ${service} from CI!`);
            }
        }
    }
    fs.writeFile(apiConstsPath, JSON.stringify(config), (werr) => {
        if (werr) {
            throw werr;
        }
        console.log('Config successfully saved!');
    })
});

function parseConfiguration(data, configuration) {
    const pairs = data.split('---');
    let result = {};
    pairs.forEach((pair) => {
        const nameAndVal = pair.split('--');
        result[nameAndVal[0]] = {};
        result[nameAndVal[0]][configuration] = nameAndVal[1];
    });
    return result;
}

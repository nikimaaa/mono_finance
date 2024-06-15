const fs = require('fs');
const path = require('path');

const mccJSONData = fs.readFileSync(path.resolve(__dirname, 'mcc-ru.json'),
    { encoding: 'utf8', flag: 'r' });
const mccJSONSmiles = fs.readFileSync(path.resolve(__dirname, 'mccSmiles.json'), { encoding: 'utf8', flag: 'r' });

const mccData = JSON.parse(mccJSONData);
const mccSmiles = JSON.parse(mccJSONSmiles);

const result = mccData.reduce((acc, cur) => {
    const {mcc, ...rest} = cur;
    const [smile] = Object.entries(mccSmiles).find((entrie) => {
        return entrie[1].includes(+mcc)
    }) || ["🤷‍♂️", ""];
    acc[mcc] = {...rest, smile};
    return acc;
}, {});

fs.writeFileSync(path.resolve(__dirname, 'mcc-data.json'), JSON.stringify(result, null, 4));
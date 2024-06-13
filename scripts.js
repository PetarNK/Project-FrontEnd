//  Usefull links :
//  http://xpather.com/
//  https://developer.mozilla.org/en-US/docs/Web/API/XPathResult
import * as fetcher from './fetcher.js';
import * as extractor from './extractor.js';
import * as builder from './builder.js';
import { export_table_to_csv } from './ExportToCSV.js';

async function main() {
    const url = 'https://test.ce2s.net/Study.xml';
    const xmlDoc = await fetcher.fetchXML(url);

    const fields = {
        sys_System: ['name'],
        sm_Study: ['name', 'state'],
        sm_Task: ['keyed_name'],
        ar_SimulationResult: [
            'ar_resultname',
            'ar_resultvalue',
            'ar_resultunit',
            'ar_target_met',
        ],
        re_Requirement: ['ar_conditionexp'],
    };

    const headers = Object.keys(fields).reduce((acc, alias) => {
        console.log(alias.split('_')[1]);
        return acc.concat(
            fields[alias].map((field) => `${alias.split('_')[1]} ${field}`)
        );
    }, []);

    const data = Object.entries(fields).reduce((acc, [alias, fieldArray]) => {
        const fieldData = extractor.getFieldData(xmlDoc, alias, fieldArray);
        acc.push(fieldData);
        return acc;
    }, []);

    const table = builder.generateTable(headers, data);

    document
        .getElementById('export-button')
        .addEventListener('click', () => export_table_to_csv('TableToCSVFile'));
}

main();

//  Usefull links :
//  http://xpather.com/
//  https://developer.mozilla.org/en-US/docs/Web/API/XPathResult
import * as fetcher from './fetcher.js';
import * as extractor from './extractor.js';
import * as builder from './builder.js';
import { export_table_to_csv } from './ExportToCSV.js';

async function main() {
    let xmlDoc;
    try {
        const url = 'https://test.ce2s.net/Study.xml';
        xmlDoc = await fetcher.fetchXML(url);
    } catch (e) {
        alert('Fetch was not succesful! Check URL or server!');
        return false;
    }
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
    let headersNames;
    let data;
    try {
        headersNames = Object.keys(fields).flatMap((alias) =>
            fields[alias].map((field) => `${alias.split('_')[1]} ${field}`)
        );

        data = Object.entries(fields).reduce((acc, [alias, fieldArray]) => {
            const fieldData = extractor.getFieldData(xmlDoc, alias, fieldArray);
            acc.push(fieldData);
            return acc;
        }, []);
    } catch (error) {
        console.log('Error during data processing:', error);
        alert('An error occurred while processing the data!');
        return false;
    }
    let table;
    try {
        table = builder.generateTable(headersNames, data);
    } catch (error) {
        console.log('Error during table generating!', error);
        alert('An error has occured while generating the table!');
        return false;
    }
    try {
        document
            .getElementById('export-button')
            .addEventListener('click', () =>
                export_table_to_csv('TableToCSVFile')
            );
    } catch (error) {
        console.log('Error during event binding!', error);
        alert('An error has occured while binding the button!');
        return false;
    }
}

main();

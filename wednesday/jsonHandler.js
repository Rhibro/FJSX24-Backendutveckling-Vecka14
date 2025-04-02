import { readFile, writeFile } from "fs/promises";

// const fs = "fs";
const filePath = 'data.json';

export async function loadJSON() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return null;
    }
}

export async function saveJSON(data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log('File updated!');
    } catch (error) {
        console.error('Error writing file:', error);
    }
}

export async  function updateVersion() {
    const data = loadJSON();
    if (data) {
        data.version += 1;
        saveJSON(data);
        console.log('Updated version:', data.version);
    }
}



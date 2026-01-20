/**
 * Google Sheets CMS Adapter
 * 
 * Instructions for Client:
 * 1. Create a Google Sheet.
 * 2. File > Share > Publish to Web > Select Sheet > Comma-separated values (.csv).
 * 3. Copy the URL.
 * 
 * Usage:
 * const posts = await fetchSheetData("https://docs.google.com/spreadsheets/d/e/.../pub?output=csv");
 */

import { parse } from 'csv-parse/sync';

export interface SheetRow {
    [key: string]: string;
}

export async function fetchSheetData(csvUrl: string): Promise<SheetRow[]> {
    try {
        const response = await fetch(csvUrl, { next: { revalidate: 60 } }); // Cache for 60s
        if (!response.ok) throw new Error(`Failed to fetch sheet: ${response.statusText}`);

        const csvText = await response.text();

        const records = parse(csvText, {
            columns: true, // Use first row as headers
            skip_empty_lines: true,
            trim: true
        });

        return records as SheetRow[];
    } catch (error) {
        console.error("Google Sheets CMS Error:", error);
        return [];
    }
}

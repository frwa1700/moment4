// Course: Webbutveckling III - DT173G
// Assignment: Moment 4
// Author: Fredrik Waldfelt - frwa1700
// Date: 2018-09-24
// Filename: wordcount.ts
// Simple class to load a file and count occurrences of words.
declare function require(name: string)

class wordCount {

    private file: string;
    public data: string;

    private fs = require('fs');

    /* Construtor-function thar runs when new object is made */
    constructor(public fileName: string) {
        this.file = fileName;
        this.loadFile();
    };

    /* Load file and fill thisdata with the files content */
    loadFile() {
        let reg:RegExp = /\W+/g;       
        this.data = this.fs.readFileSync(this.file, 'utf8',  function(err, filedata) {
            if (err) throw err;
            return filedata;
        });
    };

    /* Function to return all words and and number of occurrences of them. Sorted with highest word-count first */
    countWords(): string[] {
        let reg = /\W+/g; // Regex to split at all non-word characters. Global to avoid getting empty strings.
        let clean = this.data.split(reg); // Split data into an array with words.

        let count = {}; // New array to hold the count
        for(let i of clean){
            count[i] = (count[i]||0) + 1; // Fill count with 
        }

        var sorted = []; // Declare a new array
        
        for (let key in count) sorted.push([key, count[key]]); // Create a new array for use - sorted[word] = count;
        sorted.sort(function (a, b) { return a[1] - b[1] }); // Sort the array based on the second element (count)

        return sorted.reverse(); // Return the the sorted array in reverse order
    }

    /* Function to print most popular words in the text. numWords = number of words to return */
    printWordcount(numWords: number) {
       console.log(this.countWords().slice(0,numWords)); // Print to console
        
    }
    
}

/* Time to try this */
var myText = new wordCount('hitch.txt');
myText.printWordcount(10);
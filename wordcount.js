var wordCount = /** @class */ (function () {
    /* Construtor-function thar runs when new object is made */
    function wordCount(fileName) {
        this.fileName = fileName;
        this.fs = require('fs');
        this.file = fileName;
        this.loadFile();
    }
    ;
    /* Load file and fill thisdata with the files content */
    wordCount.prototype.loadFile = function () {
        var reg = /\W+/g;
        this.data = this.fs.readFileSync(this.file, 'utf8', function (err, filedata) {
            if (err)
                throw err;
            return filedata;
        });
    };
    ;
    /* Function to return all words and and number of occurrences of them. Sorted with highest word-count first */
    wordCount.prototype.countWords = function () {
        var reg = /\W+/g; // Regex to split at all non-word characters. Global to avoid getting empty strings.
        var clean = this.data.split(reg); // Split data into an array with words.
        var count = {}; // New array to hold the count
        for (var _i = 0, clean_1 = clean; _i < clean_1.length; _i++) {
            var i = clean_1[_i];
            count[i] = (count[i] || 0) + 1; // Fill count with 
        }
        var sorted = []; // Declare a new array
        for (var key in count)
            sorted.push([key, count[key]]); // Create a new array for use - sorted[word] = count;
        sorted.sort(function (a, b) { return a[1] - b[1]; }); // Sort the array based on the second element (count)
        return sorted.reverse(); // Return the the sorted array in reverse order
    };
    /* Function to print most popular words in the text. numWords = number of words to return */
    wordCount.prototype.printWordcount = function (numWords) {
        console.log(this.countWords().slice(0, numWords)); // Print to console
    };
    return wordCount;
}());
/* Time to try this */
var myText = new wordCount('hitch.txt');
myText.printWordcount(10);

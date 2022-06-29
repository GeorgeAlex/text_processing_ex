"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPositionSumOfWord = exports.splitTextInGroupsOfTwo = exports.getWordsWithHighestFrequency = exports.groupWordsByFrequency = exports.getWordsFrequency = exports.getLongestWordLength = exports.getNumberOfSentences = exports.getAllSentences = exports.getNumberOfWords = exports.getAllWords = void 0;
const WORD_REGEXP = new RegExp('[a-z]+', 'g');
const SENTENCE_REGEXP = new RegExp('[^.]+', 'g');
const getAllWords = (text) => {
    return text.match(WORD_REGEXP) || [];
};
exports.getAllWords = getAllWords;
const getNumberOfWords = (text) => {
    return (0, exports.getAllWords)(text).length;
};
exports.getNumberOfWords = getNumberOfWords;
const getAllSentences = (text) => {
    return text.match(SENTENCE_REGEXP) || [];
};
exports.getAllSentences = getAllSentences;
const getNumberOfSentences = (text) => {
    return (0, exports.getAllSentences)(text).length;
};
exports.getNumberOfSentences = getNumberOfSentences;
const getLongestWordLength = (text) => {
    const allWords = (0, exports.getAllWords)(text);
    let maxLength = 0;
    allWords.forEach(word => {
        if (word.length > maxLength) {
            maxLength = word.length;
        }
    });
    return maxLength;
};
exports.getLongestWordLength = getLongestWordLength;
const getWordsFrequency = (words) => {
    const wordsFrequencyMap = words.reduce((acc, word) => {
        if (!acc[word]) {
            acc[word] = 1;
        }
        else {
            acc[word] = acc[word] + 1;
        }
        return acc;
    }, {});
    return wordsFrequencyMap;
};
exports.getWordsFrequency = getWordsFrequency;
const groupWordsByFrequency = (wordsFrequency) => {
    let groupedByFrequency = {};
    let highestFrequency = 0;
    Object.entries(wordsFrequency).forEach(([word, frequency]) => {
        if (!groupedByFrequency[frequency]) {
            groupedByFrequency[frequency] = [word];
        }
        else {
            groupedByFrequency[frequency].push(word);
        }
        if (frequency > highestFrequency) {
            highestFrequency = frequency;
        }
    });
    return {
        groupedMap: groupedByFrequency,
        highestFrequency,
    };
};
exports.groupWordsByFrequency = groupWordsByFrequency;
const getWordsWithHighestFrequency = (numberOfWordsToPrint, allWordsFrequency) => {
    const { groupedMap, highestFrequency } = (0, exports.groupWordsByFrequency)(allWordsFrequency);
    let currentHighestFrequency = highestFrequency;
    let words = [];
    // Going in reverse order from the highest frequncy get the 6 words
    while (numberOfWordsToPrint > 0) {
        // All the words with the current frequency fit within the number of words that we need to display
        if (groupedMap[currentHighestFrequency].length < numberOfWordsToPrint) {
            words = words.concat(groupedMap[currentHighestFrequency]);
            numberOfWordsToPrint -= groupedMap[currentHighestFrequency].length;
            currentHighestFrequency -= 1;
        }
        else {
            // There are more words with the current frequency than the number of words that we need to display
            // so we get enough words to fill in the required number
            words = words.concat(groupedMap[currentHighestFrequency].slice(0, numberOfWordsToPrint));
            numberOfWordsToPrint = 0;
        }
    }
    return words;
};
exports.getWordsWithHighestFrequency = getWordsWithHighestFrequency;
const splitTextInGroupsOfTwo = (text) => {
    const allWords = (0, exports.getAllWords)(text);
    let groupedByTwo = [];
    allWords.forEach((word, index) => {
        if (index < allWords.length - 1) {
            groupedByTwo.push(`${word} ${allWords[index + 1]}`);
        }
    });
    return groupedByTwo;
};
exports.splitTextInGroupsOfTwo = splitTextInGroupsOfTwo;
const getPositionSumOfWord = (allWords, word) => {
    let positionSum = 0;
    for (let i = 0; i < allWords.length; i++) {
        if (allWords[i] === word) {
            positionSum += i + 1;
        }
    }
    return positionSum;
};
exports.getPositionSumOfWord = getPositionSumOfWord;

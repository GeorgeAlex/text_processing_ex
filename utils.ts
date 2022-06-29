import { WordsFrequency, WordsFrequencyMapWithHighestFrequency } from './types'

const WORD_REGEXP = new RegExp('[a-z]+', 'g')
const SENTENCE_REGEXP = new RegExp('[^.]+', 'g')

export const getAllWords = (text: string): string[] => {
  return text.match(WORD_REGEXP) || []
}

export const getNumberOfWords = (text: string): number => {
  return getAllWords(text).length
}

export const getAllSentences = (text: string): string[] => {
  return text.match(SENTENCE_REGEXP) || []
}

export const getNumberOfSentences = (text: string): number => {
  return getAllSentences(text).length
}

export const getLongestWordLength = (text: string): number => {
  const allWords = getAllWords(text)
  let maxLength = 0

  allWords.forEach(word => {
    if (word.length > maxLength) {
      maxLength = word.length
    }
  })

  return maxLength
}

export const getWordsFrequency = (words: string[]): WordsFrequency => {
  const wordsFrequencyMap = words.reduce((acc, word) => {
    if (!acc[word]) {
      acc[word] = 1
    } else {
      acc[word] = acc[word] + 1
    }

    return acc
  }, {})

  return wordsFrequencyMap
}

export const groupWordsByFrequency = (wordsFrequency: WordsFrequency): WordsFrequencyMapWithHighestFrequency => {
  let groupedByFrequency = {}
  let highestFrequency = 0
  
  Object.entries(wordsFrequency).forEach(([word, frequency]) => {
    if (!groupedByFrequency[frequency]) {
      groupedByFrequency[frequency] = [word]
    } else {
      groupedByFrequency[frequency].push(word)
    }

    if (frequency > highestFrequency) {
      highestFrequency = frequency
    }
  })

  return {
    groupedMap: groupedByFrequency,
    highestFrequency,
  }
}

export const getWordsWithHighestFrequency = (numberOfWordsToPrint: number, allWordsFrequency: WordsFrequency): string[] => {
  const { groupedMap, highestFrequency } = groupWordsByFrequency(allWordsFrequency)
  let currentHighestFrequency = highestFrequency
  let words: string[] = []

  // Going in reverse order from the highest frequncy get the 6 words
  while (numberOfWordsToPrint > 0) {
    // All the words with the current frequency fit within the number of words that we need to display
    if (groupedMap[currentHighestFrequency].length < numberOfWordsToPrint) {
      words = words.concat(groupedMap[currentHighestFrequency])

      numberOfWordsToPrint -= groupedMap[currentHighestFrequency].length
      currentHighestFrequency -= 1
    } else {
      // There are more words with the current frequency than the number of words that we need to display
      // so we get enough words to fill in the required number
      words =  words.concat(groupedMap[currentHighestFrequency].slice(0, numberOfWordsToPrint))

      numberOfWordsToPrint = 0
    }
  }

  return words
}

export const splitTextInGroupsOfTwo = (text: string): string[] => {
  const allWords = getAllWords(text)
  let groupedByTwo: string[] = []

  allWords.forEach((word, index) => {
    if (index < allWords.length - 1) {
      groupedByTwo.push(`${word} ${allWords[index + 1]}`)
    }
  })

  return groupedByTwo
}

export const getPositionSumOfWord = (allWords: string[], word: string): number => {
  let positionSum = 0

  for (let i = 0; i < allWords.length; i++) {
    if (allWords[i] === word) {
      positionSum += i + 1
    }
  }

  return positionSum
}
export type WordsFrequency = Record<string, number>
export type WordsFrequencyByNumber = Record<number, string[]>

export interface WordsFrequencyMapWithHighestFrequency {
  groupedMap: WordsFrequencyByNumber
  highestFrequency: number
}
import {
  getAllWords,
  getNumberOfWords,
  getNumberOfSentences,
  getLongestWordLength,
  getWordsFrequency,
  getWordsWithHighestFrequency,
  getPositionSumOfWord,
  groupWordsByFrequency,
  splitTextInGroupsOfTwo,
} from './utils'

const TEXT = 'lorem ipsum dolor sit amet consectetur lorem ipsum et mihi quoniam et adipiscing elit.sed quoniam et advesperascit et mihi ad villam revertendum est nunc quidem hactenus ex rebus enim timiditas non ex vocabulis nascitur.nummus in croesi divitiis obscuratur pars est tamen divitiarum.nam quibus rebus efficiuntur voluptates eae non sunt in potestate sapientis.hoc mihi cum tuo fratre convenit.qui ita affectus beatum esse numquam probabis duo reges constructio interrete.de hominibus dici non necesse est.eam si varietatem diceres intellegerem ut etiam non dicente te intellego parvi enim primo ortu sic iacent tamquam omnino sine animo sint.ea possunt paria non esse.quamquam tu hanc copiosiorem etiam soles dicere.de quibus cupio scire quid sentias.universa enim illorum ratione cum tota vestra confligendum puto.ut nemo dubitet eorum omnia officia quo spectare quid sequi quid fugere debeant nunc vero a primo quidem mirabiliter occulta natura est nec perspici nec cognosci potest.videmusne ut pueri ne verberibus quidem a contemplandis rebus perquirendisque deterreantur sunt enim prima elementa naturae quibus auctis virtutis quasi germen efficitur.nam ut sint illa vendibiliora haec uberiora certe sunt.cur deinde metrodori liberos commendas.mihi inquam qui te id ipsum rogavi nam adhuc meo fortasse vitio quid ego quaeram non perspicis.quibus ego vehementer assentior.cur iustitia laudatur mihi enim satis est ipsis non satis.quid est enim aliud esse versutum nobis heracleotes ille dionysius flagitiose descivisse videtur a stoicis propter oculorum dolorem.diodorus eius auditor adiungit ad honestatem vacuitatem doloris.nos quidem virtutes sic natae sumus ut tibi serviremus aliud negotii nihil habemus.'

const resolveTasks = () => {
  // Q1
  console.log('Q: How many words are there in the text?')
  const totalWords = getNumberOfWords(TEXT)
  console.log(`A: ${totalWords} words`)
  
  // Q2
  console.log('Q: How many sentences are there in the text?')
  console.log(`A: ${getNumberOfSentences(TEXT)} sentences`)
  
  // Q3
  console.log('Q: What is the length of the longest word?')
  console.log(`A: ${getLongestWordLength(TEXT)} characters`)
  
  // Q4
  console.log('Q: Which six words occur the most in the text?')
  const allWords = getAllWords(TEXT)
  const allWordsFrequency = getWordsFrequency(allWords)
  const words = getWordsWithHighestFrequency(6, allWordsFrequency)
  console.log(`A: ${words}`)

  // Q5
  console.log('Q: What percentage of the words only occur once?')
  const { groupedMap } = groupWordsByFrequency(allWordsFrequency)
  const percentage = (groupedMap['1'].length / getNumberOfWords(TEXT)) * 100
  console.log(`A: ${percentage}%`)

  // Q6
  console.log('Q: What is the average number of words per sentence?')
  // Devide total number of words over the total number of sentences
  console.log(`A: ${getNumberOfWords(TEXT) / getNumberOfSentences(TEXT)} words`)

  // Q7
  console.log('Q: Which three two-word phrases occur the most in the text?')
  const wordsGroupedByTwo = splitTextInGroupsOfTwo(TEXT)
  const wordsGroupedByTwoFrequencyMap = getWordsFrequency(wordsGroupedByTwo)
  const wordsGroupedByTwoMostFrequent = getWordsWithHighestFrequency(3, wordsGroupedByTwoFrequencyMap)
  console.log(`A: ${wordsGroupedByTwoMostFrequent}`)

  // Q BONUS
  console.log('BONUS QUESTION')
  console.log('Q: What is the prominence of the five words that occur the most in the text?')

  const fiveMostFrequentWords = getWordsWithHighestFrequency(5, allWordsFrequency)
  console.log('A:')

  fiveMostFrequentWords.forEach(word => {
    const positionSum = getPositionSumOfWord(allWords, word)
    const positionsNum = TEXT.match(new RegExp(`[\\s|\\.]${word}[\\s|\\.]`, 'g'))!.length
    const prominence = (totalWords - ((positionSum - 1) / positionsNum)) * (100 / totalWords)
    console.log(`${word}: ${prominence}`)
  })
}

resolveTasks()
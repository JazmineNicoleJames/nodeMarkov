/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};

    for(let i=0; i < this.words.length; i++) {
      const currentWord = this.words[i];
      const nextWord = this.words[i +1] || null;

      if(!chains[currentWord]){
        chains[currentWord] = []
      }
      chains[currentWord].push(nextWord)
    }
    this.chains = chains;
  }

  static choice(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Object.keys(this.chains)
    let key = MarkovMachine.choice(keys)

    let finalWord = []

    while(finalWord.length < numWords && key !== null) {
      finalWord.push(key)
      key = MarkovMachine.choice(this.chains[key]);
    }
    return finalWord.join(" ")
  }
}

module.exports = { MarkovMachine }
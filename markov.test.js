const { MarkovMachine } = require('./markov')

test('choose random index', function() {
    let array = [1, 2, 3, 4, 5];
    let res = MarkovMachine.choice(array);

    expect(array).toContain(res)
})

test('make a chain', function() {
    let text = 'the cat in the hat';
    let markovMachine = new MarkovMachine(text)
    markovMachine.makeChains()

    expect(markovMachine.chains).toEqual({
        the: ['cat', 'hat'],
        cat: ['in'],
        in: ['the'],
        hat: [null]
    });
})

test('random text from chain', function() {
    let text = 'the cat in the hat';
    let markovMachine = new MarkovMachine(text)

    let generatedText = markovMachine.makeText(5);
    let generatedWords = generatedText.split(' ');

    expect(generatedWords).toHaveLength(5)
    generatedWords.forEach(word => {
        expect(markovMachine.chains).toHaveProperty(word)
    })
    
})
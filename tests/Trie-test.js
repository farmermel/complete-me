import Node from '../lib/Node';
import Trie from '../lib/Trie';
const { expect } = require('chai');
const fs = require('fs');
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe('Trie', function() {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  })
  
  it('should exist', function() {
    expect(trie).to.exist;
  })

  describe('INSERT', () => {
    it('should add items to the trie', () => {
      trie.insert('fern');
      expect(trie.root.next.f.data).to.equal('f');
      expect(trie.root.next.f.next.e.data).to.equal('e');
      expect(trie.root.next.f.next.e.next.r.next.n.data).to.equal('n');
    })

    it('should insert multiple words', () => {
      trie.insert('sanseveria');
      trie.insert('cactus');

      expect(trie.root.next.s.next.a.data).to.equal('a');
      expect(trie.root.next.c.next.a.next.c.data).to.equal('c');
    })

    it('should track how many words it has', () => {
      trie.insert('ficus');
      trie.insert('marigold');
      trie.insert('oregano');

      expect(trie.count).to.equal(3);
    })

    it('should not increment count if word is a duplicate', () => {
      trie.insert('ficus');
      trie.insert('marigold');
      trie.insert('oregano');
      trie.insert('oregano');

      expect(trie.count).to.equal(3);
    })

    it('should convert uppercase to lowercase', () => {
      trie.insert('IronWood');

      expect(trie.suggest('iron')).to.deep.equal(['ironwood']);
    })

    it('should only take in a string', () => {
      expect(trie.insert({please: 'no'})).to.equal(null);
      expect(trie.insert(9)).to.equal(null);
      expect(trie.insert(['hi', 9, 'please no'])).to.equal(null);
      expect(trie.insert(true)).to.equal(null);
    })
  })

  describe('SUGGEST', () => {
    it('should return an array if no data is passed', () => {
      expect(trie.suggest()).to.deep.equal([]);
    })

    it('should return an array of possibilities', () => {
      trie.insert('helleborus');
      trie.insert('heliotrope');
      trie.insert('heliconia');

      expect(trie.suggest('h')).to.deep.equal(['helleborus', 'heliotrope', 'heliconia'])
    })

    it('should return an array of possibilities when the trie has a lot of words', () => {
      trie.populate(dictionary);

      expect(trie.suggest('heliophob')).to.deep.equal(['heliophobe', 'heliophobia', 'heliophobic', 'heliophobous']);
    })

    it('should not add nonsense to trie', () => {
      trie.populate(dictionary);

      expect(trie.suggest('wasaeha')).to.deep.equal([]);
    })
  })

  describe('FINDNODE', () => {
    it('should find the node of the last letter', function() {
      trie.insert('aloe');

      expect(trie.findNode('al')).to.equal(trie.root.next.a.next.l);
    })

    it('should not add nonsense to trie', () => {
      trie.populate(dictionary);

      expect(trie.findNode('wasaeha')).to.deep.equal([]);
    })

    it('should find uppercase suggestions', () => {
      trie.insert('dogwood');

      expect(trie.findNode('Do')).to.equal(trie.root.next.d.next.o);
    })
  })

  describe('POPULATE', () => {
    it('should insert every word from the dictionary', () => {
      trie.populate(dictionary);

      expect(trie.findNode('was')).to.equal(trie.root.next.w.next.a.next.s)
    })
  })

  describe('SELECT', () => {
    it('should exist', function() {
      expect(trie.select).to.exist;
    })

    it('should increment times selected by 1', () => {
      trie.populate(dictionary);
      trie.select('ash');

      expect(trie.root.next.a.next.s.next.h.rating).to.equal(1);
    })
  })

  describe('SORTARR', () => {
    it('should sort an array by frequency of selection', () => {
      trie.populate(dictionary);

      expect(trie.suggest('pizz')).to.deep.equal(['pizza','pizzeria', 'pizzicato', 'pizzle']);

      trie.select('pizzeria');

      expect(trie.suggest('pizz')).to.deep.equal(['pizzeria','pizza', 'pizzicato', 'pizzle']);
    })

    it('should sort an array with multiple selection values', () => {
      trie.populate(dictionary);

      expect(trie.suggest('pizz')).to.deep.equal(['pizza','pizzeria', 'pizzicato', 'pizzle']);

      trie.select('pizzle');
      trie.select('pizzle');
      trie.select('pizzle');
      trie.select('pizzicato')

      expect(trie.suggest('pizz')).to.deep.equal(['pizzle', 'pizzicato', 'pizza','pizzeria']);
    })
  })

  describe('DELETE', () => {
    it('should delete a suggestion', () => {
      trie.insert('bindweed');
      trie.insert('bilobia');

      trie.delete('bindweed');
      expect(trie.suggest('bi')).to.deep.equal(['bilobia'])
    })
  })
})
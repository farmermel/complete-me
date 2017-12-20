import Node from '../lib/Node';
import Trie from '../lib/Trie';
const { expect } = require('chai');
const fs = require('fs');
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe.only('Trie', function() {
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

    // it('should not make multiple nodes for the same letter', () => {
    //   trie.insert('helleborus');
    //   trie.insert('heliotrope');
    //   trie.insert('heliconia');

    //   expect(trie.findNode('he')).to.equal(trie.findNode('he'))
    // })

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
      // trie.insert('oregano');

      expect(trie.count).to.equal(3);
    })

    it.skip('should not add nonsense to trie', () => {
      trie.populate(dictionary);

      expect(trie.findNode('wasaeha')).to.not.equal(trie.root.next.w.next.a.next.s.next.a.next.e.next.h.next.a)
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
  })

  describe('FINDNODE', () => {
    it('should find the node of the last letter', function() {
      trie.insert('aloe');

      expect(trie.findNode('al')).to.equal(trie.root.next.a.next.l);

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

      expect(trie.root.next.a.next.s.next.h.timesSelected).to.equal(1);
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
})
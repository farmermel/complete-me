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

    it.skip('should not add nonsense to trie', () => {
      trie.populate(dictionary);

      expect(trie.findNode('wasaeha')).to.not.equal(trie.root.next.w.next.a.next.s.next.a.next.e.next.h.next.a)
    })
  })

  describe('SUGGEST', () => {
    it('should return an array', () => {
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
})
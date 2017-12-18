import Node from '../lib/Node';
import Trie from '../lib/Trie';
const { expect } = require('chai');

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
      expect(trie.root.f.data).to.equal('f');
      expect(trie.root.f.e.data).to.equal('e');
      expect(trie.root.f.e.r.n.data).to.equal('n');
    })

    it('should insert multiple words', () => {
      trie.insert('sanseveria');
      trie.insert('cactus');

      expect(trie.root.s.a.data).to.equal('a');
      expect(trie.root.c.a.c.data).to.equal('c');
    })
  })
})
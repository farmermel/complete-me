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
      trie.insert('hello');
      expect(trie.root.h.data).to.equal('h');
      expect(trie.root.h.e.data).to.equal('e');
      expect(trie.root.h.e.l.l.o.data).to.equal('o');
    })
  })
})
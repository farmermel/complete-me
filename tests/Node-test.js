import Node from '../lib/Node';
const { expect } = require('chai');

describe('Node', function() {
  let node;

  beforeEach(() => {
    node = new Node();
  })

  it('should exist', function() {
    expect(node).to.exist;
  })

  it('should null data as default', function() {
    expect(node.data).to.equal(null);
  })

  it('should accept data', function() {
    node = new Node('a');
    
    expect(node.data).to.equal('a');
  })
})
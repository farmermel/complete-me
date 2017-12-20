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

  it('should default to not selected', () => {
    expect(node.isCompleted).to.equal(false);
  })

  it('should have a next object', () => {
    expect(node.next).to.deep.equal({});
  })

  it('should start with selected 0 times', () => {
    expect(node.timesSelected).to.equal(0);
  })
})
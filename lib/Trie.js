import Node from '../lib/Node';

export default class Trie {
  constructor() {
    this.root = new Node();
    this.count = 0;
  }

  insert(data) {
    let letters = data.split('');
    let previousNode;
    let currentNode = this.root;

    this.count++;

    recurse(letters, 0);

    function recurse(letters, index) {
      let letter = letters[index];

      if(!letter) {
        currentNode.isCompleted = true
        return;
      }

      if(!currentNode.next[letter]) {
        currentNode.next[letter] = new Node(letter);
      }

      previousNode = currentNode.next[letter];
      index++;
      currentNode = currentNode.next[letter];

      recurse(letters, index)
    }
  }

  suggest(data) {
    if(!data) {
      return [];
    }
    let currentNode = this.findNode(data);
    let suggestArr = [];
    console.log(currentNode)
    //find every existing descendent of lastNode
    //that is a letter
    //recurse down one path, push completed word
    //go back up and down next path push
    //go back up and down each path pushing into array
    //when there are no more paths return suggestArr
    //base case is all single length keys are traversed

    function makeSuggestion(currentNode, suggestWord) {
    let nextNodeKeys = Object.keys(currentNode);
      nextNodeKeys.forEach( (key, i) => {
        if(!currentNode) {
          return;
        }

        suggestWord += currentNode.data;
        currentNode = currentNode[key]
      })
        return makeSuggestion(currentNode, suggestWord)
    }
      //makeSuggestion should return data from each node
    suggestArr.push(makeSuggestion(currentNode, data));

    return suggestArr;
  }


  // suggest(data) {
  //   if(!data) {
  //     return [];
  //   }
  //   let currentNode = this.findNode(data);
  //   let suggestArr = [];
  //   console.log(currentNode)
  //   //find every existing descendent of lastNode
  //   //that is a letter
  //   //recurse down one path, push completed word
  //   //go back up and down next path push
  //   //go back up and down each path pushing into array
  //   //when there are no more paths return suggestArr
  //   //base case is all single length keys are traversed

  //   makeSuggestion(currentNode, suggestWord) {
  //   let nextNodeKeys = Object.keys(currentNode);
  //     nextNodeKeys.forEach( (key, i) => {
  //       if(!currentNode) {
  //         return;
  //       }

  //       suggestWord += currentNode.data;
  //       currentNode = currentNode[key]
  //     })
  //       return makeSuggestion(currentNode, suggestWord)
  //   }
  //     //makeSuggestion should return data from each node
  //   suggestArray.push(makeSuggestion(currentNode, data));

  //   return suggestArr;
  // }


  findNode(data) {
    let letters = data.split('');
    let currentNode = this.root.next[letters[0]];

    for(let i = 0; i < letters.length - 1; i++) {
      if(currentNode.data !== letters[i]) {
        return false;
      }
      currentNode = currentNode.next[letters[i+1]]
    }

    return currentNode;
  }
}
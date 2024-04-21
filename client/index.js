const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

// Instantiate the MerkleTree
const merkleTree = new MerkleTree(niceList);
const root = merkleTree.getRoot();

async function main(name) {
  // TODO: how do we prove to the server we're on the nice list? 
  // 1. Retrieve the index
  let index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof: proof,
    name: name,
    root: root
  });

  console.log({ gift });
}

main(process.argv[2]);
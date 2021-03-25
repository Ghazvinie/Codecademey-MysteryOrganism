// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(num, dnaArray) {
  return {
    specimenNum: num,
    dna: dnaArray,

    mutate() {
      const randomBaseIndex = Math.floor(Math.random() * this.dna.length);
      const randomBaseNo = Math.floor(Math.random() * 3);
      const bases = { 0: 'A', 1: 'C', 2: 'G', 3: 'T' };
      if (this.dna[randomBaseIndex] === bases[randomBaseNo]) return this.mutate();
      this.dna[randomBaseIndex] = bases[randomBaseNo];
    },

    compareDNA(pAequorObject) {
      const matches = this.dna.reduce((acc, curr, index) => {
        if (curr === pAequorObject.dna[index]) acc += curr;
        return acc;
      }, []).length;
      return `Specimin #${this.specimenNum} and specimin #${pAequorObject.specimenNum} have ${Math.floor(6.6667 * matches)}% DNA in common.`;
    },

    willLikelySurvive() {
      return (this.dna.filter(element => element === 'C' || element === 'G').length * 6.667) >= 60;
    }
  };
}

function generate30() {
  let organismArray = [];
  let i = 0;
  while (organismArray.length !== 30) {
    let organism = pAequorFactory(i, mockUpStrand());
    if (organism.willLikelySurvive()) organismArray.push(organism);
    i ++;
  }
  return organismArray;
}
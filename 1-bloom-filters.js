// here are your hashing functions. it's not essential you know how they work
// a library called xxhashjs is being loaded (as XXH) and we're using three different
// instances of that as your hashing functions
const h1 = string => Math.abs(XXH.h32(0xABCD).update(string).digest().toNumber() % 100);
const h2 = string => Math.abs(XXH.h32(0x1234).update(string).digest().toNumber() % 100);
const h3 = string => Math.abs(XXH.h32(0x6789).update(string).digest().toNumber() % 100);

// fill out these two methods
// `add` adds a string to the bloom filter and returns void (nothing, undefined)
// `contains` takes a string and tells you if a string is maybe in the bloom filter
class BloomFilter {
    constructor(size) {
        this._storage = new Array(size).fill(0);
        this._hashingFuncs = [h1, h2, h3];
    }
  // you'll probably need some instance variables
  add (string) {
    // use all hashing funcs and flip bits accordingly
    this._hashingFuncs.forEach(h => {
        this._storage[h(string)] = 1;
    });
  }
  contains (string) {
    let maybeInFilter = true;

    // use all hashing funcs and check bits
    this._hashingFuncs.forEach(h => {
        if (this._storage[h(string)] === 0) maybeInFilter = false;
    });

    return maybeInFilter;
  }
};

// // unit tests
// // do not modify the below code
// describe('BloomFilter', function() {
//   let bf;
//   beforeEach(() => {
//     bf = new BloomFilter;
//   })
//   it('returns false when empty', () => {
//     expect(bf.contains("Brian")).toBe(false);
//     expect(bf.contains("Sarah")).toBe(false);
//     expect(bf.contains("Simona")).toBe(false);
//   });
//   it('handles one item', () => {
//     expect(bf.contains("Brian")).toBe(false);
//     bf.add("Brian");
//     expect(bf.contains("Brian")).toBe(true);
//     expect(bf.contains("Sarah")).toBe(false);
//     expect(bf.contains("Simona")).toBe(false);
//   });
//   it('handles many items', () => {
//     const names = ["Brian", "Simona", "Sarah", "Asim", "John", "Sean", "Jessie", "Paige", "Ashley"];
//     names.forEach((item) => bf.add(item));
//     names.forEach((item) => expect(bf.contains(item)).toBe(true));
//     ["Sam", "Chris", "Taylor", "Florence"].forEach((item) => expect(bf.contains(item)).toBe(false));
//   });
// });
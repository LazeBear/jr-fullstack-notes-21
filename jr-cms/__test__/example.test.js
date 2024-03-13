function sum(a, b) {
  return a + b;
}

// test case

// h1
describe('sum', () => {
  it('should return correct sum of two numbers', () => {
    // setup (mock, initialize variables)

    // execute
    const result = sum(1, 2);
    // compare
    // expect (actual result) matching (expected result)
    expect(result).toBe(3);
  });
  // test()

  // h2
  // describe("xxxx",()=>{})
});

// describe()

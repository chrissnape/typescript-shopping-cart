const index = require('./index');

test('1 apple should equal 50', () => {
  expect(index.checkout(['A99'])).toBe(50);
});

test('3 apples should equal 130', () => {
  expect(index.checkout(['A99', 'A99', 'A99'])).toBe(130);
});

test('1 banana should equal 30', () => {
  expect(index.checkout(['B15'])).toBe(30);
});

test('2 bananas should equal 45', () => {
  expect(index.checkout(['B15', 'B15', 'B15'])).toBe(45);
});

test('1 cherry should equal 60', () => {
  expect(index.checkout(['C40'])).toBe(60);
});

test('1 tangerine should equal 99', () => {
  expect(index.checkout(['T34'])).toBe(99);
});

test('5 apples should equal 230', () => {
  expect(index.checkout(['A99', 'A99', 'A99', 'A99', 'A99'])).toBe(230);
});

test('3 apples and 2 bananas should equal 175', () => {
  expect(index.checkout(['A99', 'A99', 'A99', 'B15', 'B15'])).toBe(175);
});

test('3 apples and 3 bananas should equal 205', () => {
  expect(index.checkout(['A99', 'A99', 'A99', 'B15', 'B15', 'B15'])).toBe(205);
});

test('1 cherry and 1 tangerine should equal 159', () => {
  expect(index.checkout(['T34', 'C40'])).toBe(159);
});

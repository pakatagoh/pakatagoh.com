import formatDate from './formatDate';

describe('formatDate', () => {
  test('should format date to 01 Aug 2019 ', () => {
    const inputDate = '2019-08-01';
    const expectedDate = '01 Aug 2019';

    expect(formatDate(inputDate)).toBe(expectedDate);
  });
});

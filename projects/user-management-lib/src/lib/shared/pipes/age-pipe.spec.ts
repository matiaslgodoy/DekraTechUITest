import { AgePipe } from './age-pipe';

describe('AgePipe', () => {
  let pipe: AgePipe;

  beforeEach(() => {
    pipe = new AgePipe();
  });

  it('should accept date strings in ISO format', () => {
    const today = new Date();
    const birthYear = today.getFullYear() - 20;
    // Formato 'YYYY-01-01'
    const dateString = `${birthYear}-01-01`;

    const result = pipe.transform(dateString);
    expect(typeof result).toBe('number');
  });

  it('should return empty string for future dates', () => {
    const today = new Date();
    const futureDate = new Date(
      today.getFullYear() + 5,
      today.getMonth(),
      today.getDate(),
    );

    expect(pipe.transform(futureDate)).toBe('');
  });
});

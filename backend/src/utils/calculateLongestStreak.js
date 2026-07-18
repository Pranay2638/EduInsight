export const calculateLongestStreak = (studyDates) => {
  if (!studyDates || studyDates.length === 0) return 0;

  const uniqueDates = [
    ...new Set(
      studyDates.map((date) =>
        new Date(date).toISOString().split("T")[0]
      )
    ),
  ].sort();

  let longest = 1;
  let current = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const previous = new Date(uniqueDates[i - 1]);
    const currentDate = new Date(uniqueDates[i]);

    const difference =
      (currentDate - previous) / (1000 * 60 * 60 * 24);

    if (difference === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
};
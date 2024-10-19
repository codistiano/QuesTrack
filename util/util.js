export function calculateDateDifference(startDate, endDate){
    const from = new Date(startDate);
    const to = new Date(endDate);
    return Math.floor(
      (to - from) / (1000 * 60 * 60 * 24)
    ) + 1;
  }
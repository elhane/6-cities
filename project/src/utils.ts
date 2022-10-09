
export const getPercentRatio = (number:number, from: number): number => (number / from) * 100;

export const getMonth = (monthNumber: number): string => {
  const monthsList = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  return monthsList[monthNumber];
};

export const getFormattedDate = (dateString: string) => {
  const getCommentDate = new Date(dateString);
  const year = getCommentDate.getFullYear();
  const month = getMonth(getCommentDate.getMonth());

  return `${month} ${year}`;
};

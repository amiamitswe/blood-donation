export const checkIsEligible = (lastData: Date) => {
  // @ts-ignore
  return (Math.floor((new Date() - new Date(lastData)) / (24 * 60 * 60 * 1000))) >= 90;
};
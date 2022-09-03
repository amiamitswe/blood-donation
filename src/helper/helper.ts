export const checkIsEligible = (lastData: Date, day = 90) => {
  // @ts-ignore
  return (Math.floor((new Date() - new Date(lastData)) / (24 * 60 * 60 * 1000))) >= day;
};
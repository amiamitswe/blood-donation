// @ts-nocheck

export const checkIsEligible = (lastData: Date, day = 90) => {
  return Math.floor((new Date() - new Date(lastData)) / (24 * 60 * 60 * 1000)) >= day;
};

export const getAge = (dob: Date, day = 90) => {
  return Math.floor((new Date() - new Date(dob)) / (24 * 60 * 60 * 1000 * 12 * 30));
};

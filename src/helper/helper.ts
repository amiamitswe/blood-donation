// @ts-nocheck

export const checkIsEligible = (lastData: Date, day = 90) => {
  return Math.floor((new Date() - new Date(lastData)) / (24 * 60 * 60 * 1000)) >= day;
};

export const getAge = (dob: Date, day = 90) => {
  return Math.floor((new Date() - new Date(dob)) / (24 * 60 * 60 * 1000 * 12 * 30));
};

export const regex = (data: string, flag = 'i') => new RegExp(data, flag);

export const convertBlood = (group: string) => {
  if (group) {
    const blood = group.split('_');

    if (blood[1].toLocaleLowerCase() === 'p') {
      return blood[0] + '+';
    }
    if (blood[1].toLocaleLowerCase() === 'n') {
      return blood[0] + '-';
    }
  } else return;
};

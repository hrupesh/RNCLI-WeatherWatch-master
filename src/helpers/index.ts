export const getAverageTemperatureForDay = (
  min: number,
  max: number
): string => {
  return Math.abs((max + min) / 2).toFixed(1);
};

export const getDayNameFromDate = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", { weekday: "short" });
};

export const debounce = (fn: any, delay: number) => {
  let timeoutId: any;

  return (...args: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

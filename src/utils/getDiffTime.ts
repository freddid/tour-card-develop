/* eslint-disable */
/* eslint-disable prettier/prettier */
export type diffTime = {
  hours: number;
  minutes: number;
};

export function getDiffTime(dateStart: string | null, dateEnd: string | null): diffTime {
  if (!dateStart || !dateEnd) {
    return {
      hours: 0,
      minutes: 0,
    }
  }
  const dateS = new Date(dateStart).getTime();
  const dateE = new Date(dateEnd).getTime();
  const milliseconds = Math.abs(dateS - dateE);

  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds %= 60;

  minutes = seconds >= 30 ? minutes + 1 : minutes;

  minutes %= 60;

  hours %= 24;

  return { hours, minutes };
}

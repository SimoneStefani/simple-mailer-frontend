export const formatTime = (time: string): string => {
  const date = new Date(time);
  return date.toUTCString();
};

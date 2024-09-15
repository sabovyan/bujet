export const isCompleted = (currentDate: Date | null) => {
  if (currentDate === null) return false;

  const diff =
    (new Date(currentDate).getTime() - new Date().getTime()) /
    1000 /
    60 /
    60 /
    24;

  const isCompleted = diff < 1;

  return isCompleted;
};

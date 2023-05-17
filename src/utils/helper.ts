export const formatDate = () => {
  const f = Intl.DateTimeFormat("he-IL", {
    dateStyle: "short",
  });
  return f;
};

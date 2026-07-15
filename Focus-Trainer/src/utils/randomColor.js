export const randomRGB = () => {
  const r = Math.floor(Math.random() * 210) + 45;
  const g = Math.floor(Math.random() * 210) + 45;
  const b = Math.floor(Math.random() * 210) + 45;
  return `rgb(${r}, ${g}, ${b})`;
};

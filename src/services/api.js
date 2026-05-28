import pulseData from "../data/pulseData";

export function getPulseFeed() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = false; // cambia a true per test

      if (shouldFail) {
        reject("Failed to load feed");
        return;
      }

      resolve(pulseData);
    }, 800);
  });
}
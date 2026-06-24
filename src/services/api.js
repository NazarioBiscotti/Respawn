import pulseData from "../data/pulseData";

export function getPulseFeed() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = false; 

      if (shouldFail) {
        reject("Failed to load feed");
        return;
      }

      resolve(pulseData);
    }, 800);
  });
}
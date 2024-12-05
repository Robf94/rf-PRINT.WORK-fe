export default function greeting() {
  const currentDate = new Date();
  const currentTime = currentDate.getHours();

  let greet = "";

  if (currentTime < 12) {
    greet = "Good morning";
  } else if (currentTime >= 12 && currentTime < 18) {
    greet = "Good afternoon";
  } else if (currentTime >= 18 && currentTime <= 24) {
    greet = "Good evening";
  }

  return greet;
}

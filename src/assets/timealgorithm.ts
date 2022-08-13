function timealgorithm(time: number) {

  // Inside this func time in seconds

  // seconds
  let seconds = time%60;

  // menutes
  let minutes = Math.floor(time/60)%60;

  // hours
  let hours = Math.floor(time/3600);

  return {
    hours: hours.toString(),
    minutes: minutes.toString(),
    seconds: seconds.toString(),
  }

}
export default timealgorithm;

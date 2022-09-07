function convertTime(time, timezone) {
  let date = new Date(time * 1000);
  return date.toLocaleString("en-US", {
    timeZone: timezone,
    timeStyle: "short",
  });
}

function getDay(time, timezone) {
  let date = new Date(time * 1000);
  return date.toLocaleString("en-US", { timeZone: timezone, weekday: "long" });
}

function getDate(time, timezone) {
  let date = new Date(time * 1000);
  return date.toLocaleString("en-US", {
    timeZone: timezone,
    day: "2-digit",
    month: "short",
  });
}

export { convertTime, getDay, getDate };

export function getTimeElapsed(createdAt) {
  const previous = new Date(createdAt);
  const now = new Date();
  const comparedTime = now.valueOf() - previous.valueOf();
  return formatDateTime(comparedTime);
}

function formatDateTime(comparedTime) {
  const sec = Math.floor(comparedTime / 1000);
  if (sec < 60) {
    return `${sec}s`;
  }
  const min = Math.floor(sec / 60);
  if (min < 60) {
    return `${min}m`;
  }
  const hr = Math.floor(min / 60);
  if (hr < 24) {
    return `${hr}h`;
  }
  const day = Math.floor(hr / 24);
  if (day < 7) {
    return `${day}d`;
  }
  return `${Math.floor(day / 7)}w`;
}

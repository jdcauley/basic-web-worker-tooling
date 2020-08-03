importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"
);
console.log("worker-loaded");
console.log('another worker change')
const relativeTime = timestamp => {
  console.log(timestamp);
  return moment.unix(timestamp).fromNow();
};

self.addEventListener("message", e => {
  console.log(e);
  const prettyTime = relativeTime(e.data[0]);
  self.postMessage(prettyTime);
});

import "./styles.css";

window.pluginNamespace = {
  directory: "/",
  version: "1.0.0"
};

const pluginAssetDir = window.pluginNamespace.directory;

const momentWorker = new Worker(`${pluginAssetDir}worker.js`);
console.log("loading");

const getRelativeTime = timestamp => {
  momentWorker.postMessage([timestamp]);

  momentWorker.addEventListener(
    "message",
    evt => {
      return evt.data;
    },
    false
  );
};
getRelativeTime(1529046600);

const getRelativeTimePromise = timestamp => {
  console.log(timestamp);
  momentWorker.postMessage([timestamp]);

  return new Promise((resolve, reject) => {
    momentWorker.addEventListener(
      "message",
      evt => {
        resolve(evt.data);
        if (!evt.data.ok) {
          reject(evt.data);
        }
      },
      false
    );
  });
};

getRelativeTimePromise(1529046600)
  .then(result => {
    console.log("promise result");
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });

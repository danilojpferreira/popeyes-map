const WebSocket = require("ws");
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/",
  {
    useNewUrlParser: true,
  }
);
client.connect();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onError = (ws, err) => {
  console.error(`onError: ${err.message}`);
};

const onMessage = async (ws, data) => {
  const message = JSON.parse(data);
  const { id, map, speed, play, steps, reverse } = message;
  const db = client.db("popeyes");
  const query = await db.collection("maps").findOne({ name: map });
  console.log(query);
  if (!query) {
    await ws.send(JSON.stringify({ code: 404 }));
    return;
  }
  const dt = query.coordinates;
  if (reverse) dt.reverse();
  const model = {
    id,
    map,
    coordinate: null,
    size: null,
    step: null,
  };
  model.size = dt.length;
  if (play) {
    for (let index = steps; index < dt.length; index++) {
      model.coordinate = dt[index];
      model.step = index;
      ws.send(JSON.stringify(model));
      await sleep(speed);
    }
  } else if (!steps) {
    model.coordinate = dt[0];
    model.step = 0;
    await ws.send(JSON.stringify(model));
  }
};

const onConnection = (ws, req) => {
  ws.on("message", (data) => onMessage(ws, data));
  ws.on("error", (error) => onError(ws, error));
  console.log(`onConnection`);
};

module.exports = (server) => {
  const wss = new WebSocket.Server({
    server,
  });

  wss.on("connection", onConnection);
  console.log(`App Web Socket Server is running!`);
  return wss;
};

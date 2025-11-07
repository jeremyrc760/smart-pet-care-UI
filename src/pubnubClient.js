import PubNub from "pubnub";

const pubnub = new PubNub({
  publishKey: "pub-c-8aa1c24a-e9d4-4a9a-80aa-fb6138e97691",   // ← 你的 Publish Key
  subscribeKey: "sub-c-5ae8e4ab-87a7-408e-a11a-5370979737b1",  // ← 你的 Subscribe Key
  uuid: "jeremy",  // 可自定义（建议用固定ID）
});

export default pubnub;

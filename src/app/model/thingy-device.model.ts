import {JSONProperty} from "../../../../thingy-api-purple/src/controllers/WebsocketController";

export class ThingyDeviceModel {
  name: string;
  deviceId: string;
  id: string;
  location: string;
  lastValues: Map<number, number>;
  lastTimes: Map<JSONProperty, number>;
}

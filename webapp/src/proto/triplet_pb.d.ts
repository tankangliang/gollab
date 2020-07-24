// package: github.com.tankangliang.gollab
// file: proto/triplet.proto

import * as jspb from "google-protobuf";

export class Triplet extends jspb.Message {
  getPath(): number;
  setPath(value: number): void;

  getSite(): string;
  setSite(value: string): void;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Triplet.AsObject;
  static toObject(includeInstance: boolean, msg: Triplet): Triplet.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Triplet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Triplet;
  static deserializeBinaryFromReader(message: Triplet, reader: jspb.BinaryReader): Triplet;
}

export namespace Triplet {
  export type AsObject = {
    path: number,
    site: string,
    count: number,
  }
}


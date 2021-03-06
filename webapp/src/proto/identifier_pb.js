/* eslint-disable no-undef */
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require("google-protobuf");
var goog = jspb;
var global = Function("return this")();

var proto_triplet_pb = require("../proto/triplet_pb.js");
goog.exportSymbol(
  "proto.github.com.tankangliang.gollab.Identifier",
  null,
  global
);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.github.com.tankangliang.gollab.Identifier = function (opt_data) {
  jspb.Message.initialize(
    this,
    opt_data,
    0,
    -1,
    proto.github.com.tankangliang.gollab.Identifier.repeatedFields_,
    null
  );
};
goog.inherits(proto.github.com.tankangliang.gollab.Identifier, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.github.com.tankangliang.gollab.Identifier.displayName =
    "proto.github.com.tankangliang.gollab.Identifier";
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.github.com.tankangliang.gollab.Identifier.repeatedFields_ = [2];

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.github.com.tankangliang.gollab.Identifier.prototype.toObject = function (
    opt_includeInstance
  ) {
    return proto.github.com.tankangliang.gollab.Identifier.toObject(
      opt_includeInstance,
      this
    );
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.github.com.tankangliang.gollab.Identifier} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.github.com.tankangliang.gollab.Identifier.toObject = function (
    includeInstance,
    msg
  ) {
    var f,
      obj = {
        value: jspb.Message.getFieldWithDefault(msg, 1, ""),
        tripletsList: jspb.Message.toObjectList(
          msg.getTripletsList(),
          proto_triplet_pb.Triplet.toObject,
          includeInstance
        ),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.github.com.tankangliang.gollab.Identifier}
 */
proto.github.com.tankangliang.gollab.Identifier.deserializeBinary = function (
  bytes
) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.github.com.tankangliang.gollab.Identifier();
  return proto.github.com.tankangliang.gollab.Identifier.deserializeBinaryFromReader(
    msg,
    reader
  );
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.github.com.tankangliang.gollab.Identifier} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.github.com.tankangliang.gollab.Identifier}
 */
proto.github.com.tankangliang.gollab.Identifier.deserializeBinaryFromReader = function (
  msg,
  reader
) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setValue(value);
        break;
      case 2:
        var value = new proto_triplet_pb.Triplet();
        reader.readMessage(
          value,
          proto_triplet_pb.Triplet.deserializeBinaryFromReader
        );
        msg.addTriplets(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.github.com.tankangliang.gollab.Identifier.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.github.com.tankangliang.gollab.Identifier.serializeBinaryToWriter(
    this,
    writer
  );
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.github.com.tankangliang.gollab.Identifier} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.github.com.tankangliang.gollab.Identifier.serializeBinaryToWriter = function (
  message,
  writer
) {
  var f = undefined;
  f = message.getValue();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
  f = message.getTripletsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto_triplet_pb.Triplet.serializeBinaryToWriter
    );
  }
};

/**
 * optional string value = 1;
 * @return {string}
 */
proto.github.com.tankangliang.gollab.Identifier.prototype.getValue = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};

/** @param {string} value */
proto.github.com.tankangliang.gollab.Identifier.prototype.setValue = function (
  value
) {
  jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * repeated Triplet triplets = 2;
 * @return {!Array<!proto.github.com.tankangliang.gollab.Triplet>}
 */
proto.github.com.tankangliang.gollab.Identifier.prototype.getTripletsList = function () {
  return /** @type{!Array<!proto.github.com.tankangliang.gollab.Triplet>} */ (jspb.Message.getRepeatedWrapperField(
    this,
    proto_triplet_pb.Triplet,
    2
  ));
};

/** @param {!Array<!proto.github.com.tankangliang.gollab.Triplet>} value */
proto.github.com.tankangliang.gollab.Identifier.prototype.setTripletsList = function (
  value
) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};

/**
 * @param {!proto.github.com.tankangliang.gollab.Triplet=} opt_value
 * @param {number=} opt_index
 * @return {!proto.github.com.tankangliang.gollab.Triplet}
 */
proto.github.com.tankangliang.gollab.Identifier.prototype.addTriplets = function (
  opt_value,
  opt_index
) {
  return jspb.Message.addToRepeatedWrapperField(
    this,
    2,
    opt_value,
    proto.github.com.tankangliang.gollab.Triplet,
    opt_index
  );
};

proto.github.com.tankangliang.gollab.Identifier.prototype.clearTripletsList = function () {
  this.setTripletsList([]);
};

goog.object.extend(exports, proto.github.com.tankangliang.gollab);

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

var proto_message_pb = require("../proto/message_pb.js");
goog.exportSymbol("proto.github.com.tankangliang.gollab.Close", null, global);
goog.exportSymbol(
  "proto.github.com.tankangliang.gollab.ConnectRequest",
  null,
  global
);
goog.exportSymbol(
  "proto.github.com.tankangliang.gollab.CreateRoomRequest",
  null,
  global
);
goog.exportSymbol(
  "proto.github.com.tankangliang.gollab.CreateRoomResponse",
  null,
  global
);
goog.exportSymbol(
  "proto.github.com.tankangliang.gollab.RunRequest",
  null,
  global
);
goog.exportSymbol(
  "proto.github.com.tankangliang.gollab.RunResponse",
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
proto.github.com.tankangliang.gollab.CreateRoomRequest = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(
  proto.github.com.tankangliang.gollab.CreateRoomRequest,
  jspb.Message
);
if (goog.DEBUG && !COMPILED) {
  proto.github.com.tankangliang.gollab.CreateRoomRequest.displayName =
    "proto.github.com.tankangliang.gollab.CreateRoomRequest";
}

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
  proto.github.com.tankangliang.gollab.CreateRoomRequest.prototype.toObject = function (
    opt_includeInstance
  ) {
    return proto.github.com.tankangliang.gollab.CreateRoomRequest.toObject(
      opt_includeInstance,
      this
    );
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.github.com.tankangliang.gollab.CreateRoomRequest} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.github.com.tankangliang.gollab.CreateRoomRequest.toObject = function (
    includeInstance,
    msg
  ) {
    var f,
      obj = {
        id: jspb.Message.getFieldWithDefault(msg, 1, ""),
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
 * @return {!proto.github.com.tankangliang.gollab.CreateRoomRequest}
 */
proto.github.com.tankangliang.gollab.CreateRoomRequest.deserializeBinary = function (
  bytes
) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.github.com.tankangliang.gollab.CreateRoomRequest();
  return proto.github.com.tankangliang.gollab.CreateRoomRequest.deserializeBinaryFromReader(
    msg,
    reader
  );
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.github.com.tankangliang.gollab.CreateRoomRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.github.com.tankangliang.gollab.CreateRoomRequest}
 */
proto.github.com.tankangliang.gollab.CreateRoomRequest.deserializeBinaryFromReader = function (
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
        msg.setId(value);
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
proto.github.com.tankangliang.gollab.CreateRoomRequest.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.github.com.tankangliang.gollab.CreateRoomRequest.serializeBinaryToWriter(
    this,
    writer
  );
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.github.com.tankangliang.gollab.CreateRoomRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.github.com.tankangliang.gollab.CreateRoomRequest.serializeBinaryToWriter = function (
  message,
  writer
) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
};

/**
 * optional string id = 1;
 * @return {string}
 */
proto.github.com.tankangliang.gollab.CreateRoomRequest.prototype.getId = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};

/** @param {string} value */
proto.github.com.tankangliang.gollab.CreateRoomRequest.prototype.setId = function (
  value
) {
  jspb.Message.setProto3StringField(this, 1, value);
};

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
proto.github.com.tankangliang.gollab.CreateRoomResponse = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(
  proto.github.com.tankangliang.gollab.CreateRoomResponse,
  jspb.Message
);
if (goog.DEBUG && !COMPILED) {
  proto.github.com.tankangliang.gollab.CreateRoomResponse.displayName =
    "proto.github.com.tankangliang.gollab.CreateRoomResponse";
}

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
  proto.github.com.tankangliang.gollab.CreateRoomResponse.prototype.toObject = function (
    opt_includeInstance
  ) {
    return proto.github.com.tankangliang.gollab.CreateRoomResponse.toObject(
      opt_includeInstance,
      this
    );
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.github.com.tankangliang.gollab.CreateRoomResponse} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.github.com.tankangliang.gollab.CreateRoomResponse.toObject = function (
    includeInstance,
    msg
  ) {
    var f,
      obj = {
        accepted: jspb.Message.getFieldWithDefault(msg, 1, false),
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
 * @return {!proto.github.com.tankangliang.gollab.CreateRoomResponse}
 */
proto.github.com.tankangliang.gollab.CreateRoomResponse.deserializeBinary = function (
  bytes
) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.github.com.tankangliang.gollab.CreateRoomResponse();
  return proto.github.com.tankangliang.gollab.CreateRoomResponse.deserializeBinaryFromReader(
    msg,
    reader
  );
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.github.com.tankangliang.gollab.CreateRoomResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.github.com.tankangliang.gollab.CreateRoomResponse}
 */
proto.github.com.tankangliang.gollab.CreateRoomResponse.deserializeBinaryFromReader = function (
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
        var value = /** @type {boolean} */ (reader.readBool());
        msg.setAccepted(value);
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
proto.github.com.tankangliang.gollab.CreateRoomResponse.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.github.com.tankangliang.gollab.CreateRoomResponse.serializeBinaryToWriter(
    this,
    writer
  );
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.github.com.tankangliang.gollab.CreateRoomResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.github.com.tankangliang.gollab.CreateRoomResponse.serializeBinaryToWriter = function (
  message,
  writer
) {
  var f = undefined;
  f = message.getAccepted();
  if (f) {
    writer.writeBool(1, f);
  }
};

/**
 * optional bool accepted = 1;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.github.com.tankangliang.gollab.CreateRoomResponse.prototype.getAccepted = function () {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(
    this,
    1,
    false
  ));
};

/** @param {boolean} value */
proto.github.com.tankangliang.gollab.CreateRoomResponse.prototype.setAccepted = function (
  value
) {
  jspb.Message.setProto3BooleanField(this, 1, value);
};

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
proto.github.com.tankangliang.gollab.ConnectRequest = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(
  proto.github.com.tankangliang.gollab.ConnectRequest,
  jspb.Message
);
if (goog.DEBUG && !COMPILED) {
  proto.github.com.tankangliang.gollab.ConnectRequest.displayName =
    "proto.github.com.tankangliang.gollab.ConnectRequest";
}

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
  proto.github.com.tankangliang.gollab.ConnectRequest.prototype.toObject = function (
    opt_includeInstance
  ) {
    return proto.github.com.tankangliang.gollab.ConnectRequest.toObject(
      opt_includeInstance,
      this
    );
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.github.com.tankangliang.gollab.ConnectRequest} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.github.com.tankangliang.gollab.ConnectRequest.toObject = function (
    includeInstance,
    msg
  ) {
    var f,
      obj = {
        user: jspb.Message.getFieldWithDefault(msg, 1, ""),
        roomid: jspb.Message.getFieldWithDefault(msg, 2, ""),
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
 * @return {!proto.github.com.tankangliang.gollab.ConnectRequest}
 */
proto.github.com.tankangliang.gollab.ConnectRequest.deserializeBinary = function (
  bytes
) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.github.com.tankangliang.gollab.ConnectRequest();
  return proto.github.com.tankangliang.gollab.ConnectRequest.deserializeBinaryFromReader(
    msg,
    reader
  );
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.github.com.tankangliang.gollab.ConnectRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.github.com.tankangliang.gollab.ConnectRequest}
 */
proto.github.com.tankangliang.gollab.ConnectRequest.deserializeBinaryFromReader = function (
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
        msg.setUser(value);
        break;
      case 2:
        var value = /** @type {string} */ (reader.readString());
        msg.setRoomid(value);
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
proto.github.com.tankangliang.gollab.ConnectRequest.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.github.com.tankangliang.gollab.ConnectRequest.serializeBinaryToWriter(
    this,
    writer
  );
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.github.com.tankangliang.gollab.ConnectRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.github.com.tankangliang.gollab.ConnectRequest.serializeBinaryToWriter = function (
  message,
  writer
) {
  var f = undefined;
  f = message.getUser();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
  f = message.getRoomid();
  if (f.length > 0) {
    writer.writeString(2, f);
  }
};

/**
 * optional string user = 1;
 * @return {string}
 */
proto.github.com.tankangliang.gollab.ConnectRequest.prototype.getUser = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};

/** @param {string} value */
proto.github.com.tankangliang.gollab.ConnectRequest.prototype.setUser = function (
  value
) {
  jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional string roomID = 2;
 * @return {string}
 */
proto.github.com.tankangliang.gollab.ConnectRequest.prototype.getRoomid = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};

/** @param {string} value */
proto.github.com.tankangliang.gollab.ConnectRequest.prototype.setRoomid = function (
  value
) {
  jspb.Message.setProto3StringField(this, 2, value);
};

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
proto.github.com.tankangliang.gollab.RunRequest = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.github.com.tankangliang.gollab.RunRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.github.com.tankangliang.gollab.RunRequest.displayName =
    "proto.github.com.tankangliang.gollab.RunRequest";
}

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
  proto.github.com.tankangliang.gollab.RunRequest.prototype.toObject = function (
    opt_includeInstance
  ) {
    return proto.github.com.tankangliang.gollab.RunRequest.toObject(
      opt_includeInstance,
      this
    );
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.github.com.tankangliang.gollab.RunRequest} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.github.com.tankangliang.gollab.RunRequest.toObject = function (
    includeInstance,
    msg
  ) {
    var f,
      obj = {
        file: jspb.Message.getFieldWithDefault(msg, 1, ""),
        room: jspb.Message.getFieldWithDefault(msg, 2, ""),
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
 * @return {!proto.github.com.tankangliang.gollab.RunRequest}
 */
proto.github.com.tankangliang.gollab.RunRequest.deserializeBinary = function (
  bytes
) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.github.com.tankangliang.gollab.RunRequest();
  return proto.github.com.tankangliang.gollab.RunRequest.deserializeBinaryFromReader(
    msg,
    reader
  );
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.github.com.tankangliang.gollab.RunRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.github.com.tankangliang.gollab.RunRequest}
 */
proto.github.com.tankangliang.gollab.RunRequest.deserializeBinaryFromReader = function (
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
        msg.setFile(value);
        break;
      case 2:
        var value = /** @type {string} */ (reader.readString());
        msg.setRoom(value);
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
proto.github.com.tankangliang.gollab.RunRequest.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.github.com.tankangliang.gollab.RunRequest.serializeBinaryToWriter(
    this,
    writer
  );
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.github.com.tankangliang.gollab.RunRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.github.com.tankangliang.gollab.RunRequest.serializeBinaryToWriter = function (
  message,
  writer
) {
  var f = undefined;
  f = message.getFile();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
  f = message.getRoom();
  if (f.length > 0) {
    writer.writeString(2, f);
  }
};

/**
 * optional string file = 1;
 * @return {string}
 */
proto.github.com.tankangliang.gollab.RunRequest.prototype.getFile = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};

/** @param {string} value */
proto.github.com.tankangliang.gollab.RunRequest.prototype.setFile = function (
  value
) {
  jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional string room = 2;
 * @return {string}
 */
proto.github.com.tankangliang.gollab.RunRequest.prototype.getRoom = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};

/** @param {string} value */
proto.github.com.tankangliang.gollab.RunRequest.prototype.setRoom = function (
  value
) {
  jspb.Message.setProto3StringField(this, 2, value);
};

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
proto.github.com.tankangliang.gollab.RunResponse = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.github.com.tankangliang.gollab.RunResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.github.com.tankangliang.gollab.RunResponse.displayName =
    "proto.github.com.tankangliang.gollab.RunResponse";
}

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
  proto.github.com.tankangliang.gollab.RunResponse.prototype.toObject = function (
    opt_includeInstance
  ) {
    return proto.github.com.tankangliang.gollab.RunResponse.toObject(
      opt_includeInstance,
      this
    );
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.github.com.tankangliang.gollab.RunResponse} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.github.com.tankangliang.gollab.RunResponse.toObject = function (
    includeInstance,
    msg
  ) {
    var f,
      obj = {
        output: jspb.Message.getFieldWithDefault(msg, 1, ""),
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
 * @return {!proto.github.com.tankangliang.gollab.RunResponse}
 */
proto.github.com.tankangliang.gollab.RunResponse.deserializeBinary = function (
  bytes
) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.github.com.tankangliang.gollab.RunResponse();
  return proto.github.com.tankangliang.gollab.RunResponse.deserializeBinaryFromReader(
    msg,
    reader
  );
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.github.com.tankangliang.gollab.RunResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.github.com.tankangliang.gollab.RunResponse}
 */
proto.github.com.tankangliang.gollab.RunResponse.deserializeBinaryFromReader = function (
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
        msg.setOutput(value);
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
proto.github.com.tankangliang.gollab.RunResponse.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.github.com.tankangliang.gollab.RunResponse.serializeBinaryToWriter(
    this,
    writer
  );
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.github.com.tankangliang.gollab.RunResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.github.com.tankangliang.gollab.RunResponse.serializeBinaryToWriter = function (
  message,
  writer
) {
  var f = undefined;
  f = message.getOutput();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
};

/**
 * optional string output = 1;
 * @return {string}
 */
proto.github.com.tankangliang.gollab.RunResponse.prototype.getOutput = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};

/** @param {string} value */
proto.github.com.tankangliang.gollab.RunResponse.prototype.setOutput = function (
  value
) {
  jspb.Message.setProto3StringField(this, 1, value);
};

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
proto.github.com.tankangliang.gollab.Close = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.github.com.tankangliang.gollab.Close, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.github.com.tankangliang.gollab.Close.displayName =
    "proto.github.com.tankangliang.gollab.Close";
}

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
  proto.github.com.tankangliang.gollab.Close.prototype.toObject = function (
    opt_includeInstance
  ) {
    return proto.github.com.tankangliang.gollab.Close.toObject(
      opt_includeInstance,
      this
    );
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.github.com.tankangliang.gollab.Close} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.github.com.tankangliang.gollab.Close.toObject = function (
    includeInstance,
    msg
  ) {
    var f,
      obj = {};

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.github.com.tankangliang.gollab.Close}
 */
proto.github.com.tankangliang.gollab.Close.deserializeBinary = function (
  bytes
) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.github.com.tankangliang.gollab.Close();
  return proto.github.com.tankangliang.gollab.Close.deserializeBinaryFromReader(
    msg,
    reader
  );
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.github.com.tankangliang.gollab.Close} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.github.com.tankangliang.gollab.Close}
 */
proto.github.com.tankangliang.gollab.Close.deserializeBinaryFromReader = function (
  msg,
  reader
) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
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
proto.github.com.tankangliang.gollab.Close.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.github.com.tankangliang.gollab.Close.serializeBinaryToWriter(
    this,
    writer
  );
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.github.com.tankangliang.gollab.Close} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.github.com.tankangliang.gollab.Close.serializeBinaryToWriter = function (
  message,
  writer
) {
  var f = undefined;
};

goog.object.extend(exports, proto.github.com.tankangliang.gollab);

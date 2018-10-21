/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener(
      "deviceready",
      this.onDeviceReady.bind(this),
      false
    );
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    this.receivedEvent("deviceready");
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector(".listening");
    var receivedElement = parentElement.querySelector(".received");

    listeningElement.setAttribute("style", "display:none;");
    receivedElement.setAttribute("style", "display:block;");

    console.log("Received Event: " + id);
  }
};

app.initialize();

////////////////////////////////////////////////////////////////////////////////////////////////////
// KEY DEFINITION
// Reference https://www.w3.org/TR/gamepad/#dfn-standard-gamepad-layout
const INVALID = -99;
const BUTTON = {
  BOTTOM_IN_RIGHT_CLUSTER: 0,
  RIGHT_IN_RIGHT_CLUSTER: 1,
  LEFT_IN_RIGHT_CLUSTER: 2,
  TOP_IN_RIGHT_CLUSTER: 3,
  TOP_LEFT_FRONT_BUTTON: 4,
  TOP_RIGHT_FRONT_BUTTON: 5,
  BOTTOM_LEFT_FRONT_BUTTON: 6,
  BOTTOM_RIGHT_FRONT_BUTTON: 7,
  LEFT_IN_CENTER_CLUSTER: 8,
  RIGHT_IN_CENTER_CLUSTER: 9,
  LEFT_STICK_PRESSED_BUTTON: 10,
  RIGHT_STICK_PRESSED_BUTTON: 11,
  TOP_IN_LEFT_CLUSTER: 12,
  BOTTOM_IN_LEFT_CLUSTER: 13,
  RIGHT_IN_LEFT_CLUSTER: 14,
  LEFT_IN_LEFT_CLUSTER: 15
};
const AXIS = {
  HORIZONTAL_FOR_LEFT_STICK: 0,
  VERTICAL_FOR_LEFT_STICK: 1,
  HORIZONTAL_FOR_RIGHT_STICK: 2,
  VERTICAL_FOR_RIGHT_STICK: 3
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Game pad key layout
const GamePadButtonMap = {
  //Dualshock 4
  "Wireless Controller": {
    0: BUTTON.RIGHT_IN_RIGHT_CLUSTER,
    1: INVALID,
    2: BUTTON.BOTTOM_IN_RIGHT_CLUSTER,
    3: BUTTON.LEFT_IN_RIGHT_CLUSTER,
    4: BUTTON.TOP_IN_RIGHT_CLUSTER,
    5: INVALID,
    6: INVALID,
    7: INVALID,
    8: BUTTON.BOTTOM_LEFT_FRONT_BUTTON,
    9: BUTTON.BOTTOM_RIGHT_FRONT_BUTTON,
    10: BUTTON.LEFT_IN_CENTER_CLUSTER,
    11: BUTTON.RIGHT_IN_CENTER_CLUSTER,
    12: BUTTON.TOP_IN_LEFT_CLUSTER,
    13: BUTTON.BOTTOM_IN_LEFT_CLUSTER,
    14: BUTTON.LEFT_IN_LEFT_CLUSTER,
    15: BUTTON.RIGHT_IN_LEFT_CLUSTER
  }
};
const GamePadAxisMap = {
  //Dualshock 4
  "Wireless Controller": {
    0: AXIS.HORIZONTAL_FOR_LEFT_STICK,
    1: AXIS.VERTICAL_FOR_LEFT_STICK,
    2: AXIS.HORIZONTAL_FOR_RIGHT_STICK,
    3: AXIS.VERTICAL_FOR_RIGHT_STICK
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// gamepad varaiable

let connectedGamepadIndex = null;
let gamePadButtonLayout = null;
let gamePadAxisLayout = null;
let interval1 = null;

window.addEventListener("gamepadconnected", e => {
  console.log("gamepad connected");
  if (connectedGamepadIndex !== null) {
    console.log("already connectedGamepadIndex is set.");
    return;
  }
  if (!GamePadButtonMap[e.gamepad.id] || !GamePadAxisMap[e.gamepad.id]) {
    console.log("no valid gamepad");
    return;
  }

  connectedGamepadIndex = e.gamepad.index;
  gamepad = e.gamepad;
  gamePadButtonLayout = GamePadButtonMap[gamepad.id];
  gamePadAxisLayout = GamePadAxisMap[gamepad.id];

  interval1 = setInterval(pollGamepads, 1000);
  console.log(
    "Gamepad connected at index " +
      e.gamepad.index +
      ": " +
      e.gamepad.id +
      ". It has " +
      e.gamepad.buttons.length +
      " buttons and " +
      e.gamepad.axes.length +
      " axes." +
      " mapping: " +
      e.gamepad.mapping
  );
});

window.addEventListener("gamepaddisconnected", e => {
  console.log("gamepad disconnected");
  if (connectedGamepadIndex === null) {
    console.log("game pad is not set");
    return;
  }

  let gamepads = navigator.getGamepads();
  let gp = gamepads[connectedGamepadIndex];
  if (gp !== null) {
    if (gp.id !== e.gamepad.id) {
      console.log("unknown gamepad is disconnected");
      return;
    }
  }

  connectedGamepadIndex = null;
  gamePadButtonLayout = null;
  gamePadAxisLayout = null;
  clearInterval(interval1);
  interval1 = null;
});

function pollGamepads() {
  //   console.log("pollGamePads");
  //   console.log("connectedGamepadIndex: " + connectedGamepadIndex);
  let gamepads = navigator.getGamepads();
  let gp = gamepads[connectedGamepadIndex];
  if (gp) {
    for (let i = 0; i < gp.buttons.length; i++) {
      if (gp.buttons[i].pressed) {
        console.log("button <" + i + "> is pressed");
        switch (gamePadButtonLayout[i]) {
          case BUTTON.RIGHT_IN_RIGHT_CLUSTER:
            console.log("○");
            break;
          case BUTTON.BOTTOM_IN_RIGHT_CLUSTER:
            console.log("X");
            break;
          case BUTTON.LEFT_IN_RIGHT_CLUSTER:
            console.log("□");
            break;
          case BUTTON.TOP_IN_RIGHT_CLUSTER:
            console.log("△");
            break;
          case BUTTON.BOTTOM_LEFT_FRONT_BUTTON:
            console.log("L2");
            break;
          case BUTTON.BOTTOM_RIGHT_FRONT_BUTTON:
            console.log("R2");
            break;
          case BUTTON.LEFT_IN_CENTER_CLUSTER:
            console.log("SELECT");
            break;
          case BUTTON.RIGHT_IN_CENTER_CLUSTER:
            console.log("START");
            break;
          case BUTTON.TOP_IN_LEFT_CLUSTER:
            console.log("UP");
            break;
          case BUTTON.BOTTOM_IN_LEFT_CLUSTER:
            console.log("BOTTOM");
            break;
          case BUTTON.LEFT_IN_LEFT_CLUSTER:
            console.log("LEFT");
            break;
          case BUTTON.RIGHT_IN_LEFT_CLUSTER:
            console.log("RIGHT");
            break;
          default:
            console.log("UNKNOWN KEY");
        }
      }
    }
    for (let i = 0; i < gp.axes.length; i++) {
      if (gp.axes[i].toFixed(1) > 0.1 || gp.axes[i].toFixed(1) < -0.1) {
        // console.log(
        //   "axe index <" + i + ">, val <" + gp.axes[i].toFixed(1) + ">"
        // );
        switch (gamePadAxisLayout[i]) {
          case AXIS.HORIZONTAL_FOR_LEFT_STICK:
            console.log(
              "LEFT STICK HORIZONTAL: <" + gp.axes[i].toFixed(1) + ">"
            );
            break;
          case AXIS.VERTICAL_FOR_LEFT_STICK:
            console.log("LEFT STICK VERTICAL: <" + gp.axes[i].toFixed(1) + ">");
            break;
          case AXIS.HORIZONTAL_FOR_RIGHT_STICK:
            console.log(
              "RIGHT STICK HORIZONTAL: <" + gp.axes[i].toFixed(1) + ">"
            );
            break;
          case AXIS.VERTICAL_FOR_RIGHT_STICK:
            console.log(
              "RIGHT STICK VERTICAL: <" + gp.axes[i].toFixed(1) + ">"
            );
            break;
        }
      }
    }
  } else {
    console.log("no gamepad");
  }
}

function getGamePads() {
  return navigator.getGamepads
    ? navigator.getGamepads()
    : navigator.webkitGetGamepads
      ? navigator.webkitGetGamepads
      : [];
}

let gamepads = getGamePads();
if (gamepads.length > 0) {
  for (let i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      gamepad = gamepads[i];
      console.log("gamepad is set", gamepad);
      interval1 = setInterval(pollGamepads, 5000);
    } else {
      console.log("gamepad is empty", gamepads[i]);
    }
  }
} else {
  console.log("no gamepad");
}

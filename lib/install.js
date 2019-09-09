"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _which = _interopRequireDefault(require("which"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _require = require('child_process'),
    exec = _require.exec;

function runCmd(cmd, args, cwd, fn) {
  args = args || [];

  var runner = require('child_process').spawn(cmd, args, {
    // keep color
    stdio: "inherit",
    cwd: cwd
  });

  runner.on('close', function (code) {
    if (fn) {
      fn(code);
    }
  });
}

function findNpm() {
  var npms = process.platform === 'win32' ? ['tnpm.cmd', 'cnpm.cmd', 'npm.cmd'] : ['tnpm', 'cnpm', 'npm'];

  for (var i = 0; i < npms.length; i++) {
    try {
      _which["default"].sync(npms[i]);

      console.log('use npm: ' + npms[i]);
      return npms[i];
    } catch (e) {}
  }

  throw new Error('please install npm');
}

function _default(done, realfolder) {
  var npm = findNpm();
  runCmd(_which["default"].sync(npm), ['install'], realfolder, function () {
    console.log(npm + ' install end');
    done();
  });
}

;
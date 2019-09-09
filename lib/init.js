"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = require("path");

var _vinylFs = _interopRequireDefault(require("vinyl-fs"));

var _fs = require("fs");

var _emptyDir = require("empty-dir");

var _through = _interopRequireDefault(require("through2"));

var _leftPad = _interopRequireDefault(require("left-pad"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function info(type, message) {
  console.log("".concat(_chalk["default"].green.bold((0, _leftPad["default"])(type, 12)), "  ").concat(message));
}

function error(message) {
  console.error(_chalk["default"].red(message));
}

function success(message) {
  console.error(_chalk["default"].green(message));
}

function init(_ref) {
  var ssr = _ref.ssr,
      spa = _ref.spa,
      vue = _ref.vue,
      gulp = _ref.gulp,
      install = _ref.install,
      args = _ref.args;
  console.log(33333);
  var type = '';

  if (ssr) {
    type = 'ssr';
  } else if (spa) {
    type = 'spa';
  } else if (vue) {
    type = 'vue';
  } else if (gulp) {
    type = 'gulp';
  } else {
    type = 'spa';
  }

  var cwd = (0, _path.join)(__dirname, '../boilerplates', type);
  var dest = process.cwd();
  var projectName = args[0] ? args[0] : (0, _path.basename)(dest);
  var realfolder = args[0] ? (0, _path.join)(dest, args[0]) : dest;
  console.log(realfolder, "======="); // //判断文件夹是否存在

  if (!(0, _emptyDir.sync)(dest, function (e) {
    if (e === projectName) {
      return false;
    }

    return true;
  })) {
    error('文件夹已存在，请在一个空的文件夹执行run init命令');
    process.exit(1);
  }

  console.log("\u521B\u5EFA\u4E86\u4E00\u4E2A\u65B0\u7684 ".concat(projectName, " \u9879\u76EE\u5728 ").concat(dest, "."));
  console.log();

  _vinylFs["default"].src(['**/*', '!node_modules/**/*'], {
    cwd: cwd,
    dot: true
  }).pipe(template(realfolder, cwd)).pipe(_vinylFs["default"].dest(realfolder)).on('end', function () {
    info('rename', 'gitignore -> .gitignore');
    (0, _fs.renameSync)((0, _path.join)(realfolder, 'gitignore'), (0, _path.join)(realfolder, '.gitignore'));

    if (install) {
      info('run', 'npm install');

      require('./install')["default"](printSuccess, realfolder);
    } else {
      printSuccess();
    }
  }).resume();

  function printSuccess() {
    success("\n  \u606D\u559C\u60A8\u6210\u529F\u521B\u5EFA\u4E86\u4E00\u4E2A\u9879\u76EE ".concat(projectName, " \u5728 ").concat(dest, ".\n  \n  \u60A8\u53EF\u4EE5\u8FDB\u5165\u6587\u4EF6\u5939\uFF0C\u7136\u540E\u6267\u884C\u4E0B\u9762\u7684\u547D\u4EE4\u8FD0\u884C:\n    cd ").concat(realfolder, "\n    npm\\yarn run dev\n  \n  \u8C22\u8C22\u4F7F\u7528!"));
  }
}

function template(dest, cwd) {
  return _through["default"].obj(function (file, enc, cb) {
    if (!file.stat.isFile()) {
      return cb();
    }

    info('create', file.path.replace(cwd + '/', ''));
    this.push(file);
    cb();
  });
}

var _default = init;
exports["default"] = _default;
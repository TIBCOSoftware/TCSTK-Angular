var wrench = require("wrench"),
  util = require("util");

var source = "./src/assets";
var target = "./dist/src/assets";

wrench.copyDirSyncRecursive(source, target, {
  forceDelete: true
});

console.log("Asset files successfully copied!");

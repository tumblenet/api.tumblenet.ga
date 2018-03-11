function Test(testFunction) {
  this.test = testFunction;
}

Test.prototype.runTest = function () {
  this.test("face");
}

exports.Test = Test;

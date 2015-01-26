sectionTopGap = 25;

device = window.device;

var page = tabris.create("Page", {
  title: "Device Info",
  topLevel: true
});

var screen = tabris.create("Composite", {background: "#fff", layoutData: {centerX: 0, top: [10, 0], }}).appendTo(page);

var screenHeader = tabris.create("Label", {
  font: "24px",
  layoutData: {centerX: 0, top: sectionTopGap}
}).set("text", "Screen").appendTo(page);

var scaleFactor = device.scaleFactor;

var x = createKeyValue(screenHeader, "Width:", dipToString(device.screen.width, scaleFactor));
var y = createKeyValue(x, "Height:", dipToString(device.screen.height, scaleFactor));
var density = createKeyValue(y, "Density:", scaleFactor);

var deviceHeader = tabris.create("Label", {
  font: "24px",
  layoutData: {centerX: 0, top: [density, sectionTopGap]}
}).set("text", "Device").appendTo(page);

var model = createKeyValue(deviceHeader, "Model:", device.model);
var platform = createKeyValue(model, "Platform:", device.platform);
var version = createKeyValue(platform, "Version:", device.version);
var language = createKeyValue(version, "Languag:", device.language);

page.on("change:bounds", function(event) {
  var bounds = this.get("bounds");
  if(bounds.width > bounds.height) {
    screenHeader.set("layoutData", {top: sectionTopGap, right: [80, 0]});
    x.set("layoutData", {right: [80, 0], top: [screenHeader, 12]});
    y.set("layoutData", {right: [80, 0], top: [x, 12]});
    density.set("layoutData", {right: [80, 0], top: [y, 12]});
    deviceHeader.set("layoutData", {top: sectionTopGap, right: [30, 0]});
    model.set("layoutData", {right: [30, 0], top: [deviceHeader, 12]});
    platform.set("layoutData", {right: [30, 0], top: [model, 12]});
    version.set("layoutData", {right: [30, 0], top: [platform, 12]});
    language.set("layoutData", {right: [30, 0], top: [version, 12]});
  } else {
    screenHeader.set("layoutData", {centerX: 0, top: sectionTopGap});
    x.set("layoutData", {right: [70, 0], top: [screenHeader, 12]});
    y.set("layoutData", {right: [70, 0], top: [x, 12]});
    density.set("layoutData", {right: [70, 0], top: [y, 12]});
    deviceHeader.set("layoutData", {centerX: 0, top: [density, sectionTopGap]});
    model.set("layoutData", {left: 18, top: [deviceHeader, 12], right: [70, 0]});
    platform.set("layoutData", {left: 18, top: [model, 12], right: [70, 0]});
    version.set("layoutData", {left: 18, top: [platform, 12], right: [70, 0]});
    language.set("layoutData", {left: 18, top: [version, 12], right: [70, 0]});
  }
});
page.open();

function createKeyValue(previous, key, value) {
  var keyLabel = tabris.create("Label", {
    font: "bold 18px",
    layoutData: {left: 18, top: [previous, 12], right: [70, 0]},
    alignment: "right"
  }).set("text", key).appendTo(page);
  var valueLabel = tabris.create("Label", {
    font: "18px",
    layoutData: {left: [keyLabel, 12], top: [previous, 12]}
  }).set("text", defaultFor(value, '-')).appendTo(page);
  return keyLabel;
}

function dipToString(value, scaleFactor) {
  if(typeof value == 'undefined') {
    return "unknown";
  } else {
    return value + "dip" + " (" + (value * scaleFactor) + "px)";
  }
}

function defaultFor(arg, val) {
 return typeof arg !== 'undefined' ? arg : val;
}

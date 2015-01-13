sectionTopGap = 25;

device = window.device;

var page = tabris.create("Page", {
  title: "Device Info",
  topLevel: true
});

var screenHeader = tabris.create("Label", {
  font: "24px",
  layoutData: {centerX: 0, top: sectionTopGap}
}).set("text", "Screen").appendTo(page);

var x = createKeyValue(screenHeader, "Width:");
var y = createKeyValue(x, "Height:");
var density = createKeyValue(y, "Density:");

var deviceHeader = tabris.create("Label", {
  font: "24px",
  layoutData: {centerX: 0, top: [density, sectionTopGap]}
}).set("text", "Device").appendTo(page);

var model = createKeyValue(deviceHeader, "Model:", device.model);
var platform = createKeyValue(model, "Platform:", device.platform);
var language = createKeyValue(platform, "Languag:", device.language);

page.open();

function createKeyValue(previous, key, value) {
  value = defaultFor(value, ""); 
  var keyLabel = tabris.create("Label", {
    font: "bold 18px",
    layoutData: {left: 18, top: [previous, 12]}
  }).set("text", key).appendTo(page);
  var valueLabel = tabris.create("Label", {
    font: "18px",
    layoutData: {left: [keyLabel, 18], top: [previous, 12]}
  }).set("text", value).appendTo(page);
  return keyLabel;
}

function defaultFor(arg, val) {
 return typeof arg !== 'undefined' ? arg : val;
}

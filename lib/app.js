const root = document.querySelector("#root");
console.log("hyw, world!");

function tick() {
  const element = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "nice React"), /*#__PURE__*/React.createElement("h2", null, "It is ", new Date().toLocaleTimeString(), "."));
  ReactDOM.render(element, root);
}

tick();
setInterval(tick, 1000);
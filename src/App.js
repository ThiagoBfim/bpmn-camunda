import "./App.css";
import React, { useEffect, useState } from "react";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import axios from "axios";
import BpmnModeler from "bpmn-js/lib/Modeler";

//Test Linter
import lintModule from "bpmn-js-bpmnlint";
import "bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css";
import bpmnlintConfig from "./bundled-config";
import { Linter } from "bpmnlint";

let modeler = null;
let counter = 0;
function App() {
  const [diagram, diagramSet] = useState("");
  const container = document.getElementById("container");
  const panelContainer = document.getElementById("properties-panel-container");

  useEffect(() => {
    if (diagram.length === 0) {
      axios
      .get("newDiagram.bpmn")
      .then((r) => {
        diagramSet(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
    }
  }, [diagram]);

  if (diagram.length > 0 && counter === 0) {
    counter = 1;
    modeler = new BpmnModeler({
      container,
      linting: {
        bpmnlint: bpmnlintConfig
      },
      additionalModules: [lintModule],
      keyboard: {
        bindTo: document
      }
    });
    modeler.importXML(diagram);
  }
  return (
      <>
        <div className="myBody" id="myBody">
          <div id="container" data-testid="graphContainer"></div>
        </div>
      </>
  );
}

export default App;

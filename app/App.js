import { CollectablesController } from "./Controllers/CollectablesController.js";

class App {
  collectablesController = new CollectablesController()
}

window["app"] = new App();

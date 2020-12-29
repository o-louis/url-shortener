import Home from "../Home";
import Redirect from "../Redirect";
const routes = [
  { path: "/:url_shortened", name: "Redirect", component: Redirect },
  { path: "/", name: "Home", component: Home },
];

export default routes;

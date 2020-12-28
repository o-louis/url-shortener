import Home from "../Home";
import Redirect from "../Redirect";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/:url_shortened", name: "Redirect", component: Redirect },
];

export default routes;

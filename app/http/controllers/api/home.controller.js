import Controller from "../controller.js";

class HomeController extends Controller {
        indexPage(req, res, next) {
            return res.status(200).send("Index Page WinBash");
        }
}


export default new HomeController; 
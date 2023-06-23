const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class HomeController {
    static async index(req, res) {
        res.render("home/index", {
            title: "home",
        });
    }
}

module.exports = HomeController;

const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const { generateHash } = require("../lib/bcrypt");
const passport = require("../lib/passport");

class AuthController {
    static async login(req, res) {
        if (req.isAuthenticated()) return res.redirect("/");
        res.render("auth/login", {
            title: "login",
        });
    }

    static async prosesLogin(req, res, next) {
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true, // Untuk mengaktifkan express flash
        })(req, res, next);
    }

    static async register(req, res) {
        res.render("auth/register", {
            title: "register",
        });
    }

    static async storeRegister(req, res) {
        const { username, password, repassword } = req.body;
        try {
            if (password == repassword) {
                const result = await prisma.users.create({
                    data: {
                        username: username,
                        password: await generateHash(password),
                        role: "user",
                    },
                });

                if (result) {
                    req.toastr.success(
                        "A register success created",
                        "Success!",
                    );
                    // req.flash("success", "A register success created");
                    res.redirect("/login");
                }
            } else {
                req.toastr.success("A register failed created", "error!");
                // req.flash("success", "A register success created");
                res.redirect("/register");
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError)
                if (error.code === "P2002") {
                    req.toastr.error(
                        "A register with this name is already in use",
                        "Error!",
                    );
                }

            res.redirect("/register");
            console.log(error);
        }
    }
}

module.exports = AuthController;

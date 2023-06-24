const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

class CategoryController {
    static async index(req, res) {
        const result = await prisma.category.findMany();
        res.render("category/list", { categories: result, title: "category" });
    }

    static async create(req, res) {
        res.render("category/add", {
            title: "category",
        });
    }

    static async store(req, res) {
        const { category } = req.body;
        console.log(req.body);
        try {
            const result = await prisma.category.create({
                data: {
                    category: category,
                },
            });

            if (result) {
                req.toastr.success("A category success created", "Success!");
                // req.flash("success", "A category success created");
                res.redirect("/category/list", {
                    title: "category",
                });
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError)
                if (error.code === "P2002") {
                    req.toastr.error(
                        "A category with this name is already in use",
                        "Error!",
                    );
                }

            res.redirect("/category/create");
            console.log(error);
        }
    }

    static async edit(req, res, next) {
        try {
            const result = await prisma.category.findUnique({
                where: { id: Number(req.params.id) },
            });

            if (result === null) {
                return next();
            }

            res.render("category/edit", {
                category: result,
                title: "category",
            });
        } catch (error) {
            req.toastr.error(
                "A category with this name is already in use",
                "Error!",
            );
            res.redirect("/category");
        }
    }

    static async update(req, res) {
        try {
            const result = await prisma.category.update({
                where: {
                    id: Number(req.params.id),
                },
                data: {
                    category: req.body.category,
                },
            });

            if (result) {
                req.toastr.success("A category success updated", "Success!");
                res.redirect("/category/list", {
                    title: "category",
                });
            } else {
                req.toastr.error("A category not found", "Error!");
                res.redirect("/category/list");
            }
        } catch (error) {
            console.log(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError)
                if (error.code === "P2002") {
                    req.toastr.error("A category not found", "Error!");
                }

            res.redirect("/category/" + req.params.id + "/edit/");
        }
    }

    static async delete(req, res) {
        const { id } = req.body;
        try {
            const del = await prisma.category.delete({
                where: {
                    id: Number(id),
                },
            });

            if (del) {
                req.toastr.success("A category success delete", "Success!");
                res.redirect("/category/list");
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError)
                if (error.code === "P2002") {
                    req.toastr.error("A category not found", "Error!");
                } else if (error.code == "P2003") {
                    req.toastr.error("A category not found", "Error!");
                }

            res.redirect("/category/list");
        }
    }
}

module.exports = CategoryController;

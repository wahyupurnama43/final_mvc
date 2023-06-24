const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

class ProductController {
    static async index(req, res) {
        const result = await prisma.product.findMany({
            include: {
                category: {
                    select: {
                        category: true,
                    },
                },
            },
        });
        res.render("product/list", { product: result, title: "product" });
    }

    static async create(req, res) {
        const result = await prisma.category.findMany();

        res.render("product/add", { category: result, title: "product" });
    }

    static async store(req, res) {
        const { nameProduct, category, qty, price, status, desc } = req.body;
        const { filename } = req.file;
        try {
            const result = await prisma.product.create({
                data: {
                    name: nameProduct,
                    qty: Number(qty),
                    desc: desc,
                    Available: Number(status),
                    price: Number(price),
                    img: filename,
                    categoryId: Number(category),
                },
            });

            if (result) {
                req.toastr.success("A category success created", "Success!");
                // req.flash("success", "A category success created");
                res.redirect("/product/list");
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError)
                if (error.code === "P2002") {
                    req.toastr.error(
                        "A category with this name is already in use",
                        "Error!",
                    );
                }

            res.redirect("/product/create");
            console.log(error);
        }
    }

    static async edit(req, res) {
        const result = await prisma.product.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });

        const category = await prisma.category.findMany();

        res.render("product/edit", {
            product: result,
            category: category,
            title: "product",
        });
    }

    static async update(req, res) {
        const { nameProduct, category, qty, price, status, desc } = req.body;
        try {
            await prisma.product.update({
                where: {
                    id: Number(req.params.id),
                },
                data: {
                    name: nameProduct,
                    qty: Number(qty),
                    desc: desc,
                    Available: Number(status),
                    price: Number(price),
                    img: req.file ? req.file.filename : undefined,
                    categoryId: Number(category),
                },
            });
            req.toastr.success("A category success created", "Success!");
            res.redirect("/product/list");
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError)
                if (error.code === "P2002") {
                    req.toastr.error(
                        "A category with this name is already in use",
                        "Error!",
                    );
                }

            res.redirect("/product/" + Number(req.params.id) + "/edit");
            console.log(error);
        }
    }

    static async delete(req, res) {
        const { id } = req.body;
        try {
            const del = await prisma.product.delete({
                where: {
                    id: Number(id),
                },
            });

            if (del) {
                req.toastr.success("A product success delete", "Success!");
                res.redirect("/product/list");
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError)
                if (error.code === "P2002") {
                    req.toastr.error("A product not found", "Error!");
                } else if (error.code == "P2003") {
                    req.toastr.error("A product not found", "Error!");
                }

            res.redirect("/product/list");
        }
    }

    static async transaksi(req, res) {
        const result = await prisma.product.findMany({
            include: {
                category: {
                    select: {
                        category: true,
                    },
                },
            },
        });
        res.render("transaksi/list", { product: result, title: "transaksi" });
    }
}

module.exports = ProductController;

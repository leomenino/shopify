const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

const products = [
    { id: 1, name: "Apple", price: 1.15, image: "https://gastronomiacarioca.zonasul.com.br/wp-content/uploads/2020/06/maca_Argentina.jpg" },
    { id: 2, name: "Pear", price: 1.25, image: "https://healthjade.com/wp-content/uploads/2017/10/pear.jpg" },
    { id: 3, name: "Orange", price: 1.50, image: "https://www.heddensofwoodtown.co.uk/wp-content/uploads/2020/05/oranges_opt.jpg" },
    { id: 4, name: "Zero Coke", price: 1.50, image: "https://www.debriar.co.uk/uploads/images/zoom/coke_z_can.jpg" },
];

app.use(cors());

app.get("/", (req, res) => {
    res.send("ok!");
});

app.get("/products", (req, res) => {
    res.json(products);
});

app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.json(product);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
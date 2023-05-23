import React, { useState } from "react";
import axios from "axios";
function ProductsAdd(props) {
    const iniState = { product_name: "", product_price: 0 }
    const [product, setProduct] = useState(iniState);

    function cancelProduct() {
        props.history.push("/productslists")
    }

    function handleSubmit(e) {
        e.preventDefault();
        async function postProduct() {
            try {
                await axios.post("http://localhost:3001/api/products", product);
                props.history.push("/productlists");
            } catch (err) {
                console.log("Error : " + err);
            }
        }
        postProduct();
    }
    return (
        <div>
            <h1>เพิ่มข้อมูลสินค้าใหม่</h1><hr />
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="product_name">ชื่อสินค้า :</label>
                        <input
                            type="text"
                            name="product_name"
                            id="product_name"
                            className="form-control"
                            placeholder="ชื่อสินค้า"
                            value={product.product_name}
                            onChange={e => setProduct({ ...product, product_name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label for="product_price">ราคาสินค้า :</label>
                        <input
                            type="number"
                            name="product_price"
                            id="product_price"
                            className="form-control"
                            placeholder="ราคาสินค้า"
                            value={product.product_price}
                            onChange={e => setProduct({ ...product, product_price: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">เพิ่มสินค้า</button>
                    <button type="button" className="btn btn-warning" onClick={cancelProduct}>ยกเลิก</button>
                </form>
            </div>
        </div>
    );
}

export default ProductsAdd;
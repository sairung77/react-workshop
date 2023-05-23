// @flow 
import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "http://localhost:3001/api/products"
function ProductsEdit(props) {
    const iniState = { product_name: "", product_price: 0 }
    const [product, setProduct] = useState(iniState)

    useEffect(() => {
        async function getProduct() {
            try {
                const res = await axios.get(url + "/" + props.match.params.id);
                setProduct(res.data)
            } catch (err) {
                console.log("Error : ", err)
            }
        }

        getProduct();
    }, [props])


    function handleSubmit(e) {
        e.preventDefault();
        async function updateProduct() {
            try {
                await axios.put(url + "/" + product.id, product);
                props.history.push("/productslists")
            } catch (err) {
                console.log("Error : ", err)
            }
        }
        updateProduct();

    }

    function cancelProduct() {
        props.history.push("productlists");
    }


    return (
        <div>
            <h1>แก้ไขข้อมูล {product.product_name}</h1><hr />
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
                    <button type="submit" className="btn btn-primary">แก้ไขข้อมูล</button>
                    <button typr="button" className="btn btn-warning" onClick={cancelProduct}>ยกเลิก</button>
                </form>
            </div>
        </div>
    );
};
export default ProductsEdit;
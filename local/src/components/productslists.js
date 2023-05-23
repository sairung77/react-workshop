import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
function Productslists(props) {
    const [products, setProducts] = useState([]);
    const url = "http://localhost:3001/api/products";

    useEffect(function () {
        async function getProductsLists() {
            try {
                const res = await Axios.get(url);
                setProducts(res.data);
            } catch (err) {
                console.log("Error : ", err)
            }
        }
        getProductsLists();
    }, []);

    return (
        <div>
            <div>
                <Link to="/productsadd" className="btn btn-primary float-right">เพิ่มสินค้าใหม่</Link>
            </div>
            <br />
            <br />
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>รหัสสินค้า</th>
                            <th>ชื่อสินค้า</th>
                            <th>ราคาสินค้า</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product) => {
                                return (
                                    <tr>
                                        <td>{product.id}</td>
                                        <td><Link to={"/products/" + product.id}>{product.product_name}</Link></td>
                                        <td>{product.product_price}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Productslists;
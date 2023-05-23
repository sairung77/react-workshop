import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const url = "http://localhost:3001/api/products";


function ProductsInfo(props) {
    const [product, setProduct] = useState({});

    useEffect(
        async function getProduct() {
            try {
                const res = await Axios.get(url + "/" + props.match.params.id);
                setProduct(res.data)
            } catch (err) {
                console.log("Error : ", err)
            }
        }
        , [props]);


    async function delProduct(){
        try{
            await Axios.delete(url+ "/" + props.match.params.id);
            props.history.push("/productslists")
        }catch (err){
            console.log("Error : ", err)
        }
    }
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">{product.id}.{product.product_name}</h3>
                    <div className="btn-group">
                        <Link to={"/productsedit/" + product.id} className="btn btn-primary">
                            แก้ไข
                        </Link>
                        <button onClick={delProduct} className="btn btn-danger">ลบ</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsInfo
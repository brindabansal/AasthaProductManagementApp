import { hover } from '@testing-library/user-event/dist/hover';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
const Productlist = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();

    }, [])
    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);

    }


    const deleteProduct=async (id)=>{
        let result=  await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete"
        });
        result=await result.json();
        if(result){
            alert("record is deleted, Refresh to check");
        }
    };

//event means pure k pure element ko print krdeta
    const searchHandle=async (event)=>{
        let key=event.target.value;
        if(key){
            let result=await fetch(`http://localhost:5000/search/${key}`);
            result=await result.json();
            if(result){
                setProducts(result);
        }
       
        }
        else{
            getProducts();
        }

    }








    return (

        <div className="product-list">
            <h1>Product list</h1>
            <input type="text" className='search-product-box' placeholder='Search product' onChange={searchHandle}/>
            <ul>
                <li><b><i>S.No</i></b></li>
                <li><b><i>Name</i></b></li>
                <li><b><i>Price</i></b></li>
                <li><b><i>Category</i></b></li>
                <li><b><i>Company</i></b></li>
                <li><b><i>operations</i></b></li>
            </ul>

            { products.length>0 ? products.map((item,index) =>
                <ul key={item._id}>
                    <li>{index+1}</li>
                    <li>{item.name}</li>
                    <li>${item.price}</li>
                    <li>{item.category}</li>
                    <li>{item.company}</li>
                    <li><button className='deleteANDupdate'  onClick={()=>deleteProduct(item._id)}>Delete</button>  <button className='deleteANDupdate'><Link to={"/update/"+item._id}>Update</Link></button></li>
                    
                </ul>)
                :<h3>No Result Found </h3>}

        </div>

    )
}
export default Productlist;
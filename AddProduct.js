// import React from 'react'

// const AddProduct=()=>{
//     const [name, setName] = React.useState("");
//     const [price, setPrice] = React.useState("");
//     const [category, setCategory] = React.useState("");
//     const [company, setCompany] = React.useState("");
    
//     const addProduct=()=>{
//         console.warn(name,price,category,company)
//     }



//     return(
//         <div className="product">
//             <h1>Add Product</h1> 
//             <input type="text" placeholder="Enter Product Name" className='inputBox' value={name} onChange={(e) => setName(e.target.value)}/>
//             <input type="text" placeholder="Enter Product Price" className='inputBox' value={price} onChange={(e) => setPrice(e.target.value)}/>
//             <input type="text" placeholder="Enter Product Category" className='inputBox'value={category}  onChange={(e) => setCategory(e.target.value)}/>
//             <input type="text" placeholder="Enter Product Company" className='inputBox' value={company} onChange={(e) => setCompany(e.target.value)}/>
//             <button onClick={addProduct} className='appButton' >Add Product</button>
//         </div>
//     )
// }

// export default AddProduct;



import React from 'react';

const AddProduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [image, setImage] = React.useState(null); // State to hold the selected image file
    const [error,setError]=React.useState(false)




    const addProduct = async () => {
        if(!name || !price || !category || !company){
            setError(true)
            return false;
        }
        
        console.warn(name, price, category, company, image);
        const userId=JSON.parse(localStorage.getItem('user'))._id;
        let result= await fetch("http://localhost:5000/add-product",{
            method:'post',
            body:JSON.stringify({name,price,category,company,userId,image}),
            headers:{
                "Content-Type":"application/json"
                
            }
          });
          result= await result.json();
          console.warn(result);
          alert('product added!,Go Back to Home page');
    
    
    }

    // Function to handle file input change
    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Set the selected image file in the state
    };

    return (
        <div className="product">
            <p>Add Product</p>
            <input type="text" placeholder="Enter Product Name" className='inputBox' value={name} onChange={(e) => setName(e.target.value)} />
            {error && !name &&<span className='invalid-input'>Enter valid name</span>}
            <input type="text" placeholder="Enter Product Price" className='inputBox' value={price} onChange={(e) => setPrice(e.target.value)} />
            {error && !price &&<span className='invalid-input'>Enter valid Price</span>}
            <input type="text" placeholder="Enter Product Category" className='inputBox' value={category} onChange={(e) => setCategory(e.target.value)} />
            {error && !category &&<span className='invalid-input'>Enter valid Category</span>}
            <input type="text" placeholder="Enter Product Company" className='inputBox' value={company} onChange={(e) => setCompany(e.target.value)} />
            {error && !company &&<span className='invalid-input'>Enter valid Company</span>}
            {/* Input field for image */}
            <input type="file" accept="image/*" className="file-input" onChange={handleImageChange} /><div></div>
            <button onClick={addProduct} className='appButton'>Add Product</button>
        </div>
    );
};

export default AddProduct;
import React, {Fragment, useEffect, useState} from 'react';


const Product = () => {
    const [category, setCategory] = useState([]);
    async function fetchCategories(){
        await axios.get('/api/category')
        .then((response) => response.json())
        .then(data => setCategory(data) );
        
    }
    useEffect(() => {
            fetchCategories();
            console.log(category)
    }, []);
    
    const [formData, setFormData] = useState({
        productname:'',
        description:'',
        price:''
    });
  const {productname,  description, price} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    
  }

  if(isAuthenticated){
    return <Redirect to="/"/>
  }
  return (
  <Fragment>
  <h1 className="large text-main">Login</h1>
  <form className="form" onSubmit={e => onSubmit(e)}>
    <div className="form-group">
      <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required/>
     
    </div>
    <div className="form-group">
      <input
        type="password"
        placeholder="Password"
        name="password"
        minLength="1"
        maxLength={8}
        value={password}
        onChange={e => onChange(e)}
      />
    </div>
    
    <input type="submit" className="btn btn-primary" value="Login" />
  </form>
  <p className="my-1">
    Don't have an account? <a to="/register">Register</a>
  </p>
</Fragment>)
};




export default Product;
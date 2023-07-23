import React, { useEffect, useState,useRef } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';

export default function Card(props) {
let dispatch = useDispatchCart();
console.log(props.id);
//use cart is basically the state of cart 
let data = useCart();
const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);
  //will give keys of the object here that would be half ,full etc
  const [qty,setQty] = useState(1);
  const [size,setSize] = useState("");

  const handleAddToCart = async ()=>{

    let food = []
    for (const item of data) {
      if (item._id === props.id) {
        food = item;
        break;
      }
    }

    if(food!==[]){
      //half ka half hi rha hai sirf qty change hui hai size same hi hai then updagte krdo no edding
      if(food.size === size){
        await dispatch({ type: "UPDATE", id: props.id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.id, name: props.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return;
      }
      return;
    }

    await dispatch({type:"ADD",id:props.id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
    // await console.log(data)
  }

//basically qty*price
  let finalPrice = qty*parseInt(options[size]);
  
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])

  return (
    <div>
      <div>
        <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px",padding:"10px" }}>
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"120px",objectFit:"Fill"}}/>
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>

            <div className="container w-100">
              <select className='m-2 h-100 bg-success rounded' onChange={(e)=> setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  )
                })}
              </select>
              
              <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                  {priceOptions.map((data)=>{
                    return <option key={data} value={data}>{data}</option>
                  })}
              </select>

              <div className='d-inline h-100 fs-5'>
              ₹{finalPrice}/-
              </div>
            </div>
            <hr/>
            <button className={'btn btn-success justify-cennter ms-2'} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

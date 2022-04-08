import React from "react";
import "./styles.scss"
import Data from "../../data/data.json";
import { BsFillTrashFill } from "react-icons/bs";

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productname: "",
            image: "",
            price: "",
            pending: false,
            counter: 0
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.checkImageURL(this.state.image);

    }


    onSubmit = (e) => {
        e.preventDefault();
        console.log("onsubmit");
        const products = this.state;

        this.setState({ pending: true })

        fetch("http://localhost:8000/products", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(products)
        }).then(() => {
            this.setState({ pending: false })
        })
        this.setState({ productname: "", image: "", price: "" })
    }

    onAddToCart = () => {
        let count = this.state.counter;
        this.setState({counter: count + 1});
    }

    deleteProduct = (id) => {
        console.log("delete")
        this.setState({ pendig: false })

        fetch("http://localhost:8000/products/"+ id, {
            method:"DELETE",
            headers: { "Content-type": "application/json" },
        }).then(() => {
            this.setState({ pending: false})
        })
        this.setState({ productname: "", image: "", price: "" })
    }

    checkImageURL= async (url) => {
        await fetch(url)
        .then((response) => {
            if(response.status === 200){
                console.log("exists")
            }
            else{
                this.setState({image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMFm8eXQHeAtAFkY2WBztX3RFB5ONe0RAT7g&usqp=CAU"})
            }
        })
    }

    displayProducts() {
        return Data.products.map((products) => {
            const productimg = products.image;
            const productname = products.productname;
            const productprice = products.price;
            const productid = products.id;
            return <div className="product">
                <div className="thumb">
                    <BsFillTrashFill className="icon" type="submit" onClick={() => {this.deleteProduct(productid)}}/>
                    <img src={productimg}/>   
                </div>
                <div className="details">
                    <ul>
                        <li>
                            <span className="name">
                                {productname}
                            </span>
                        </li>
                        <li>
                            <span className="price">
                                {productprice} €
                            </span>
                        </li>
                        <li>
                        <div className="addToCart">
                                <button className="btn43-44 btn-45" onClick={this.onAddToCart}>
                                    Add to card
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        });
    }

    render() {
        const { productname, image, price } = this.state;
        return (
            <div className="main">
                <form className="form" onSubmit={this.onSubmit}>
                    <h2>Add product to cart</h2>
                    <input type="url" value={image} name="image" onChange={this.onChange} required placeholder="Image URL" />
                    <input type="text" value={productname} name="productname" onChange={this.onChange} required placeholder="Product name" />
                    <input type="number" value={price} name="price" onChange={this.onChange} required placeholder="Price" />
                    {!this.state.pending && <button className="btn43-44 btn-45" type="submit">Submit</button>}
                    {this.state.pending && <button className="btn43-44 btn-45" type="submit">Submitting...</button>}
                </form>
                <h3>Cart items: {this.state.counter}</h3>
                <div className="products">
                    {this.displayProducts()}
                </div>
            </div>
        );
    }
}
export default Cart;
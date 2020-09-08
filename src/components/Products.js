import React, { Component } from "react";
import formatCurrency from "../utils/format";

export default class Products extends Component {
  render() {
    return (
      <div>
        <ul className="products">
          {this.props?.products?.map((ele) => (
            <li key={ele._id}>
              <div className="product">
                <a href="">
                  <img src={ele.image}></img>
                  <p>{ele.title}</p>
                </a>
                <div className="product-price">
                  <div>{formatCurrency(ele.price)}</div>
                  <button className="button primary"  onClick={() => this.props.addToCart(ele)} >Add to cart</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

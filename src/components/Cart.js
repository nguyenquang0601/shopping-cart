import React, { Component } from "react";
import formatCurrency from "../utils/format";

export default class Cart extends Component {
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems?.length === 0 ? (
          <div className="cart cart-header">Cart Item empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the Cart{" "}
          </div>
        )}
        <div>
          <div className="cart">
            <ul className="cart-items">
              {cartItems.map((ele) => (
                <li key={ele._id}>
                  <div>
                    <img src={ele.image} alt={ele.title} />
                  </div>
                  <div>
                    <div>{ele.title}</div>
                    <div className="right">
                      {formatCurrency(ele.price)} x {ele.count}{" "}
                      <button
                        className="button"
                        onClick={() => this.props.removeFromCart(ele)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartItems.length !== 0 && (
            <div className="cart">
              <div className="total">
                <div>
                  Total :{" "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button className="button primary">Proceed</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

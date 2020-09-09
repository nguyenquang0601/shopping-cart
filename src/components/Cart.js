import React, { Component } from "react";
import formatCurrency from "../utils/format";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../utils/redux/cartActions";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.addressRef = React.createRef();
    this.nameRef = React.createRef();
    this.state = { showCheckout: false };
  }
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.nameRef.current.value,
      address: this.addressRef.current.value,
      email: this.emailRef.current.value,
      cartItems: this.props.cartItems,
    };
    console.log(order);
    this.props.createOderAll(order);
  };
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
            <Fade left cascache>
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
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total :{" "}
                    {formatCurrency(
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button primary"
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.showCheckout ? (
                <Fade right cascache>
                  <div className="cart">
                    <form onSubmit={(e) => this.createOrder(e)}>
                      <ul className="form-container">
                        <li>
                          <label>Email: </label>
                          <input
                            type="email"
                            required
                            ref={this.emailRef}
                          ></input>
                        </li>
                        <li>
                          <label>Name: </label>
                          <input
                            type="text"
                            required
                            ref={this.nameRef}
                          ></input>
                        </li>
                        <li>
                          <label>Address: </label>
                          <input
                            type="text"
                            required
                            ref={this.addressRef}
                          ></input>
                        </li>
                        <li>
                          <button className="button primary" type="submit">
                            Checkout
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});
const mapDispatchtoProps = {
  addToCart,
  removeFromCart,
};
export default connect(mapStateToProps, mapDispatchtoProps)(Cart);

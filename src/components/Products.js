import React, { Component } from "react";
import formatCurrency from "../utils/format";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { fetchProducts } from "../utils/redux/productActions";
// import { Zoom } from "react-toastify";
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }
  componentDidMount(){
    this.props.fetchProducts()
  }
  openModal = (product) => {
    console.log(product);
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };
  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          <ul className="products">
            {this.props?.products?.map((ele) => (
              <li key={ele._id}>
                <div className="product">
                  <a href="#" onClick={() => this.openModal(ele)}>
                    <img src={ele.image}></img>
                    <p>{ele.title}</p>
                  </a>
                  <div className="product-price">
                    <div>{formatCurrency(ele.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => this.props.addToCart(ele)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              {" "}
              <button className="close-modal" onClick={this.closeModal}>
                X
              </button>
              <div className="product-details">
                <img src={product.image}></img>
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>
                    <strong>{product.description}</strong>
                  </p>
                  <p>
                    Avaiable Sizes
                    {product.availableSizes.map((ele) => {
                      return (
                        <span>
                          {" "}
                          <button className="button">{ele}</button>
                        </span>
                      );
                    })}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Add to Cart{" "}
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  products: state.products.items,
});
const mapDispatchToProps = {
  fetchProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);

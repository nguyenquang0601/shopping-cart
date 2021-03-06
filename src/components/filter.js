import React, { Component } from "react";
import { connect } from "react-redux";
// import {  } from "";
import { filterProducts, sortProducts } from "../utils/redux/productActions";
class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter-result">
          {this.props.filteredProducts?.length} Products
        </div>
        <div className="filter-sort">
          {" "}
          Order{" "}
          <select
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortProducts(this.props.products, e.target.value)
            }
          >
            <option>Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        <div className="filter-size">
          Filter
          <select
            value={this.props.size}
            onChange={(e) =>
              this.props.filterProducts(this.props.products, e.target.value)
            }
          >
            <option value="">ALL</option>
            <option value="XS">XS</option>
            <option value="X">X</option>
            <option value="M">M</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  size: state.products.size,
  sort: state.products.sort,
  products: state.products.items,
  filteredProducts: state.products.filteredProducts,
});
const mapDispatchToProps = {
  filterProducts,
  sortProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);

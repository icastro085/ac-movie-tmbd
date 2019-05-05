import React, { Component } from 'react';

export default class Pagination extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: this.props.currentPage,
    };
  }

  shouldComponentUpdate({ totalPages }, { currentPage }) {
    return (
      totalPages !== this.props.totalPages ||
      currentPage !== this.state.currentPage
    );
  }

  onChangePage(page) {
    const { totalPages, changePage } = this.props;
    if (page > 0 || page < totalPages) {
      this.setState({
        currentPage: page,
      }, () => changePage(page));
    }
  }

  render() {
    const { totalPages } = this.props;
    const { currentPage } = this.state;

    const pageNumbers = [];
    for(let i = 0; i < totalPages; i++) {
      let page = i + 1;
      pageNumbers.push(
        <li className={`page-item ${page == currentPage ? 'active' : ''}`} key={`keyp${i}`}>
          <a className="page-link" onClick={() => this.onChangePage(page)}>
            {page}
          </a>
        </li>
      );
    }

    return (
      <nav className="my-5">
        <ul className="pagination">
          <li className={`page-item ${(currentPage === 1) && 'disabled'}`}>
            <a className="page-link" onClick={() => this.onChangePage(currentPage - 1)}>
              Previous
            </a>
          </li>
          {pageNumbers}
          <li className={`page-item ${(currentPage === totalPages) && 'disabled'}`}>
            <a className="page-link" onClick={() => this.onChangePage(currentPage + 1)}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

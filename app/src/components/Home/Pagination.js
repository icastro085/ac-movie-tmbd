import React, { Component } from 'react';

const MIN_PART = 0.05;
const MAX_PART_PAGE = 5;

export default class Pagination extends Component {
  constructor(props) {
    super(props);

    this.idTimeoutChangePage = null;

    this.state = {
      currentPage: this.props.currentPage,
      totalPages: this.props.totalPages,
    };
  }

  updatePaginationControll(newTotalPages) {
    let { totalPages, currentPage } = this.state;
    if (newTotalPages) {
      totalPages = newTotalPages;
    }

    if (totalPages <= 15) {
      this.countPart = this.firstPart = this.lastPart = this.middleFistPart = this.middleLastPart = -1;
    } else {
      this.countPart = Math.ceil(totalPages * MIN_PART);
      this.countPart = this.countPart > MAX_PART_PAGE ? MAX_PART_PAGE : this.countPart;

      this.firstPart = this.countPart;
      this.lastPart = totalPages - this.countPart;

      this.middleFistPart = Math.ceil(totalPages / 2) - Math.ceil(this.countPart / 2);
      this.middleLastPart = this.middleFistPart + this.countPart;
      this.lastPage = currentPage;
    }
  }

  componentWillMount() {
    this.updatePaginationControll();
  }

  componentWillReceiveProps(props) {
    if (props.totalPages !== this.state.totalPages) {
      this.updatePaginationControll(props.totalPages);
    }
  }

  shouldComponentUpdate({ totalPages }, { currentPage }) {
    return (
      totalPages !== this.props.totalPages ||
      currentPage !== this.state.currentPage
    );
  }

  onChangePage(page) {
    const { totalPages, changePage } = this.props;
    const { currentPage } = this.state;

    if (page > 0 || page < totalPages) {

      clearTimeout(this.idTimeoutChangePage);

      this.lastPage = currentPage;
      this.setState({
        currentPage: page,
      }, () => this.idTimeoutChangePage = (
        setTimeout(() => changePage(page), 500))
      );
    }
  }

  render() {
    const { totalPages } = this.props;
    const { currentPage } = this.state;

    if (totalPages <= 15) {
      this.firstPart = this.lastPart = this.middleFistPart = this.middleLastPart = -1;
    } else if (
      currentPage > this.firstPart + 1 &&
      (
        currentPage < this.middleFistPart + 1 ||
        currentPage > this.middleLastPart + 1
      )
    ) {
      if (this.lastPage < currentPage) {
        this.middleFistPart = currentPage - 1;
        this.middleLastPart = this.middleFistPart + this.countPart;
      } else {
        this.middleLastPart = currentPage - 1;
        this.middleFistPart = this.middleLastPart - this.countPart;
      }
    }

    const pageNumbers = [];
    for(let i = 0; i < totalPages; i++) {
      let page = i + 1;
      if (
        i <= this.firstPart ||
        i >= this.lastPart ||
        (
          i >= this.middleFistPart &&
          i <= this.middleLastPart
        )
      ) {
        if (i === this.middleFistPart && i > this.firstPart + 1) {
          pageNumbers.push(
            <span key={`keypp${i}`} className="mx-2">...</span>
          );
        }

        pageNumbers.push(
          <li className={`page-item ${page == currentPage ? 'active' : ''}`} key={`keyp${i}`}>
            <a className="page-link" onClick={() => this.onChangePage(page)}>
              {page}
            </a>
          </li>
        );

        if (i === this.middleLastPart && i < this.lastPart - 1) {
          pageNumbers.push(
            <span key={`keypp${i}`} className="mx-2">...</span>
          );
        }
      }
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

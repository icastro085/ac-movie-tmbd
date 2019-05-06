import React, { Component } from 'react';

export default class Pagination extends Component {
  constructor(props) {
    super(props);

    this.idTimeoutChangePage = null;

    this.state = {
      currentPage: this.props.currentPage,
      totalPages: this.props.totalPages,
    };
  }

  componentWillReceiveProps(props) {
    if (
      props.totalPages !== this.state.totalPages ||
      props.currentPage !== this.state.currentPage
    ) {
      this.setState({
        currentPage: props.currentPage,
        totalPages: props.totalPages,
      });
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

    if (page && page > 0 && page <= totalPages) {
      clearTimeout(this.idTimeoutChangePage);

      this.lastPage = currentPage;
      this.setState({
        currentPage: page,
      }, () => this.idTimeoutChangePage = (
        setTimeout(() => changePage(page), 1000))
      );
    } else {
      this.setState({ currentPage });
    }
  }

  render() {
    const { totalPages } = this.props;
    const { currentPage } = this.state;

    return (
      <nav className="my-4">
        <ul className="pagination pagination-md">
          <li className={`page-item ${(currentPage === 1) && 'disabled'}`}>
            <a href="/#/" className="page-link" onClick={() => this.onChangePage(currentPage - 1)}>
            <i className="fas fa-arrow-left" />
            </a>
          </li>
          <li className="mx-2 col-md-2 col-sm-6">
            <div className="form-group row">
              <div className="w-50">
                <input
                  id="input-pag"
                  type="number"
                  min="1"
                  max={totalPages}
                  className="form-control text-center form-control-md" 
                  value={currentPage}
                  onChange={(e) => this.onChangePage(parseInt(e.target.value))}
                  />
              </div>

              <label
                htmlFor="input-pag"
                className="w-50 text-center col-form-label col-form-label-md"
              >
                <span className="mr-2">of</span>{totalPages}
              </label>
            </div>
          </li>
          <li className={`page-item ${(currentPage === totalPages) && 'disabled'}`}>
            <a href="/#/" className="page-link" onClick={() => this.onChangePage(currentPage + 1)}>
              <i className="fas fa-arrow-right" />
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

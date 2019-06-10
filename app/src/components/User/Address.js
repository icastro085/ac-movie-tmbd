import React, { Fragment } from 'react';

const Address = ({
  onChangeAddress,
  saveAddress,
  address = '',
  city = '',
  state = '',
  number = '',
  phone = '',
}) => (
  <form onSubmit={() => {
    saveAddress();
    return false;
  }}>
    <div className="form-group">
      <label>Address</label>
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="Ex.: Rua 20"
        onChange={(e) => onChangeAddress('address', e.target.value)}
        defaultValue={address.trim()}
      />
      <small className="form-text text-muted">
        We'll never share your address with anyone else.
      </small>
    </div>

    <div className="form-row">
      <div className="form-group col-md-6">
        <label>City</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Ex.: Manaus"
          onChange={(e) => onChangeAddress('city', e.target.value)}
          defaultValue={city.trim()}
        />
      </div>

      <div className="form-group col-md-3">
        <label>State</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder=" Ex.: AM"
          onChange={(e) => onChangeAddress('state', e.target.value)}
          defaultValue={state.trim()}
        />
      </div>

      <div className="form-group col-md-3">
        <label>Number</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Ex.: 20-A"
          onChange={(e) => onChangeAddress('number', e.target.value)}
          defaultValue={number.trim()}
        />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group col-md-5">
        <label>Phone</label>
        <input
          type="tel"
          className="form-control form-control-lg"
          placeholder="Ex.: 92 9888-9955"
          onChange={(e) => onChangeAddress('phone', e.target.value)}
          defaultValue={phone.trim()}
        />
      </div>
    </div>

    <hr />
    <button type="submit" className="btn btn-primary btn-lg ">
      Save
    </button>
  </form>
);

export default Address;

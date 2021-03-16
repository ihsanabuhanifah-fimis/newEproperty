import React from "react";
export const Input = ({ label, validasi, ...rest }) => {
  return (
    <React.Fragment>
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <input {...rest} />
        <div id="emailHelp" className="form-text">
          {validasi}
        </div>
      </div>
    </React.Fragment>
  );
};

export const Button = ({ label, ...rest }) => {
  return (
    <div>
      <button {...rest}>{label}</button>
    </div>
  );
};

export const Spinner = ({ ...rest }) => {
  return (
    <div className="spinner-border text-success" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const Alert = ({ pesan, alert, ...rest }) => {
  return (
    <div {...rest} className={`alert ${alert}`} role="alert">
      {pesan}
    </div>
  );
};
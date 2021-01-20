import React from "react";

export default function RecordCard({detail}) {
    return (
        <div className="card">
            <div className="card--content">
            <h3 className="card--title">{detail.records}</h3>
            <h5 className="card--subtitle">{detail.profiles}</h5>
            <p><b><small>FirstName: {detail.FirstName}</small></b></p>
            <p><b><small>LastName: {detail.LastName}</small></b></p>
            <p><b><small>Gender: {detail.Gender}</small></b></p>
            <p><b><small>Latitude: {detail.Latitude}</small></b></p>
            <p><b><small>Longitude: {detail.Longitude}</small></b></p>
            <p><b><small>CreditCardNumber: {detail.CreditCardNumber}</small></b></p>
            <p><b><small>CreditCardType: {detail.CreditCardType}</small></b></p>
            <p><b><small>Email: {detail.Email}</small></b></p>
            <p><b><small>DomainName: {detail.DomainName}</small></b></p>
            <p><b><small>PhoneNumber: {detail.PhoneNumber}</small></b></p>
            <p><b><small>MacAddress: {detail.MacAddress}</small></b></p>
            <p><b><small>URL: {detail.URL}</small></b></p>
            <p><b><small>UserName: {detail.UserName}</small></b></p>
            <p><b><small>LastLogin: {detail.LastLogin}</small></b></p>
            <p><b><small>PaymentMethod: {detail.PaymentMethod}</small></b></p>
            <p className="card--desc"><i>status: {detail.status}</i></p>
            <p><b><small>size: {detail.size}</small></b></p>
            </div>

        </div>
    )
}

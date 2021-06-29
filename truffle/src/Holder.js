import dai from './dai.png'
import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';



const Holder = (props) => {
  const [cuenta, setCuenta] = useState(null);
  const [cantidad, setCantidad] = useState(null);


  const transferAmmount = (e) => {

    e.preventDefault();
    console.log("cantidad",cantidad)
    let amount = window.web3.utils.toWei(cantidad.toString(), 'Ether');
    // toHo = window.web3.utils.toWei(cantidad, 'Ether')
    props.sendTokens(amount,cuenta);
  }
 
    return (
      <div id="content" className="mt-3">

        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Current Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{window.web3.utils.fromWei(props.currentBalance, 'Ether')} CMT</td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3">
              <div>
                <label className="float-left"><b>Comisioned Tokens</b></label>
                <span className="float-right text-muted">
                  Balance: {window.web3.utils.fromWei(props.comisionedSaved.toString(), 'Ether')}
                </span>
              </div>
              <div className="input-group mb-4">
                <InputText onInput={(e) => setCantidad(e.target.value)} placeholder="cantidad" />
                <InputText onInput={(e) => setCuenta(e.target.value)} placeholder="Direccion" />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={dai} height='32' alt=""/>
                    &nbsp;&nbsp;&nbsp; Comisioned Coin
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg" onClick={(e)=>{transferAmmount(e)}}> SEND!</button>
            </form>
          
          </div>
        </div>

      </div>
    );
  
}

export default Holder;

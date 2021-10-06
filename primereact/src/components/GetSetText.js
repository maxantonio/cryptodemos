import React, {useState, useEffect, Component, useRef} from 'react';
import Web3 from "web3";
import  SampleString from "../abis/SampleString.json"
import {Toast} from "primereact/toast";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign-contract";

import {signAndSendTransaction} from '../ethereum/helpers/index';
import {DataView} from "primereact/dataview";

class GetSetText extends Component{



    constructor(props) {
        super(props);

        // this.address = this.props.match.params.address;

        this.state = {
            recipient: '',
            value: '',
            currentValue:'',
            error: '',
            success: false,
            loading: false,
            privateKeyModal: true,
            account:{},
            accountBalance:0,
            DAIBalance:0,

            // toastRef: Toast(),
            // privateKeyModal: false
        };
        this.loadBalances()

        let privateKey = sessionStorage.getItem('pkencoded');
        console.log("cargando llave")
        if (!privateKey) {
            console.log(" llave no encontrada")

            this.state.privateKeyModal=false;
            return;
        } else {
            privateKey = decode(privateKey);
            this.state.privateKey = privateKey
            console.log(" llave encontrada",privateKey)
        }

        let account = web3.eth.accounts.privateKeyToAccount(privateKey)
        this.state.account = account


    }
    loadBalances(){
        const d=5777 //temporalmente el network id
        const _sampleString = SampleString.networks[d];
        let sampleString = new web3.eth.Contract(
            SampleString.abi,
            _sampleString.address,
        );
        sampleString.methods.set("en caliente").call().then(a =>console.log(a))
        sampleString.methods.get().call().then(a =>this.setCurrentValue(a))
    }
    showText(text,severity=false){
        if(!severity){
            severity = 'info'
        }
        if (text) {
            // this.state.toastRef.current.show({ severity: severity, summary: text, life: 3000 });
        }
    }
    loading(){
        this.showText("Una transaccion puede tomar varios segundos, por favor sea paciente ","info" )
    }

    setCurrentValue(p){
        console.log("current value ",p)
        this.setState({currentValue:p});
    }

    success(){
        this.showText("Su transaccion se completo satisfactoriamente ","info" )
    }


    savePrivateKey = async event => {
        event.preventDefault();
        console.log(this.state.privateKey);
        sessionStorage.setItem('pkencoded', encode(this.state.privateKey));
        console.log("SAVED IN SESSION STORAGE")
        this.setState(
            { privateKeyModal: true }
        )

    }
    removeCurrentKey = async event => {
        sessionStorage.removeItem('pkencoded');
        console.log("removed IN SESSION STORAGE")
        this.setState(
        { privateKeyModal: false }
        )

    }

    onSubmit = async event => {
        event.preventDefault();
        this.setState({ success: false });

        let privateKey = this.state.privateKey;

        const d=5777 //temporalmente el network id
        const _sampleString = SampleString.networks[d];
        let sampleString = new web3.eth.Contract(
            SampleString.abi,
            _sampleString.address,
        );

        try {
            const makeRequest = await sampleString.methods.set(this.state.value);
            const options = {
                to: makeRequest._parent._address,
                data: makeRequest.encodeABI(),
                gas: '1000000'
            };
            await signAndSendTransaction(options, privateKey);
            this.setState({ success: true,recipient:'',value:'' });
            this.loadBalances()

        } catch (error) {
            console.log("error ? :( ")
            console.log(error.message);
            console.log(error)
            this.setState({ error: error.message });
        }

        this.setState({ loading: false });
    };


    render() {
        let privateKey;
        if(!this.state.privateKeyModal){
            privateKey = (
                <div className="card">
                    <label>Necesita especificar su clave privada antes de cambiar el string actual</label><br/>

                    <InputText onChange={event => this.setState({ privateKey: event.target.value })} className="ml-2 col-8"/>
                    <Button onClick={this.savePrivateKey} > Guardar</Button>
                </div>
            )
        }else{
            privateKey = (
                <div className="col-12">
                    <Button onClick={this.removeCurrentKey}>Eliminar llave privada actual</Button>
                </div>
            )
        }
        let alert = "";
        if(this.state.success){
            alert = (
                <div className="alert-primary">
                    Transaccion completada
                </div>
            )
        }
        return (
            <div className="p-grid list-demo">
                {alert}
                {privateKey}

                <div className="p-col-12">
                    <div className="card">
                        <h5>Cambiar String</h5>

                            <form onSubmit={this.onSubmit} >


                                    <label>Guardar texto</label>
                                    <InputText value={this.state.value} label="ether"  onChange={event => this.setState({ value: event.target.value })} />

                                    <label className="ml-5">Valor actual:</label>
                                        <span className="mr-5">{this.state.currentValue}</span>
                                      <Button onClick={this.onSubmit} >Enviar!</Button>

                            </form>
                    </div>
                </div>
            </div>
        );
    }

}


function decode(data) {
    return window.atob(data);
}
function encode(data) {
    return window.btoa(data);
}

export default GetSetText


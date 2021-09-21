import React, {useState, useEffect, Component, useRef} from 'react';
import Web3 from "web3";
import  DaiToken from "../abis/DaiToken.json"
import {Toast} from "primereact/toast";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign-contract";

import {signAndSendTransaction} from '../ethereum/helpers/index';
import {DataView} from "primereact/dataview";

class DirectAccount extends Component{



    constructor(props) {
        super(props);

        // this.address = this.props.match.params.address;

        this.state = {
            recipient: '',
            value: '',
            error: '',
            success: false,
            loading: false,
            privateKeyModal: true
            // toastRef: Toast(),
            // privateKeyModal: false
        };
        let privateKey = sessionStorage.getItem('pkencoded');
        console.log("cargando llave")
        if (!privateKey) {
            console.log(" llave no encontrada")

            this.state.privateKeyModal=false;
            return;
        } else {
            privateKey = decode(privateKey);
            console.log(" llave encontrada",privateKey)
        }

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
    success(){
        this.showText("Su transaccion se completo satisfactoriamente ","info" )
    }
    validateInput() {
        const value = this.state.value.match(/^[0-9.]+$/g);
        const recipient = this.state.recipient.match(/^0x[a-fA-F0-9]{40}$/g);

        return value && recipient;
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
        console.log("que bonito que bonito")
        this.setState({ success: false });

        if (!this.validateInput()) {
            this.setState({ error: 'Please enter correct data!' });
            return;
        }

        let privateKey = sessionStorage.getItem('pkencoded');

        if (!privateKey) {
            this.setState({ privateKeyModal: false });
            return;
        } else {
            privateKey = decode(privateKey);
        }
        // privateKey = '484e50a11c2fb47f14304e656ee1398711252ea60053d2f87cf67554f38ffff6';
        // let dai_address = '0x1C4A24AE203CE4424b79160490C758968f6f3e88'

        console.log('original','89a76bc75936a45459abb621c36bf21c5902e5eb93732d78faf4bc4eaf032ba9')
        console.log('guardado',privateKey)
        console.log()
        this.setState({ error: '', loading: true });

        let {value, recipient } = this.state;
        console.log(value,recipient);
        value = web3.utils.toWei(value, 'ether');

        const d=5777 //temporalmente el network id

        const _daiToken = DaiToken.networks[d];
        console.log("DAITOKEN ADDRESS",_daiToken.address)
        console.log("GANACHE ADDRESS",'0x8dC06Ca572cDeC33f0bc0c6c65BA8897B0E488a1')
        let daiToken = new web3.eth.Contract(
            DaiToken.abi,
            _daiToken.address,
            // '0x8dC06Ca572cDeC33f0bc0c6c65BA8897B0E488a1'
        );

        try {
            const makeRequest = await daiToken.methods.transfer(recipient, value);

            const options = {
                to: makeRequest._parent._address,
                // to: _daiToken.address,
                data: makeRequest.encodeABI(),
                gas: '1000000'
            };
            console.log("haciendolo ??")
            await signAndSendTransaction(options, privateKey);
            console.log(
                "Termino ???"

            )
            this.setState({ success: true,recipient:'',value:'' });


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
                    <label>Necesita especificar su clave privada antes de hacer una transaccion</label><br/>

                    <InputText onChange={event => this.setState({ privateKey: event.target.value })} className="ml-2 col-8"/>
                    <Button onClick={this.savePrivateKey} > Guardar</Button>
                </div>
            )
        }else{
            privateKey = (
                <Button onClick={this.removeCurrentKey}>Eliminar llave privada actual</Button>
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
                        <h5>Enviar Dai</h5>

                            <form onSubmit={this.onSubmit} >


                                    <label>Cantidad</label>
                                    <InputText value={this.state.value} label="ether" labelPosition="right" onChange={event => this.setState({ value: event.target.value })} />

                                    <label className="ml-5">Direccion</label>
                                    <InputText value={this.state.recipient} onChange={event => this.setState({ recipient: event.target.value })} className="ml-2 col-8" />
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

export default DirectAccount


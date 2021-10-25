var contract = artifacts.require("FNDNFT721");

var contract_address = '0xc9fe4Ffc4Be41d93A1a7189975cD360504Ee361A';

module.exports = function() {


  async function getTokenURI(number) {
    //   console.log(contract);
    let ins = await contract.at(contract_address);
    let res = ins.tokenURI(number).then(a=>process(a)).catch(b=>processE(b));
    res.then(a=>process(a));
    console.log('the uri is '+res.toString());
  }
  function process(A){
      console.log("PROCESS",A);
  }
  function processE(A){
    console.log("PROCESSEE",A);
}
  getTokenURI(94137);
}


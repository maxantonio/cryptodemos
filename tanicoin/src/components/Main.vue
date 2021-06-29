<template>
  <div class="div-transfer mt-5">
    <form @submit.prevent="onSubmit()">
      <div class="mb-3">
        <label for="sendAddress" class="form-label">Dirección</label>
        <input
          v-model="privateState.address"
          type="text"
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="sendAmount" class="form-label">Cantidad</label>
        <input
          v-model="privateState.amount"
          type="number"
          class="form-control"
        />
      </div>
      <button class="btn btn-primary px-5" type="submit">
        Enviar<i
          v-show="privateState.loadingBtn"
          class="fa fa-spinner fa-spin ms-2"
        ></i>
      </button>
    </form>
  </div>
</template>

<script>
import state from "./State.vue";
import Web3 from "web3";
import TaniCoin from "../abis/TaniCoin.json";

export default {
  name: "Main",
  props: {},
  data() {
    return {
      privateState: {
        address: "",
        amount: 0,
        loadingBtn: false,
      },
      sharedState: state,
    };
  },
  async beforeMount() {
    this.sharedState.loading = true;
    await this.loadWeb3();
    await this.loadData();
  },
  mounted() {},
  methods: {
    async loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    },
    async loadData() {
      const web3 = window.web3;

      const accounts = await web3.eth.getAccounts();
      this.sharedState.account = accounts[0];

      const networkId = await web3.eth.net.getId();

      const taniCoin = TaniCoin.networks[networkId];
      if (taniCoin) {
        this.sharedState.taniToken = new web3.eth.Contract(
          TaniCoin.abi,
          taniCoin.address
        );

        let taniBalance = await this.sharedState.taniToken.methods
          .balanceOf(this.sharedState.account)
          .call();
        let balance = window.web3.utils.fromWei(taniBalance, "Ether");
        this.sharedState.balance = balance;

        this.sharedState.loading = false;
      } else {
        window.alert("TaniCoin contract not deployed to detected network.");
      }
    },
    onSubmit() {
      if (
        this.privateState.address === "" ||
        this.privateState.amount === "" ||
        this.privateState.address <= 0
      ) {
        return;
      } else {
        this.privateState.loadingBtn = true;
        let amount = window.web3.utils.toWei(this.privateState.amount, "Ether");
        this.sharedState.taniToken.methods
          .approve(this.sharedState.account, amount)
          .send({ from: this.sharedState.account })
          .on("transactionHash", () => {
            this.sharedState.taniToken.methods
              .transferFrom(
                this.sharedState.account,
                this.privateState.address,
                amount
              )
              .send({ from: this.sharedState.account })
              .on("transactionHash", async () => {
                this.privateState.address = "";
                this.privateState.amount = 0;
                this.privateState.loadingBtn = false;
                await this.loadData();
              });
          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

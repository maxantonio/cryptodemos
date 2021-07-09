<template>
  <div class="preloader" v-show="this.sharedState.loading">
    <img class="spinner" src="./assets/img/logo.png" />
  </div>
  <header>
    <nav class="navbar sticky-top navbar-expand-lg navbar-light border-bottom">
      <div class="container">
        <a class="navbar-brand" href="">
          <img
            src="./assets/img/logo.png"
            alt=""
            width="30"
            height="30"
            class="d-inline-block align-text-top"
          />
          TaniCoin</a
        >
        <button
          class="navbar-toggler d-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        > -->
        <ul class="navbar-nav">
          <li class="nav-item">
            Balance: {{ this.sharedState.balance }}
          </li>
        </ul>
        <!-- </div> -->
      </div>
    </nav>
  </header>
  <main>
    <!-- <div class="container pt-5">
      <div class="row">
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-header">Tanicoin</div>
            <div class="card-body">
              <p class="mb-0">{{ this.sharedState.balance }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-header">Cuenta 1</div>
            <div class="card-body">
              <p class="mb-0">{{ this.sharedState.balanceAccount1 }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-header">Ganancias</div>
            <div class="card-body">
              <p class="mb-0">{{ this.sharedState.accounts }}</p>
            </div>
          </div>
        </div>
      </div> -->
    <!-- </div> -->

    <Main />
  </main>
</template>

<script>
require("./assets/css/bootstrap.min.css");
require("./assets/css/font-awesome.min.css");
require("./assets/css/app.css");
import Main from "./components/Main.vue";
import state from "./components/State.vue";

export default {
  name: "App",
  components: {
    Main,
  },
  data() {
    return {
      privateState: {},
      sharedState: state,
    };
  },
};
</script>
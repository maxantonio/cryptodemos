<script>
import { reactive } from "vue";

// reactive state
const state = reactive({
  account: '',
  loading: true,
  balance: 0,
  taniToken: {}
});

export default {
  state: state,
};
</script>
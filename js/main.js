var app = new Vue({
  el: "#app",
  data: {
    //データをAPIから格納
    bpi: null,
    hasError: false,
    loading: true,
  },
  mounted: function () {
    //axiosを利用してAPIの読み込み
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      //取得したデータの使用
      .then(
        function (response) {
          //responseにデータの中身が格納される
          this.bpi = response.data.bpi;
        }.bind(this)
      )
      //エラー表示
      .catch(
        function (error) {
          console.log(error);
          this.hasError = true;
        }.bind(this)
      )
      .finally(
        function () {
          this.loading = false;
        }.bind(this)
      );
  },
  //フィルター（小数点以下2桁）toFixed(2)で2桁までに変換
  filters: {
    currencyDecimal(value) {
      return value.toFixed(2);
    },
  },
});

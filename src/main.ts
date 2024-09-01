import { BacktestConfig, Decimal, runBacktest, Context } from "./wealth";

function onSetup(ctx: Context) {
  ctx.setBenchmark("BTCUSDT");
}

const config = new BacktestConfig().begin("2021-01-01").end("2021-01-05").balance(Decimal.fromString("1000"));
runBacktest(config, {
  onSetup
});

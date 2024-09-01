import { BacktestConfig, Decimal, runBacktest, Context } from "./wealth";

/** 设置 */
function onSetup(ctx: Context) {
  ctx.setBenchmark("BTCUSDT");
}
/** 初始化 */
function onInit(ctx: Context) {}
/** 每日开始 */
function onDayBegin(ctx: Context) {}
/** 每小时开始 */
function onHourBegin(ctx: Context) {}
/** 每分钟开始 */
function onMinuteBegin(ctx: Context) {}
/** Tick */
function onTick(ctx: Context) {}
/** 每分钟结束 */
function onMinuteEnd(ctx: Context) {
  const tradeTime = ctx.tradeTime();
  const candle = ctx.lastCandle("BTCUSDT");
  if (!candle) return;
  ctx.info(`时间(${tradeTime.toLocaleString()}), 收盘价(${candle.close.toString()})`);
}
/** 每小时结束 */
function onHourEnd(ctx: Context) {}
/** 每日结束 */
function onDayEnd(ctx: Context) {
  // ctx.debug("每日结束");
}
/** 策略停止 */
function onStop(ctx: Context) {
  // ctx.debug("策略停止");
}

const config = new BacktestConfig().begin("2021-01-01").end("2021-02-01").balance(Decimal.fromString("1000"));
runBacktest(config, {
  onSetup,
  onInit,
  onDayBegin,
  onHourBegin,
  onMinuteBegin,
  onTick,
  onMinuteEnd,
  onHourEnd,
  onDayEnd,
  onStop
});

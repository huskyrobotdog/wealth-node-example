import { BacktestConfig, Decimal, runBacktest, Context } from "./wealth";
import moment from "moment";

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
  if (1 == 1) return;
  // K线
  const candle = ctx.lastCandle("BTCUSDT");
  if (!candle) return;
  // 指数价
  const indexPrice = ctx.indexPrice("BTCUSDT");
  if (!indexPrice) return;
  // 标记价
  const markPrice = ctx.markPrice("BTCUSDT");
  if (!markPrice) return;
  // 资金费率
  const fundingRate = ctx.fundingRate("BTCUSDT");
  if (!fundingRate) return;

  const tradeTime = ctx.tradeTime();
  const tradeTimeStr = moment(tradeTime).format("YYYY-MM-DD HH:mm:ss");
  ctx.info(
    `时间(${tradeTimeStr}), 收盘价(${candle.close.toString()}), 指数价(${indexPrice.toString()}), 标记价(${markPrice.toString()}), 资金费率(${fundingRate.toString()})`
  );
}
/** 每小时结束 */
function onHourEnd(ctx: Context) {}
/** 每日结束 */
function onDayEnd(ctx: Context) {
  const account = ctx.account();
  ctx.info(
    `账户: 余额(${account.balance.toString()}), 可用余额(${account.available.toString()}), 未实现盈亏(${account.upl.toString()})`
  );
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

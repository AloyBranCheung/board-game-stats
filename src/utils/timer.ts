/* eslint-disable @typescript-eslint/ban-types */
class Timer {
  private timerId: NodeJS.Timeout | undefined;
  private fnToTimeout: Function;

  constructor(fnToTimeout: Function) {
    this.fnToTimeout = fnToTimeout;
  }

  public timeoutFn = (seconds: number) => {
    const timer = setTimeout(() => {
      this.fnToTimeout();
    }, seconds * 1000);
    this.timerId = timer;
  };

  public clearTimer = () => {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  };
}

export default Timer;

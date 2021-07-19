import websocket, json, numpy
from matplotlib import pyplot as plt


def RSI (closes, period):
    avg_gain = 0
    avg_loss = 0
    prv_gain = 0
    prv_loss = 0
    index = 1
    rsi = []

    for index in range(1, len(closes) - period + 1):

        for price in range(index, period + index):

            dif = closes[price] - closes[price-1]

            if dif > 0:
                avg_gain += dif
            elif dif < 0:
                dif = dif*-1
                avg_loss += dif
        
        if index == 1:
            rs = (avg_gain/period) / (avg_loss/period)
            prv_gain = avg_gain
            prv_loss = avg_loss
        else:
            rs = (prv_gain*(period-1) + avg_gain) / (prv_loss*(period-1) + avg_loss)
            prv_gain = avg_gain
            prv_loss = avg_loss

        rsi.append( float( 100 - ( 100/(1 + rs))))

    return rsi

def on_open(ws):
    print("Opened connection")

def on_close(ws):
    print("Closed connection")

def on_error(ws, err):
    print("\nError", err)

def on_message(ws, json_message):
    global plot_timestamp
    global first_timestamp

    data = json.loads(json_message)

    candle_data = data['k']

    candle_closed = candle_data['x']
    close_price = candle_data['c']
    timestamp = candle_data['t']

    if candle_closed:

        if first_timestamp == 0:
            first_timestamp = int(candle_data['t'])

        closes.append( float( close_price))
        
        if len(closes) > rsi_period:
            
            plot_rsi = RSI(closes, rsi_period)

            for i in range(0, rsi_period):
                plot_rsi.insert(0, 0)

            plot_timestamp.append( int( (timestamp - first_timestamp)/60000))
            plot_closing_prices.append( float( close_price))

            with open("plot.txt", "r") as txt_file:
                txt = txt_file.read()

            plot = txt
            if plot == "True":
                plt.clf()

                plt.subplot(2,1,1)
                plt.grid(color='grey', linestyle='-', linewidth=0.5)
                plt.plot(plot_timestamp, plot_closing_prices, color="black", label="Price")
                plt.legend()

                plt.subplot(2,1,2)
                plt.grid(color='grey', linestyle='-', linewidth=0.5)
                plt.plot(plot_timestamp, plot_rsi, alpha=0)
                plt.plot(plot_timestamp[rsi_period:], plot_rsi[rsi_period:], color="blue", label="RSI")
                plt.legend()

                # plt.get_current_fig_manager().window.state("zoomed")
                plt.show(block=False)
                plt.pause(1)
            
            print("RSI plot length:", len(plot_rsi))

            with open("alt_public/html/rsi_results.txt", "w") as txt_file:
                txt_file.writelines(["Closes:\n", str(closes), "\nRSI:\n", str(plot_rsi), "\nTimestamps:\n", str(plot_timestamp)])
        
        else:
            print("Closeslen:", len(closes), " Remaining:", rsi_period - len(closes))
            plot_closing_prices.append( float( close_price))
            plot_timestamp.append( int( (timestamp - first_timestamp)/60000))


if __name__ == "__main__":

    socket = "wss://stream.binance.com:9443/ws/solusdt@kline_1m"
    closes = []
    # closes = [26.961, 26.954, 26.961, 26.958, 26.969, 26.958, 26.958, 26.963, 26.982, 26.975, 26.968, 26.945, 26.94, 26.949, 26.945]
    # closes = [432.73,432.8,432.73,432.7,432.86,432.19,432.2,432.16,432.11,432.31,432.28,432.93,432.64,432.57,432.75]

    rsi_period = 14 # 14

    plot_timestamp = []
    plot_closing_prices = []

    first_timestamp = 0

    # websocket.enableTrace(True)
    ws = websocket.WebSocketApp(socket, on_open=on_open, on_message=on_message, on_error=on_error, on_close=on_close)
    ws.run_forever()
    # print(RSI([27.382, 27.359, 27.383, 27.42, 27.337, 27.32], 5))
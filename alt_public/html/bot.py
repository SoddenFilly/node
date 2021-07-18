import websocket, json, numpy
from pprint import pprint
from matplotlib import pyplot as plt

socket = "wss://stream.binance.com:9443/ws/solusdt@kline_1m"
closes = []
# closes = [26.961, 26.954, 26.961, 26.958, 26.969, 26.958, 26.958, 26.963, 26.982, 26.975, 26.968, 26.945, 26.94, 26.949, 26.945]
# closes = [432.73, 432.8, 432.73, 432.7, 432.86, 432.19, 432.2, 432.16, 432.11, 432.31, 432.28, 432.93, 432.64, 432.57, 432.75]
closes_up = []
closes_down = []

def RSI (closes, period):
    # closes = [26.961, 26.954, 26.961, 26.958, 26.969, 26.958, 26.958, 26.963, 26.982, 26.975, 26.968, 26.945, 26.94, 26.949, 26.945]
    closes_up = 0
    closes_down = 0

    for i in range(1, period+1):

        dif = closes[i] - closes[i-1]

        if dif >= 0:
            closes_up += dif
        elif dif < 0:
            dif = dif - dif*2
            closes_down += dif

    rsi = 100 - (100/(1+(closes_up/period)/(closes_down/period)))

    # print("rsi", rsi)
    return rsi

# for i in range(1, len(closes)):
#     dif = closes[i] - closes[i-1]
#     if dif >= 0:
#         closes_up.append(dif)
#     elif dif < 0:
#         dif = dif - dif*2
#         closes_down.append(dif)
# closes_up = sum(closes_up)/14
# closes_down = sum(closes_down)/14
# rs = closes_up/closes_down
# rsi = 100 - (100/(1+rs))
# print(rsi)
# plt.subplot(2,1,1)
# plt.subplot(2,1,2)
# plt.show()

rsi_period = 14 # 14
rsi_overbought = 70
rsi_oversold = 30
plot_rsi = []
plot_timestamp = []
plot_closing_prices = []

first_timestamp = 0
first_timest = 0

rsi = {
    "rsi_period" : 14,
    "rsi_overbought" : 70,
    "rsi_oversold" : 30,
}

symbol = "solusdt"
trade_quantity = 17

def on_open(ws):
    print("opened connection")
  
def on_close(ws):
    print("closed connection")

def on_error(ws, error):
    print("\nerror", error)

def on_message(ws, message):
    global plot_rsi
    global plot_timestamp
    global first_timest
    global first_timestamp

    # print("received message")
    json_message = json.loads(message)
    # pprint(json_message)

    candle = json_message['k']

    candle_closed = candle['x']
    close_price = candle['c']
    timestamp = candle['t']

    if first_timestamp == 0:
        first_timestamp = int(candle['t'])
    

    if candle_closed:
        closes.append(float(close_price))
        if len(closes) > rsi_period + 1:
            closes.pop(0)

        # print("closelen",len(closes))
        
        if len(closes) > rsi_period:
            # print("aah2",len(closes))
            # print("1", rsi_list)
            # print("APP")
            
            plot_rsi.append( float(RSI(closes, rsi_period)) )
            plot_timestamp.append((timestamp - first_timestamp)/60000)
            # print((timestamp - first_timestamp)/60000)
            plot_closing_prices.append(float(close_price))
            # print(plot_closing_prices)

            with open("plot.txt", "r") as txt_file:
                txt = txt_file.read()
                # print(txt)

            plot = txt
            if plot == "True":
                plt.clf()
                plt.subplot(2,1,1)
                plt.plot(plot_timestamp, plot_closing_prices, color="black", label="Price")
                plt.subplot(2,1,2)
                plt.plot(plot_timestamp, plot_rsi, color="blue", label="RSI")
                plt.legend()
                # plt.plot(plot_timestamp, close_price)
                # plt.get_current_fig_manager().window.state("zoomed")
                plt.show(block=False)
                plt.pause(.1)
            
            print("RSI plot length:", len(plot_rsi))
        
        else:
            print("Closeslen:", len(closes), " Remaining:", rsi_period - len(closes))

if __name__ == "__main__":
    # websocket.enableTrace(True)
    ws = websocket.WebSocketApp(socket, on_open=on_open, on_message=on_message, on_error=on_error, on_close=on_close)

    ws.run_forever()

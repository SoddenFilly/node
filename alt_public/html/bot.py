import websocket, json, numpy
from pprint import pprint

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

    print("rsi", rsi)
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

rsi_period = 5 # 14
rsi_overbought = 70
rsi_oversold = 30
rsi_list = []
rsi_x = []
incre = 0

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
    # print("received message")
    json_message = json.loads(message)
    # pprint(json_message)

    candle = json_message['k']

    candle_closed = candle['x']
    close_price = candle['c']

    closes.append(float(close_price))
    if len(closes) > rsi_period + 1:
        closes.pop(0)

    print("closelen",len(closes))
    
    if len(closes) > rsi_period:
        # print("aah2",len(closes))
        print("1", rsi_list)
        app = RSI(closes, rsi_period)
        rsi_list.append( app )
        rsi_x.append(incre)
        incre += 1
        print("2", rsi_list)

    print("closes", closes)

if __name__ == "__main__":
    # websocket.enableTrace(True)
    ws = websocket.WebSocketApp(socket, on_open=on_open, on_message=on_message, on_error=on_error, on_close=on_close)

    ws.run_forever()

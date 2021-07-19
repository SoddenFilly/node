def RSI_explained (closes, period):

    closes_up = 0
    closes_down = 0

    print("\nBase dataset =", closes)
    print()
    print("Change from one consecutive value to the next for each value")

    for i in range(1, period+1):

        dif = closes[i] - closes[i-1]
        

        if dif > 0:
            print(closes[i], "-", closes[i-1], "=", dif)
            closes_up += dif
        elif dif < 0:
            print(closes[i], "-", closes[i-1], "=", dif)
            dif = dif*-1
            closes_down += dif

    rs = (closes_up/period) / (closes_down/period)

    print()
    print("sum of all positive values / period = average gain")
    print(closes_up, "/", period, "=", closes_up/period)
    print()
    print("absolute sum of all negative values / period = average loss")
    print(closes_down, "/", period, "=", closes_down/period)

    print()
    print("average gain / average loss = relative strength")
    print(closes_up/period, "/", closes_down/period, "=", (closes_up/period) / (closes_down/period))

    rsi = 100 - ( 100/(1 + rs) )

    print()
    print("100 - (100 / (relative strength + 1)) = relative strength index (RSI)")
    print("100 - (100 / (", rs, " + 1)) =", rsi)

    return rsi

def RSI (closes, period):
    avg_gain = 0
    avg_loss = 0
    prv_gain = 0
    prv_loss = 0
    index = 1
    rsi = []

    for index in range(1, len(closes) - period + 1):
        print(index)

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

def RSI_binance (closes, period):
    rsi = []

    for index in range(0, len(closes)):
        rsi.append(float( 100 - ( 100/( 1+closes[index] ))))
    
    return rsi

dataset = [ 1,2,4,4,2,9,5,7,2,9,4,1,5,3, 6,5,50,48,61,1,1 ]
dataset = [25.987, 25.964, 25.982, 25.965, 26.059, 26.058, 26.117, 26.096, 26.064, 26.113, 26.129, 26.125, 26.098, 26.04, 26.034, 25.979, 26.019, 25.958, 25.968, 25.96, 25.981, 26.028, 26.006, 26.033, 25.971, 26.05, 26.117]
period = 14

print(RSI_binance(dataset, period))



def RMA(source, period): # Rolling Moving Average
    alpha = 1/period
    summ = 0.0
    rma = []
    for i in range(0, len(source)):
        rma.append(alpha * source[i] + (1 - alpha) * 0.0)
    return rma

def SMA(arr, period): # Simple Moving Average
    pass

def RSI(closes, period): # Relative Strength Index
    upwards_change = []
    downwards_change = []
    for i in range(1, len(closes)):
        upwards_change.append(max(closes[i] - closes[i-1], 0))
        downwards_change.append(max(closes[i-1] - closes[i], 0))
    
    # rs = RMA(upwards_change, period) / RMA(downwards_change, period)
    rs = []
    upch = RMA(upwards_change, period)
    doch = RMA(downwards_change, period)
    print(upch)
    print(doch)
    for i in range(0, len(upch)):
        try:
            rs.append(upch[i] / doch[i])
        except ZeroDivisionError as err:
            rs.append(0)

    print(rs)

    rsi = []
    for i in range(0, len(rs)):
        rsi.append(100 - 100 / (1 + rs[i]))

    # rsi = 100 - 100 / (1 + rs)

    # print(upwards_change)
    # print(downwards_change)

    return rsi


closes = [4,5,2,8,4,6,1,3,2,7,5,4,2,3, 4]
print("RSI:", RSI(closes, 14))
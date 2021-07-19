from matplotlib import pyplot as plt

plt.subplot(2,1,1)
plt.plot([14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26][2:], [26.034, 25.979, 26.019, 25.958, 25.968, 25.96, 25.981, 26.028, 26.006, 26.033, 25.971, 26.05, 26.117][2:], color="black", label="Price")
plt.legend()
plt.subplot(2,1,2)
# plt.plot([1,2,3,4,5], [10,30,70,40,50], color="black", label="Price", alpha=0)
# plt.plot([3,4,5], [70,40,50], color="black", label="Price")
# plt.grid(color='r', linestyle='-', linewidth=2)
# plt.plot(plot_timestamp, plot_rsi, color="blue", label="RSI")
# plt.legend()
plt.show()
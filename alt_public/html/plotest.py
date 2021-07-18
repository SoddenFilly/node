from matplotlib import pyplot as plt

plt.subplot(2,1,1)
plt.plot([1,2,3,4,5], [10,30,70,40,50], color="black", label="Price")
plt.legend()
plt.subplot(2,1,2)
plt.plot([1,2,3,4,5], [10,30,70,40,50], color="black", label="Price", alpha=0)
plt.plot([3,4,5], [70,40,50], color="black", label="Price")
# plt.grid(color='r', linestyle='-', linewidth=2)
# plt.plot(plot_timestamp, plot_rsi, color="blue", label="RSI")
# plt.legend()
plt.show()
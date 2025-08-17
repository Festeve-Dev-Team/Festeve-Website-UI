import usePrice from '@framework/product/use-price';

const WalletCard = ({ title, amount, currency }: { title: string; amount: number; currency: string }) => {
  const { price } = usePrice({
    amount: amount,
    currencyCode: currency,
  });
  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h3 className="mb-3 text-lg font-semibold text-heading">{title}</h3>
      <div className="text-2xl font-bold text-accent">{price}</div>
    </div>
  );
};

const WalletDetails: React.FC<{ className?: string }> = ({
  className = 'pt-10 lg:pt-12',
}) => {

  const walletData = {
    cash: 1000.00,
    coins: 500.00
  };

  return (
    <div className={className}>
      <h2 className="mb-6 text-lg font-bold md:text-xl xl:text-2xl text-heading xl:mb-8">
        Wallet Balance
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <WalletCard 
          title={"Cash"}
          amount={walletData.cash}
          currency="INR"
        />
        <WalletCard 
          title={"Coin's"}
          amount={walletData.coins}
          currency="INR"
        />
      </div>
    </div>
  );
};

export default WalletDetails;
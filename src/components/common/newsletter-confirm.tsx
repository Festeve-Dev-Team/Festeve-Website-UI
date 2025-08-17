import { useUI } from '@contexts/ui.context';
import Button from '@components/ui/button';
import { useTranslation } from 'next-i18next';

interface NewsletterConfirmProps {
  onConfirm: () => void;
  email: string;
}

const NewsletterConfirm: React.FC<NewsletterConfirmProps> = ({ onConfirm, email }) => {
  const { t } = useTranslation();
  const { closeModal } = useUI();

  return (
    <div className="py-6 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px">
      <div className="text-center mb-6 pt-2.5">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-heading">
          {t('common:text-subscribe-heading')}
        </h2>
        <p className="text-sm md:text-base text-body mt-2">
          {t('common:text-subscribe-confirm')} <br />
          <span className="font-bold">{email}</span>
        </p>
      </div>
      <div className="flex items-center justify-between space-x-3 rtl:space-x-reverse">
        <Button
          variant="smoke"
          className="w-full"
          onClick={closeModal}
        >
          {t('common:button-cancel')}
        </Button>
        <Button
          variant="flat"
          className="w-full"
          onClick={() => {
            onConfirm();
          }}
        >
          {t('common:button-confirm')}
        </Button>
      </div>
    </div>
  );
}

export default NewsletterConfirm;

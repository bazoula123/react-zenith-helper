import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

export const ErrorPage = ({ error }: { error?: Error }) => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-lg w-full mx-4 text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold text-[#700100]">Oops !</h1>
          <p className="text-lg text-gray-800">
            {t('errors.unexpectedError')}
          </p>
          <p className="text-gray-600">
            {error?.message || t('errors.unexpectedError')}
          </p>
          <div className="pt-4">
            <p className="text-sm text-gray-500">
              {t('errors.contactTech')}
            </p>
            <a 
              href="tel:+21629249512" 
              className="text-lg font-semibold text-[#700100] hover:underline"
            >
              +216 29 249 512
            </a>
          </div>
        </div>
        <Button 
          onClick={() => window.location.reload()} 
          className="bg-[#700100] hover:bg-[#8B0000] text-white font-semibold py-2 px-6 rounded-md"
        >
          {t('errors.refreshPage')}
        </Button>
      </div>
    </div>
  );
};
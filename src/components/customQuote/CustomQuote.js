import { apiConfig, fetchFromAPI } from '@/config/api';
import CustomQuoteClient from './CustomQuoteClient';

const CustomQuote = async () => {
  let formOptions = {
    services: [],
    propertyType: [],
    preferredContactMethod: [],
    budgetRange: [],
  };
  let error = null;

  try {
    const data = await fetchFromAPI(apiConfig.endpoints.customQuoteForm, {
      cache: 'no-store',
    });
    formOptions = {
      services: data.data?.services || [],
      propertyType: data.data?.propertyType || [],
      preferredContactMethod: data.data?.preferredContactMethod || [],
      budgetRange: data.data?.budgetRange || [],
    };
  } catch (err) {
    error = err.message || 'Failed to load quote form. Please try again later.';
  }

  return <CustomQuoteClient formOptions={formOptions} error={error} />;
};

export default CustomQuote;

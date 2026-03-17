import { apiConfig, fetchFromAPI } from '@/config/api';
import ContactFormClient from './ContactFormClient';

const ContactForm = async () => {
  let services = [];
  let propertyTypes = [];
  let locations = [];
  let error = null;

  try {
    const [formData, locationsData] = await Promise.all([
      fetchFromAPI(apiConfig.endpoints.contactForm, { cache: 'no-store' }),
      fetchFromAPI(apiConfig.endpoints.locations, { cache: 'no-store' }),
    ]);

    services = formData.data?.services || [];
    propertyTypes = formData.data?.propertyType || [];

    if (Array.isArray(locationsData.data)) {
      locations = locationsData.data;
    }
    
  } catch (err) {
    error = err.message || 'Failed to load contact form data. Please try again later.';
    services = [];
    propertyTypes = [];
    locations = [];
  }

  return (
    <ContactFormClient
      services={services}
      propertyTypes={propertyTypes}
      locations={locations}
      error={error}
    />
  );
};

export default ContactForm;

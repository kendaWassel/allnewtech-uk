'use client';

import { useState, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { apiConfig, postToAPI } from '@/config/api';

function useIsLargeScreen() {
  const subscribe = (callback) => {
    const mq = window.matchMedia('(min-width: 1024px)');
    mq.addEventListener('change', callback);
    return () => mq.removeEventListener('change', callback);
  };
  const getSnapshot = () => window.matchMedia('(min-width: 1024px)').matches;
  const getServerSnapshot = () => false;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const ContactMapDesktop = dynamic(() => import('./ContactMapDesktop'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[400px] bg-[var(--white)] animate-pulse flex items-center justify-center">
      <span className="text-gray-500 text-sm">Loading map…</span>
    </div>
  ),
});

const ContactMapMobile = dynamic(() => import('./ContactMapMobile'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[200px] bg-[var(--white)] animate-pulse flex items-center justify-center">
      <span className="text-gray-500 text-sm">Loading map…</span>
    </div>
  ),
}); 

const validateContactForm = (formData) => {
  if (!formData.firstName.trim()) return 'First name is required.';
  if (!formData.lastName.trim()) return 'Last name is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email address.';
  if (!/^\+?[\d\s()\-]{7,15}$/.test(formData.phone.trim())) return 'Please enter a valid phone number.';
  if (!formData.serviceInterest) return 'Please select a service.';
  if (!formData.propertyType) return 'Please select a property type.';
  return '';
};


const ContactFormFields = ({
  formData,
  services,
  propertyTypes,
  handleChange,
  handlePhoneKeyDown,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit} className="mx-auto lg:px-0 px-[2.25rem]">
    <h1 className="font-bold text-2xl lg:text-[2rem] mb-[1.5rem] lg:mb-[2.5rem] text-center">
      Contact Us
    </h1>
    <div className="flex mb-[1.5rem] gap-[1.25rem] md:gap-[2rem]">
      <div className="flex-1 bg-[#F3F3F3] shadow-[0px_2px_6px_#00000021] px-[1rem] py-[0.75rem]">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full placeholder:text-black border-none outline-none text-xs md:text-base"
          required
        />
      </div>
      <div className="flex-1 bg-[#F3F3F3] shadow-[0px_2px_6px_#00000021] px-[1rem] py-[0.75rem]">
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full placeholder:text-black border-none outline-none text-xs md:text-base"
          required
        />
      </div>
    </div>
    <div className="bg-[#F3F3F3] shadow-[0px_2px_6px_#00000021] px-[1rem] py-[0.75rem] mb-[1.5rem]">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full placeholder:text-black border-none outline-none text-xs md:text-base"
        required
      />
    </div>
    <div className="bg-[#F3F3F3] shadow-[0px_2px_6px_#00000021] px-[1rem] py-[0.75rem] mb-[1.5rem]">
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        onKeyDown={handlePhoneKeyDown}
        className="w-full placeholder:text-black border-none outline-none text-xs md:text-base"
        required
      />
    </div>
    <div className="flex mb-[1.5rem] gap-[1.25rem] md:gap-[2rem]">
      <div className="flex-1 bg-[#F3F3F3] shadow-[0px_2px_6px_#00000021] px-[1rem] py-[0.75rem]">
        <select
          name="serviceInterest"
          value={formData.serviceInterest}
          onChange={handleChange}
          className="w-full placeholder:text-black border-none outline-none text-xs md:text-base appearance-none cursor-pointer"
          required
          style={{
            backgroundColor: 'transparent',
          }}
        >
          <option value="" >Service Interest</option>
          {services.map((service) => (
            <option 
              key={service.id} 
              value={service.id}
              
            >
              {service.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 bg-[#F3F3F3] shadow-[0px_2px_6px_#00000021] px-[1rem] py-[0.75rem]">
        <select
          name="propertyType"
          value={formData.propertyType}
          onChange={handleChange}
          className="w-full placeholder:text-black border-none outline-none text-xs md:text-base appearance-none cursor-pointer"
          required
          style={{
            backgroundColor: 'transparent',
          }}
        >
          <option value="" >Property Type</option>
          {propertyTypes.map((type) => (
            <option 
              key={type.id} 
              value={type.id}
              
            >
              {type.name}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div className="bg-[#F3F3F3] shadow-[0px_2px_6px_#00000021] px-[1rem] py-[0.75rem] mb-[1.5rem]">
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        rows={4}
        className="w-full placeholder:text-black border-none outline-none resize-none min-h-[160px]"
      />
    </div>
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-[var(--primary-blue-first)] text-white font-bold py-3 px-6 hover:bg-[var(--primary-blue-second)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isSubmitting ? 'Sending...' : 'Submit'}
    </button>
  </form>
);

const ImageBlock = () => (
  <div className="relative w-full h-full">
      <Image
        src="/contact/contact.svg"
        alt="Contact us"
        width={200}
        height={200}
        priority
        sizes="50vw"
        className="w-full h-full object-cover"
      />
  </div>
);

const MapBlock = ({ locations = [] ,isLargeScreen}) => {
    const [active, setActive] = useState(false);
  const ActiveMap = isLargeScreen ? ContactMapDesktop : ContactMapMobile;
  return(
  <div
      className="relative w-full h-full lg:min-h-[400px] min-h-[200px]"
      onMouseLeave={() => setActive(false)}
    >
      <ActiveMap locations={locations} />
      {!active && (
        <div
          className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center"
          onClick={() => setActive(true)}
          onTouchStart={() => setActive(true)}
        >
          <span className="bg-black/50 text-white text-sm px-4 py-2 rounded-full pointer-events-none">
            Tap to interact with map
          </span>
        </div>
      )}
    </div>
  )
}
  

const ContactFormClient = ({ services = [], propertyTypes = [], locations = [], error = null }) => {
  const isLargeScreen = useIsLargeScreen();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceInterest: '',
    propertyType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlePhoneKeyDown = (e) => {
    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', '+', '(', ')', '-', ' '];
    if (!allowed.includes(e.key) && !/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    const validationError = validateContactForm(formData);
  if (validationError) {
    setSubmitError(validationError);
    return;
  }

    setIsSubmitting(true);

    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        property_type_id: Number(formData.propertyType),
        service_id: Number(formData.serviceInterest),
        message: formData.message,
      };
      const data = await postToAPI(apiConfig.endpoints.contactSubmit, payload);

      setSubmitSuccess(data.msg || 'Your message has been sent successfully.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        serviceInterest: '',
        propertyType: '',
        message: '',
      });
    } catch (error) {
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (services.length === 0 || propertyTypes.length === 0) {
    const message = error
      ? 'Unable to load contact form right now. Please try again later.'
      : 'Form data is not available at the moment. Please check back soon!';

    return (
      <section className="lg:py-[6rem] pb-[3.75rem] xl:px-[15rem] lg:px-[7rem]">
        {/* desktop: image | message, then full-width map */}
        <div className="hidden lg:flex gap-[3rem] mb-[3rem]">
          <div className="w-1/2">
            <ImageBlock />
          </div>
          <div className="w-1/2 flex items-center justify-center min-h-[400px]">
            <p className="text-center lg:text-xl md:text-lg text-base text-gray-600">
              {message}
            </p>
          </div>
        </div>
        <div className="hidden lg:block w-full">{isLargeScreen && <MapBlock locations={locations} isLargeScreen={isLargeScreen} />}</div>

        {/* mobile: image | map, then message */}
        <div className="lg:hidden flex flex-col gap-[3rem]">
          <div className="flex">
            <div className="w-1/2">
              <ImageBlock/>
            </div>
            <div className="w-1/2">
            {!isLargeScreen && <MapBlock locations={locations} isLargeScreen={isLargeScreen} />}
            </div>
          </div>
          <div className="w-full flex items-center justify-center px-[2.25rem]">
            <p className="text-center text-base text-gray-600">
              {message}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const feedback = (
    <>
      {submitError && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-xs md:text-base text-red-700 lg:text-left text-center">
          <p className="font-semibold mb-1">We couldnt send your message</p>
          <p>{submitError}</p>
        </div>
      )}
      {submitSuccess && (
        <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs md:text-base text-emerald-800 lg:text-left text-center">
          <p className="font-semibold mb-1">Thank you for getting in touch</p>
          <p>{submitSuccess}</p>
        </div>
      )}
    </>
  );

  return (
    <section className="lg:py-[6rem] pb-[3.75rem] xl:px-[15rem] lg:px-[7rem]">
      {/* desktop: image | form, then full-width map */}
      <div className="hidden lg:flex gap-[3rem] mb-[3rem]">
        <div className="w-1/2">
          <ImageBlock/>
        </div>
        <div className="w-1/2 lg:px-0 px-[2.25rem]">
          <ContactFormFields
            formData={formData}
            services={services}
            propertyTypes={propertyTypes}
            handleChange={handleChange}
            handlePhoneKeyDown={handlePhoneKeyDown}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
          {feedback}
        </div>
      </div>
      <div className="hidden lg:block w-full">
        {isLargeScreen && <MapBlock locations={locations} isLargeScreen={isLargeScreen} />}
        </div>

      {/* mobile: image | map, then form */}
      <div className="lg:hidden flex flex-col gap-[3rem]">
        <div className="flex">
          <div className="w-1/2">
            <ImageBlock/>
          </div>
          <div className="w-1/2">
          {!isLargeScreen && <MapBlock locations={locations} isLargeScreen={isLargeScreen} />}</div>
        </div>
        <div className="w-full">
          <ContactFormFields
            formData={formData}
            services={services}
            propertyTypes={propertyTypes}
            handleChange={handleChange}
            handlePhoneKeyDown={handlePhoneKeyDown}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
          {feedback}
        </div>
      </div>
    </section>
  );
};

export default ContactFormClient;

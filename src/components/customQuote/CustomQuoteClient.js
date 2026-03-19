'use client';
import { useState,useRef,useEffect } from 'react';
import { apiConfig, postToAPI } from '@/config/api';
import contact from '@/content/contact.json';

const quoteRequest = contact.quoteRequest;
const fields = quoteRequest.fields;
const contactInfo = fields.contactInfo;
const siteDetails = fields.siteDetails;
const additional = fields.additional;
const services = fields.services;
const consent = fields.consent;
const submit = fields.submit;

const firstName = contactInfo.fields.find((field) => field.name === 'firstName')?.label;
const lastName = contactInfo.fields.find((field) => field.name === 'lastName')?.label;
const email = contactInfo.fields.find((field) => field.name === 'email')?.label;
const phone = contactInfo.fields.find((field) => field.name === 'phone')?.label;
const postCode = siteDetails.fields.find((field) => field.name === 'postcode')?.label;
const propertyType =
  siteDetails.fields.find((field) => field.name === 'propertyType')?.label;
const requirements =
  additional.fields.find((field) => field.name === 'message')?.placeholder;
const preferredContact =
  additional.fields.find((field) => field.name === 'preferredContact')?.label;
const budgetRange =
  additional.fields.find((field) => field.name === 'budgetRange')?.label;
const fileUpload =
  additional.fields.find((field) => field.name === 'fileUpload')?.label;

const validateQuoteForm = (formData) => {
  const errors = {};

  if (!formData.firstName.trim()) errors.firstName = 'First name is required.';
  if (!formData.lastName.trim()) errors.lastName = 'Last name is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    errors.email = 'Please enter a valid email address.';
  if (!/^\+?[\d\s()\-]{7,15}$/.test(formData.phone.trim()))
    errors.phone = 'Please enter a valid phone number.';
  if (!formData.propertyTypeId) errors.propertyTypeId = 'Please select a property type.';
  if (!formData.postCode.trim()) errors.postCode = 'Post code is required.';
  if (formData.serviceIds.length === 0)
    errors.serviceIds = 'Please select at least one service.';
  // The rest of the fields are optional – don't block submission on them

  return errors;
};
const CustomSelect = ({ placeholder, options, value, onChange, error, smallText = false }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);
 
  const selectedLabel = options.find((o) => String(o.id) === String(value))?.name || '';
 
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`cursor-pointer w-full bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[0.5rem] py-[0.35rem] md:px-[1rem] md:py-[0.75rem] ${smallText ? 'text-[0.6rem] md:text-base' : 'text-xs md:text-base'} text-left flex items-center justify-between ${
          error ? 'border border-red-500' : ''
        }`}
      >
        <span>{selectedLabel || placeholder}</span>
      </button>
 
      {open && (
        <div className="absolute rounded-[4px] md:rounded-[12px] z-20 mt-1 w-full border border-gray-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-1 space-y-[0.2rem]">
{options.map((option) => {
  const isSelected = String(option.id) === String(value);
  return (
    <label
      key={option.id}
      className={`block text-xs md:text-sm cursor-pointer px-3 py-2 transition-colors ${
        isSelected ? 'bg-[var(--secondary)] text-white' : 'hover:bg-[var(--secondary)] hover:text-white rounded-[4px] md:rounded-[12px]'
      }`}
    >
      <input
        type="radio"
        checked={isSelected}
        onChange={() => {
          onChange(String(option.id));
          setOpen(false);
        }}
        className="hidden"
      />
      {option.name}
    </label>
  );
})}
        </div>
      )}
    </div>
  );
};
const EmptyState = ({ message }) => (
  <section className="lg:py-[6rem] pb-[3.75rem] xl:px-[15rem] lg:px-[7rem]">
    <div className="flex gap-[3rem] mb-[3rem]">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-center lg:text-xl md:text-lg text-base text-gray-600 px-4">{message}</p>
        </div>
      </div>
  </section>
);

const CustomQuoteClient = ({
  formOptions = {
    services: [],
    propertyType: [],
    preferredContactMethod: [],
    budgetRange: [],
  },
  error = null,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    postCode: '',
    propertyTypeId: '',
    serviceIds: [],
    requirements: '',
    preferredContactMethodId: '',
    budgetRangeId: '',
    file: null,
    confirmation: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setFieldErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };
const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
  };
  const handleServiceToggle = (serviceId) => {
    setFormData((prev) => {
      const current = new Set(prev.serviceIds);
      if (current.has(serviceId)) {
        current.delete(serviceId);
      } else {
        current.add(serviceId);
      }
      return { ...prev, serviceIds: Array.from(current) };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      file,
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

  if (!formData.confirmation) {
    setFieldErrors((prev) => ({
      ...prev,
      confirmation: 'Please confirm the consent checkbox.',
    }));
    setSubmitError('Please confirm the consent checkbox to continue.');
    return;
  }

  const errors = validateQuoteForm(formData);
  if (Object.keys(errors).length > 0) {
    setFieldErrors(errors);
    setSubmitError('Please fix the highlighted fields and try again.');
    return;
  }

  setFieldErrors({});

  setIsSubmitting(true);

  try {
    const payload = new FormData();
    payload.append('first_name', formData.firstName);
    payload.append('last_name', formData.lastName);
    payload.append('email', formData.email);
    payload.append('phone', formData.phone);
    payload.append('post_code', formData.postCode);
    payload.append('property_type_id', String(formData.propertyTypeId));
    formData.serviceIds.forEach((id) => payload.append('services[]', String(id)));
    payload.append('requirements', formData.requirements);
    payload.append('preferred_contact_method_id', String(formData.preferredContactMethodId));
    payload.append('budget_range_id', String(formData.budgetRangeId));
    payload.append('confirmation', formData.confirmation ? '1' : '0');
    if (formData.file) payload.append('file', formData.file);
    const data = await postToAPI(apiConfig.endpoints.customQuoteSubmit, payload, true);

    setSubmitSuccess(data.msg || 'Your quote request has been sent successfully.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      postCode: '',
      propertyTypeId: '',
      serviceIds: [],
      requirements: '',
      preferredContactMethodId: '',
      budgetRangeId: '',
      file: null,
      confirmation: false,
    });

    const fileInput = e.target.querySelector('input[name="file"]');
    if (fileInput) fileInput.value = '';

  } catch (submitErr) {
    setSubmitError(submitErr.message || 'Something went wrong. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  const isEmpty =
    formOptions.services.length === 0 ||
    formOptions.propertyType.length === 0 ||
    formOptions.preferredContactMethod.length === 0 ||
    formOptions.budgetRange.length === 0;

  if (error) {
    return <EmptyState message="Unable to load quote form. Try again!" />;
  }

  if (isEmpty) {
    return <EmptyState message="Form data is not available at the moment. Please check back soon!" />;
  }

  return (
    <section className="px-[1.3rem] px-0">
        <div className="relative top-[-1.5rem] lg:top-[-8rem] mx-auto w-[fit-content] bg-[var(--white)] px-[3rem] py-[3.5rem] lg:p-[6.5rem]">
  <form onSubmit={handleSubmit} noValidate className="">
    <h2 className="font-bold md:text-2xl lg:text-[2rem] mb-[1rem] md:mb-[1.5rem] lg:mb-[1.5rem] text-start">
      {quoteRequest.title}
    </h2>

    <div className="flex mb-[0.5rem] md:mb-[1rem] gap-[0.8rem] md:gap-[2rem]">
      <div className="flex-1">
        <div
          className={`bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[0.5rem] py-[0.35rem] md:px-[1rem] md:py-[0.75rem] ${
            fieldErrors.firstName ? 'border border-red-500' : ''
          }`}
        >
          <input
            type="text"
            name="firstName"
            placeholder={firstName}
            value={formData.firstName}
            onChange={handleChange}
            className="w-full placeholder:text-black border-none outline-none text-[0.6rem] sm:text-base"
            required
          />
        </div>
        {fieldErrors.firstName && (
          <p className="mt-1 text-xs text-red-600 text-left">{fieldErrors.firstName}</p>
        )}
      </div>
      <div className="flex-1">
        <div
          className={`bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[0.5rem] py-[0.35rem] md:px-[1rem] md:py-[0.75rem] ${
            fieldErrors.lastName ? 'border border-red-500' : ''
          }`}
        >
          <input
            type="text"
            name="lastName"
            placeholder={lastName}
            value={formData.lastName}
            onChange={handleChange}
            className="w-full placeholder:text-black border-none outline-none text-[0.6rem] md:text-base"
            required
          />
        </div>
        {fieldErrors.lastName && (
          <p className="mt-1 text-xs text-red-600 text-left">{fieldErrors.lastName}</p>
        )}
      </div>
    </div>

    <div
      className={`bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[0.5rem] py-[0.35rem] md:px-[1rem] md:py-[0.75rem] mb-[0.5rem] md:mb-[1rem] ${
        fieldErrors.email ? 'border border-red-500' : ''
      }`}
    >
      <input
        type="email"
        name="email"
        placeholder={email}
        value={formData.email}
        onChange={handleChange}
        className="w-full placeholder:text-black border-none outline-none text-[0.6rem] md:text-base"
        required
      />
    </div>
    {fieldErrors.email && (
      <p className="mb-[1rem] text-xs text-red-600 text-left">{fieldErrors.email}</p>
    )}

    <div
      className={`flex-1 bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[0.5rem] py-[0.35rem] md:px-[1rem] md:py-[0.75rem] mb-[0.5rem] md:mb-[1rem] ${
        fieldErrors.phone ? 'border border-red-500' : ''
      }`}
    >
        <input
          type="tel"
          name="phone"
          placeholder={phone}
          value={formData.phone}
          onChange={handleChange}
          onKeyDown={handlePhoneKeyDown}
          className="w-full placeholder:text-black border-none outline-none text-[0.6rem] md:text-base"
          required
        />
    </div>
    {fieldErrors.phone && (
      <p className="mb-[1rem] text-xs text-red-600 text-left">{fieldErrors.phone}</p>
    )}
    <h3 className="font-bold md:text-2xl lg:text-[2rem] mb-[1rem] md:mb-[1.5rem] lg:mb-[1.5rem] text-start">
      {services.title}
    </h3>

    <div className="flex mb-[0.5rem] md:mb-[1rem] gap-[0.8rem] md:gap-[2rem]">
      <div className="flex-1">
        <CustomSelect
                placeholder={propertyType}
                options={formOptions.propertyType}
                value={formData.propertyTypeId}
                onChange={(val) => handleSelectChange('propertyTypeId', val)}
                error={fieldErrors.propertyTypeId}
                smallText
              />
        {fieldErrors.propertyTypeId && (
          <p className="mt-1 text-xs text-red-600 text-left">{fieldErrors.propertyTypeId}</p>
        )}
      </div>
      <div className="flex-1">
        <div
          className={`bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[0.5rem] py-[0.35rem] md:px-[1rem] md:py-[0.75rem] ${
            fieldErrors.postCode ? 'border border-red-500' : ''
          }`}
        >
          <input
            type="text"
            name="postCode"
            placeholder={postCode}
            value={formData.postCode}
            onChange={handleChange}
            className="w-full placeholder:text-black border-none outline-none text-[0.6rem] md:text-base"
            required
          />
        </div>
        {fieldErrors.postCode && (
          <p className="mt-1 text-xs text-red-600 text-left">{fieldErrors.postCode}</p>
        )}
      </div>
    </div>
    <h3 className="font-bold md:text-2xl lg:text-[2rem] mb-[1rem] md:mb-[1.5rem] md:mb-[1.5rem] text-start">{services.title}</h3>
      <div className="mb-[1rem] rounded-[4px] md:rounded-[12px] px-[1rem]">
        <div className="flex flex-col gap-2">
{formOptions.services.map((service) => {
  const isChecked = formData.serviceIds.includes(service.id);

  return (
    <label
      key={service.id}
      className="flex items-center gap-2 text-[0.6rem] sm:text-base cursor-pointer select-none"
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => handleServiceToggle(service.id)}
        className="hidden"
      />

      <div
        className={`
          w-5 h-5
          flex items-center justify-center
          transition duration-200
          ${isChecked ? "bg-[var(--primary-blue-first)]" : "bg-white"}
        `}
      >
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          {isChecked && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          )}
        </svg>
      </div>

      <span>{service.name}</span>
    </label>
  );
})}
        </div>
      </div>
    {fieldErrors.serviceIds && (
      <p className="mb-[1rem] text-xs text-red-600 text-left">
        {fieldErrors.serviceIds}
      </p>
    )}
    <div className="bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[1rem] py-[0.5rem] md:px-[1rem] md:py-[0.75rem] mb-[0.5rem] md:mb-[1rem]">
      <textarea
        name="requirements"
        placeholder={requirements}
        value={formData.requirements}
        onChange={handleChange}
        rows={4}
        className="w-full placeholder:text-black border-none outline-none resize-none min-h-[160px] text-xs md:text-base"
      />
    </div>

    <div className="flex mb-[1rem] md:mb-[1.5rem] gap-[0.8rem] md:gap-[1.5rem]">
      <div
        className={`flex-1 ${
          fieldErrors.preferredContactMethodId ? 'border border-red-500' : ''
        }`}
      >
        <CustomSelect
                placeholder={preferredContact}
                options={formOptions.preferredContactMethod}
                value={formData.preferredContactMethodId}
                onChange={(val) => handleSelectChange('preferredContactMethodId', val)}
                error={fieldErrors.preferredContactMethodId}
                smallText
              />
      </div>

      <div
        className={`flex-1 ${
          fieldErrors.budgetRangeId ? 'border border-red-500' : ''
        }`}
      >
        <CustomSelect
                placeholder={budgetRange}
                options={formOptions.budgetRange}
                value={formData.budgetRangeId}
                onChange={(val) => handleSelectChange('budgetRangeId', val)}
                error={fieldErrors.budgetRangeId}
                smallText
              />
      </div>
    </div>
    {(fieldErrors.preferredContactMethodId || fieldErrors.budgetRangeId) && (
      <div className="mb-[1rem]">
        {fieldErrors.preferredContactMethodId && (
          <p className="text-xs text-red-600 text-left">
            {fieldErrors.preferredContactMethodId}
          </p>
        )}
        {fieldErrors.budgetRangeId && (
          <p className="text-xs text-red-600 text-left">
            {fieldErrors.budgetRangeId}
          </p>
        )}
      </div>
    )}

    <div
      className={`bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[0.5rem] py-[0.35rem] md:px-[1rem] md:py-[0.75rem] mb-[2rem] md:mb-[3rem] ${
        fieldErrors.file ? 'border border-red-500' : ''
      }`}
    >
      <label className="flex items-center justify-between gap-4 text-[0.6rem] md:text-base cursor-pointer">
        <span className="text-[var(--secondary)]">{formData.file?.name || 'File upload'}</span>
        <input
          type="file"
          name="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          title={fileUpload}
          aria-label={fileUpload}
          className="hidden"
        />
      </label>
    </div>
    {fieldErrors.file && (
      <p className="mb-[1rem] text-xs text-red-600 text-left">{fieldErrors.file}</p>
    )}

    <label className="pe-[1rem] flex items-start gap-2 mb-[0.5rem] md:mb-[1rem] text-xs md:text-base cursor-pointer">
  <input
    type="checkbox"
    name="confirmation"
    checked={formData.confirmation}
    onChange={handleChange}
    className="hidden"
  />

  <div
    className={`
      mt-1
      w-5 h-5
      flex items-center justify-center
      transition-all duration-200
      ${
        formData.confirmation
          ? "bg-[var(--primary-blue-first)]"
          : "bg-white"
      }
    `}
  >
    <svg
      className="w-4 h-4 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      viewBox="0 0 24 24"
    >
      {formData.confirmation && (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      )}
    </svg>
  </div>

  <span>{consent.label}</span>
</label>
{fieldErrors.confirmation && (
  <p className="mb-[1.5rem] text-xs text-red-600 text-left">
    {fieldErrors.confirmation}
  </p>
)}
<div className='w-[fit-content] mx-[auto] '>
    <button
      type="submit"
      disabled={isSubmitting}
      aria-disabled={!formData.confirmation || isSubmitting}
      className={`text-xs md:text-base bg-[var(--primary-blue-first)] text-white font-bold py-[0.35rem] px-[1rem] md:py-[0.75rem] md:px-[3rem] transition-colors ${
        !formData.confirmation ? "opacity-60 cursor-not-allowed" : "hover:bg-[var(--primary-blue-second)] cursor-pointer"
      } disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {isSubmitting ? 'Sending...' : submit.text}
    </button>
</div>
  </form>

          {submitError && (
            <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-xs md:text-base text-red-700">
              <p className="font-semibold mb-1">We couldnt send your request</p>
              <p>{submitError}</p>
            </div>
          )}
          {submitSuccess && (
            <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs md:text-base text-emerald-800">
              <p className="font-semibold mb-1">Thank you for your request</p>
              <p>{submitSuccess}</p>
            </div>
          )}
        </div>
    </section>
  );
};

export default CustomQuoteClient;

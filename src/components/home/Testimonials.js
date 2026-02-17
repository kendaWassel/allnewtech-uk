import { apiConfig, getApiUrl } from '@/config/api';
import TestimonialsCarousel from './TestimonialsCarousel';

const Testimonials = async () => {
  let testimonials = [];

  try {
    const url = getApiUrl(apiConfig.endpoints.reviews);
    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.msg || 'API request was not successful');
    }
    
    testimonials = data.data.map((review) => ({
      id: review.id,
      rating: review.rating || 5,
      text: review.description || '',
      image: review.user_image || null,
      createdAt: review.created_at,
      updatedAt: review.updated_at,
    }));
  } catch (err) {
    console.error('Error loading testimonials:', err);
    testimonials = [];
  }

  return (
    <section className="relative lg:py-[8rem] py-[4rem]">
      <h2 className='sr-only'>Testimonials</h2>
      <div className="relative flex items-center bg-[var(--secondary)] w-full lg:h-[365px] md:h-[250px] h-[187px]">
        {testimonials.length === 0 ? (
          <div className="w-full flex items-center justify-center">
            <p className="text-white text-center lg:text-xl md:text-lg text-base px-4">
              No testimonials available at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <TestimonialsCarousel testimonials={testimonials} />
        )}
      </div>
    </section>
  );
};

export default Testimonials;

import home from '@/content/homepage';
import Image from 'next/image';
import Link from 'next/link';
import { apiConfig, getApiUrl } from '@/config/api';

const Projects = async () => {
  let projects = [];

  try {
    const url = getApiUrl(apiConfig.endpoints.projects);
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
    
    projects = data.data.map((project) => ({
      id: project.id,
      main_image: project.main_image || '',
    }));
  } catch (err) {
    console.error('Error loading projects:', err);
    projects = [];
  }

  return (
    <section className="py-[1.5rem] md:py-[3rem]">
      <h2 className="font-bold lg:ps-[var(--inline-padding)] lg:text-start text-center text-2xl lg:text-5xl mb-[1.5rem] lg:mb-[3rem]">
        {home.projects.title}
      </h2>

      {/* Images Grid */}
      {projects.length === 0 ? (
        <div className="flex items-center justify-center bg-[var(--white)] py-12">
          <p className="text-center text-gray-600 text-base md:text-lg">
            No projects available at the moment. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 md:gap-6 bg-[var(--white)]">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative aspect-[4/3] w-full overflow-hidden"
            >
              <Image
                src={project.main_image}
                alt={`Project ${project.id}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 33vw, (max-width: 768px) 33vw, 30vw"
                unoptimized
              />
            </div>
          ))}
        </div>
      )}

      {/* Link */}
      <div className="mx-auto w-fit py-[1.5rem] lg:py-[3rem]">
        <Link
          href="/portfolio"
          className="flex items-center text-lg lg:text-2xl font-bold flex items-center gap-2"
        >
          <span>{home.projects.link}</span>
          <Image src="/icons/arrow-right.svg" alt="right arrow" width={25} height={25}/>
        </Link>
      </div>
    </section>
  );
};

export default Projects;

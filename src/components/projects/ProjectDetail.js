import { apiConfig, fetchFromAPI, getImageUrl } from '@/config/api';
import ProjectDetailClient from './ProjectDetailClient';

const ProjectDetail = async ({ projectId }) => {
  let project = null;

  try {
    const data = await fetchFromAPI(`${apiConfig.endpoints.portfolioProjects}/${projectId}`, {
      next: { revalidate: 60 },
    });

    const main = data.data.images?.main?.[0] || '';
    const secondary = data.data.images?.secondary || [];
    const other = data.data.images?.other || [];
    const challenges = data.data.challenges.map((entry) => entry.item);
    const solutions = data.data.solutions.map((entry) => entry.item);
    project = {
      id: data.data.id,
      title: data.data.title || '',
      description: data.data.description || '',
      service: data.data.service || '',
      propertyType: data.data.property_type || '',
      challenges,
      solutions,
      mainImage: getImageUrl(main),
      secondaryImages: secondary.map(getImageUrl).filter(Boolean),
      otherImages: other.map(getImageUrl).filter(Boolean),
    };
  } catch (err) {
    project = null;
  }

  if (!project) {
    return (
      <section className="py-[3rem] lg:py-[4rem]">
        <div className="px-[var(--small-padding)] lg:px-[var(--inline-padding)]">
          <div className="flex items-center justify-center py-12">
            <p className="text-center text-gray-600 text-base md:text-lg">
              Project not found or unavailable at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return <ProjectDetailClient project={project} />;
};

export default ProjectDetail;


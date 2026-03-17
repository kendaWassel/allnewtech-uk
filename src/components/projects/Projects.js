import { apiConfig, fetchFromAPI, getImageUrl } from '@/config/api';
import ProjectsClient from './ProjectsClient';

const PortfolioProjects = async () => {
  let projects = [];

  try {
    const data = await fetchFromAPI(apiConfig.endpoints.portfolioProjects, {
      next: { revalidate: 60 },
    });

    projects = data.data.map((project) => ({
      id: project.id,
      title: project.title || '',
      description: project.description || '',
      service: project.service || '',
      propertyType: project.property_type || '',
      mainImage: getImageUrl(project.images?.main?.[0] || ''),
    }));
  } catch (err) {
    projects = [];
  }

  const services = Array.from(
    new Set(projects.map((p) => p.service).filter(Boolean))
  ).sort();

  return <ProjectsClient projects={projects} services={services} />;
};

export default PortfolioProjects;



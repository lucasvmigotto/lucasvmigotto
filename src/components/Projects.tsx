import { useTranslation } from "react-i18next";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Project } from "@/types/resume";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { ExternalLink } from "./ui/icons";
import { SectionWrapper } from "./ui/SectionWrapper";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const { t } = useTranslation();
  const { ref, isVisible, getChildDelay } = useScrollReveal({ staggerDelay: 100 });

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <SectionWrapper
      id="projects"
      numeral="04"
      eyebrow={t("projects.eyebrow")}
      heading={t("projects.heading")}
    >
      <div
        ref={ref}
        data-reveal
        className={`max-w-[1120px] mx-auto ${isVisible ? "is-visible" : ""}`}
      >
        {featuredProjects.length > 0 && (
          <div>
            <p className="font-body text-[0.875rem] text-text-secondary mb-8">
              {t("projects.featuredLabel")}
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} delay={getChildDelay(i)} />
              ))}
            </div>
          </div>
        )}

        {otherProjects.length > 0 && (
          <div className="mt-16">
            <p className="font-body text-[0.875rem] text-text-secondary mb-8">
              {t("projects.otherLabel")}
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  delay={getChildDelay(i + featuredProjects.length)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

interface ProjectCardProps {
  project: Project;
  delay: string;
}

function ProjectCard({ project, delay }: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <article className="animate-fade-up group relative" style={{ animationDelay: delay }}>
      <Card className="h-full flex flex-col overflow-hidden">
        <div className="relative aspect-video overflow-hidden bg-surface-raised">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
        </div>

        <div className="flex flex-1 flex-col p-5 gap-3">
          <div className="flex flex-wrap gap-2">
            {project.category.slice(0, 3).map((cat) => (
              <Badge key={cat} dotColor="accent">
                {cat}
              </Badge>
            ))}
          </div>

          <h3 className="font-heading font-medium text-[1.1rem] text-text-primary group-hover:text-accent transition-colors">
            {project.name}
          </h3>

          <p className="font-body text-[0.875rem] text-text-secondary line-clamp-3 flex-1">
            {project.summary}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-[0.8rem] text-text-disabled">
            <Badge dotColor="accent">{project.role}</Badge>
            <span>•</span>
            <time>
              {project.period.start} — {project.period.end ?? t("common.present")}
            </time>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <Button
              variant="ghost"
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="w-4 h-4 mr-1">
                <ExternalLink />
              </span>
              {t("projects.viewCode")}
            </Button>
            {project.links.live && (
              <Button
                variant="ghost"
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="w-4 h-4 mr-1">
                  <ExternalLink />
                </span>
                {t("projects.viewLive")}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </article>
  );
}

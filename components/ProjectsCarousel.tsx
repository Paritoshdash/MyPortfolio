"use client";

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import type { Swiper as SwiperType } from 'swiper';
import { Button } from '@/components/Button';
import { ButtonGroup } from '@/components/ButtonGroup';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectsCarouselProps {
  projects: Project[];
}

const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({ projects }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
        pagination={{ 
          clickable: true,
          // Mobile-friendly pagination bullets
          bulletClass: 'swiper-pagination-bullet bg-muted/50 w-3 h-3',
          bulletActiveClass: 'swiper-pagination-bullet-active bg-primary',
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="projects-swiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={project.slug} className="pb-12">
            <div className="group flex flex-col bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden shadow-2xl shadow-black/5 hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] h-full">
              <div className="w-full h-48 sm:h-56 md:h-64 relative overflow-hidden">
                <Image 
                  src={project.imageUrl} 
                  alt={project.title} 
                  fill
                  className="transition-transform duration-500 group-hover:scale-110 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex-1 p-6 sm:p-8 flex flex-col">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-primary">0{index + 1}</span>
                    <div className="flex gap-2 sm:gap-3">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-muted/50 hover:bg-primary hover:text-primary-foreground text-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm text-sm flex items-center gap-1 sm:gap-2"
                        >
                          <FiGithub className="w-4 h-4" /> 
                          <span className="hidden xs:inline">View Code</span>
                        </a>
                      )}
                      {project.liveUrl ? (
                        <a 
                          href={project.liveUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-muted/50 hover:bg-primary hover:text-primary-foreground text-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm text-sm flex items-center gap-1 sm:gap-2"
                        >
                          <FiExternalLink className="w-4 h-4" /> 
                          <span className="hidden xs:inline">Preview</span>
                        </a>
                      ) : (
                        <Link 
                          href={`/projects/${project.slug}`}
                          className="bg-muted/50 hover:bg-primary hover:text-primary-foreground text-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm text-sm flex items-center gap-1 sm:gap-2"
                        >
                          <FiExternalLink className="w-4 h-4" /> 
                          <span className="hidden xs:inline">Preview</span>
                        </Link>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">{project.title}</h3>
                  <p className="mt-3 sm:mt-4 text-foreground/80 leading-relaxed text-sm sm:text-base">{project.shortDescription}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border/50">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-2.5 py-1 sm:px-3 sm:py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2.5 py-1 sm:px-3 sm:py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Navigation Buttons - Mobile friendly */}
      <div className="swiper-navigation flex justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
        <ButtonGroup>
          <Button 
            variant="outline"
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-auto h-12 sm:h-14 rounded-full bg-card/80 border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm px-4 sm:px-6"
            aria-label="Previous project"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5 sm:mr-2" />
            <span className="text-sm sm:text-base">Prev</span>
          </Button>
          <Button 
            variant="outline"
            onClick={() => swiperRef.current?.slideNext()}
            className="w-auto h-12 sm:h-14 rounded-full bg-card/80 border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm px-4 sm:px-6"
            aria-label="Next project"
          >
            <span className="text-sm sm:text-base">Next</span>
            <ArrowRight className="h-4 w-4 ml-1.5 sm:ml-2" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ProjectsCarousel;
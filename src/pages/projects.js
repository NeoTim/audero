import PageTitle from '../components/page-title';
import Project from '../components/project';
import React from 'react';

const getIconPath = (icons, projectName) => {
   const fileName = `${projectName.toLowerCase().replace(/ /g, '-')}-logo`;
   const icon = icons.find(icon => icon.node.name === fileName);
   return icon ? icon.node.publicURL : null;
};

const renderIntro = () => (
   <div className="container">
      <PageTitle iconType="project" title="Projects" />
      <div className="lead">
         <p>
            Being a developer and solving problems is not just my work, but also
            my passion. So, when I see the opportunity to contribute to an Open
            Source project that I've used for work or personal reasons, I don't
            shy away.
         </p>
         <p>
            I also work on my own projects when I want to experiment a new
            technology or try something different. In this page, you can find
            the most important projects I have contributed to or created.
         </p>
      </div>
   </div>
);

const ProjectsPage = ({ data }) => (
   <main>
      <article>
         {renderIntro()}

         <section className="container island">
            <div className="row justify-content-center text-center">
               <div className="col-md-10 col-lg-9">
                  <h3>Contributions</h3>
                  <p>
                     Open Source projects play a crucial role in modern software
                     developement. Many commercial and non-commercial software
                     rely on them. During my career, I have used many of these
                     projects and they have saved me a lot of time. So, whenever
                     I can I try to help. Below you can find the major projects
                     I've contributed to.
                  </p>
                  <div className="row justify-content-center text-left mt-5">
                     {data.contributions.edges.map((project, index) => (
                        <div
                           className={`col-md-6 col-lg-4 ${
                              index > 0 ? 'mt-3' : ''
                           } ${index > 1 ? 'mt-md-4' : 'mt-md-0'} ${
                              index > 2 ? 'mt-lg-5' : 'mt-lg-0'
                           }`}
                           key={project.node.name}
                        >
                           <Project
                              icon={getIconPath(
                                 data.icons.edges,
                                 project.node.name
                              )}
                              {...project.node}
                           />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         <section className="container island">
            <div className="row justify-content-center text-center">
               <div className="col-md-10 col-lg-9">
                  <h3>My own projects</h3>
                  <p>
                     From proof-of-concepts to web apps, from libraries to
                     polyfills, from PHP to JavaScript, whenever there is a
                     chance to learn something new or to solve a problem with a
                     better solution (isn't yours <em>always</em> the best
                     solution?), I try to do it. Below you can find a sample of
                     the open source projects I have developed.
                  </p>
                  <div className="row justify-content-center text-left mt-5">
                     {data.projects.edges.map((project, index) => (
                        <div
                           className={`col-md-6 col-lg-4 ${
                              index > 0 ? 'mt-3' : ''
                           } ${index > 1 ? 'mt-md-4' : 'mt-md-0'} ${
                              index > 2 ? 'mt-lg-5' : 'mt-lg-0'
                           }`}
                           key={project.node.name}
                        >
                           <Project {...project.node} />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>
      </article>
   </main>
);

export default ProjectsPage;

export const query = graphql`
   query ProjectsQuery {
      contributions: allContributionsYaml {
         edges {
            node {
               url
               name
               description
            }
         }
      }
      projects: allProjectsYaml {
         edges {
            node {
               url
               name
               description
            }
         }
      }
      icons: allFile(filter: { relativePath: { regex: "/images/projects/" } }) {
         edges {
            node {
               name
               publicURL
            }
         }
      }
   }
`;

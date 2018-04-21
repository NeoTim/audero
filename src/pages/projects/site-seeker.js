import Link from '../../components/link';
import PageTitle from '../../components/page-title';
import React from 'react';
import { withPrefix } from 'gatsby-link';

const AnemolifPage = () => (
   <main className="container">
      <article itemScope="" itemType="http://schema.org/SoftwareApplication">
         <PageTitle iconType="software" title="Site Seeker" itemProp="name" />
         <img
            className="img-fluid my-3"
            src={withPrefix('/images/site-seeker.png')}
            alt=""
            itemProp="image"
         />
         <div itemProp="description">
            <p>
               Site Seeker is a <b>free</b> software that makes you know the
               exact position of your web site on the most famous search
               engines. It helps you to analyze the{' '}
               <abbr title="Search Engine Results Pages">SERPs</abbr> easily and
               quickly. To use it is very simple!
            </p>
            <p>
               The only things you have to do are: to point out the word or the
               words to search for, to insert the name of your website, to
               choose which search engine you want to use and nothing more. The
               program will entirely do your researches in automatic way and,
               then, you won't never do those boring manual researches you have
               always done before. Besides, Site Seeker is standalone, which
               means that requires no installation. Unzip the .zip file and run
               it.
            </p>
         </div>
         <div className="text-center">
            <Link
               to="/downloads/site_seeker_2.2.2.zip"
               className="btn btn-primary btn-lg my-3"
               itemProp="downloadUrl"
            >
               Download
            </Link>
         </div>
         <section>
            <h3>Current Version</h3>
            <p>
               <span itemProp="softwareVersion">2.2.2</span> [
               <time datetime="2013-09-24" itemProp="dateModified">
                  24 September 2013
               </time>
               ]
            </p>
         </section>
         <section>
            <h3>System Requirements</h3>
            <p itemProp="requirements">Microsoft .Net Framework 3.5</p>
         </section>
         <section>
            <h3>Features details</h3>
            <ul itemProp="featureList">
               <li>
                  More than 20 search engines implemented and that is: Bing.com,
                  Bing Italy, Bing Brazil, Google.com, Google Italy, Google
                  Spain, Google Germany, Google France, Google UK, Google
                  Canada, Google Argentina, Google Brazil, Yahoo.com, Yahoo
                  Italy, Yahoo Spain, Yahoo Germany, Yahoo France, Yahoo UK,
                  Yahoo Canada, Yahoo Argentina, Yahoo Brazil
               </li>
               <li>
                  Search your site until the hundredth page of search engine you
                  select (i.e. to position 1000)
               </li>
               <li>Saving searches with the results in XML format</li>
               <li>
                  Possibility to create a graph of a website based on the log of
                  the searches
               </li>
               <li>Possibility to include in the research sponsored links</li>
               <li>
                  Possibility to search for only in the local language of the
                  search engine (where possible)
               </li>
               <li>Simple and intuitive interface</li>
               <li>Easy to use even for novice</li>
               <li>Possibility to search newer version of the software</li>
            </ul>
         </section>
         <section>
            <h3>Disclaimer</h3>
            <p>
               Some search engines may ban the use of automated requests, so the
               author assumes no responsibility arising from the use or the
               abuse of this software.
            </p>
         </section>
         <section>
            <h3>License</h3>
            <p>
               Site Seeker is freeware, so it can be distributed to whoever for
               free. Selling it you commit a penal crime. Copyright ©
               <span itemProp="copyrightYear">2010</span> - 2017 Aurelio De
               Rosa. All rights reserved.
            </p>
         </section>
         <div className="text-center">
            <Link
               to="/downloads/site_seeker_2.2.2.zip"
               className="btn btn-primary btn-lg my-3"
               itemProp="downloadUrl"
            >
               Download
            </Link>
         </div>
      </article>
   </main>
);

export default AnemolifPage;

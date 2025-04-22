import RichText from '@/components/RichText'
import { formatJobLocation } from '@/utilities/formatLocation'
import { formatJobSalary } from '@/utilities/formatSalary'
import configPromise from '@payload-config'
import { Briefcase, Calendar, Loader, MapPin, MoveRight, Star, Tag } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import { Suspense } from 'react'

type PageParams = {
  params: {
    id: string
  }
}

export default async function Page({ params }: PageParams) {
  const payload = await getPayload({ config: configPromise })
  const job = await payload.findByID({
    collection: 'jobs',
    id: params.id,
  })

  return (
    <main className="w-full min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-32 text-white">
      <Suspense
        fallback={
          <div className="flex w-full h-screen justify-center items-center">
            <div className="flex flex-col items-center gap-4">
              <Loader className="h-10 w-10 animate-spin text-white" />
              <p className="text-gray-300">Loading job details...</p>
            </div>
          </div>
        }
      >
        <div className="flex flex-col w-full gap-10">
          <section className="flex flex-col w-full gap-6 md:gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex w-fit px-3 py-1.5 bg-gray-800/60 border border-gray-700 rounded-full gap-2 items-center text-sm">
                  <MapPin size={14} />
                  <span>{formatJobLocation(job.location)}</span>
                </div>

                {job.level && (
                  <div className="flex w-fit px-3 py-1.5 bg-blue-900/30 border border-blue-700 rounded-full gap-2 items-center text-sm">
                    <Briefcase size={14} />
                    <span>{job.level}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
                  {job.title}
                </h1>
                <Link
                  href="/apply"
                  className="group relative inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-black font-medium transition-all duration-300 hover:bg-opacity-90 w-fit"
                >
                  <span className="relative z-10">Apply Now</span>
                  <MoveRight className="relative z-10" size={18} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {job.experience?.min && (
                <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar size={16} />
                    <span className="text-sm">Experience</span>
                  </div>
                  <p className="font-semibold mt-1">{`${job.experience?.min}${job.experience?.max ? '-' + job.experience?.max : '+'} years`}</p>
                </div>
              )}

              <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 text-gray-300">
                  <Tag size={16} />
                  <span className="text-sm">Salary</span>
                </div>
                <p className="font-semibold mt-1">{formatJobSalary(job.salary)}</p>
              </div>

              <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700 col-span-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <Star size={16} />
                  <span className="text-sm">Key Skills</span>
                </div>
                <p className="font-semibold line-clamp-1 mt-1">
                  {job.skills?.map((e) => e.skill)?.join(', ')}
                </p>
              </div>
            </div>

            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-white">Job Description</h2>
                <div className="prose prose-invert max-w-none text-md md:text-lg text-gray-200">
                  <RichText data={job.description} enableGutter={false} enableProse={true} />
                </div>
              </div>
            </div>
            {job.others && (
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold text-white">
                    Other Personal Qualities & Skills
                  </h2>
                  <div className="prose prose-invert max-w-none text-md md:text-lg text-gray-200">
                    <RichText data={job.others} enableGutter={false} enableProse={true} />
                  </div>
                </div>
              </div>
            )}
            {job.requirements && (
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold text-white">Requirements</h2>
                  <div className="prose prose-invert max-w-none text-md md:text-lg text-gray-200">
                    <RichText data={job.requirements} enableGutter={false} enableProse={true} />
                  </div>
                </div>
              </div>
            )}
            {job.responsibilities && (
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold text-white">Responsibilities</h2>
                  <div className="prose prose-invert max-w-none text-md md:text-lg text-gray-200">
                    <RichText data={job.responsibilities} enableGutter={false} enableProse={true} />
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-white">Requirements & Benefits</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700">
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-bold text-white">Skills & Experience</h3>

                  {job.skills && job.skills?.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <h4 className="text-lg font-semibold">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((item, index) => (
                          <span
                            key={index}
                            className="bg-blue-900/30 text-blue-200 px-3 py-1 rounded-full text-sm"
                          >
                            {item.skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {(job.experience?.min || job.experience?.max) && (
                    <div className="flex flex-col gap-2">
                      <h4 className="text-lg font-semibold">Experience Level</h4>
                      <ul className="list-disc list-inside text-gray-300 flex flex-col gap-1">
                        {job.experience?.min && (
                          <li>{`Minimum ${job.experience?.min} years experience`}</li>
                        )}
                        {job.experience?.max && (
                          <li>{`Preferred up to ${job.experience?.max} years experience`}</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700">
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-bold text-white">Job Details</h3>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-2">
                      <h4 className="text-lg font-semibold">Employment Type</h4>
                      <p className="text-gray-300">{job.level || 'Full-time'}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h4 className="text-lg font-semibold">Location</h4>
                      <p className="text-gray-300">{formatJobLocation(job.location)}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h4 className="text-lg font-semibold">Compensation</h4>
                      <p className="text-gray-300">{formatJobSalary(job.salary)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl p-6 md:p-8 border border-blue-700/50 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl md:text-2xl font-bold text-white">Ready to join our team?</h3>
              <p className="text-gray-300">
                Submit your application today and take the next step in your career.
              </p>
            </div>
            <Link
              href="/apply"
              className="bg-white text-black font-medium px-6 py-3 rounded-full hover:bg-opacity-90 transition-all whitespace-nowrap flex items-center gap-2"
            >
              Apply for this position
              <MoveRight size={18} />
            </Link>
          </div>
        </div>
      </Suspense>
    </main>
  )
}

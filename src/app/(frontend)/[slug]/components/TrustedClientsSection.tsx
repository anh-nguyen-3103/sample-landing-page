import { Carousel } from '@/components/Carousel'
import { clients } from '@/mocks/clients'

export const TrustedClientsSection = () => {
  return (
    <section className="relative w-full flex overflow-hidden bg-white flex-col py-6 lg:py-8">
      <div className="relative w-full flex flex-col px-4 sm:px-6 lg:px-16 xl:px-32 z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-black">Trusted By Clients</h2>
      </div>
      <Carousel data={clients} type="Client" speed={50} className="p-6" />
    </section>
  )
}

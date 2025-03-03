import Image from "next/image"

function CoverImage({name, src}: {name: string, src:string}) {
  return (
    <section className="h-[500px] md-h-[700px] relative mt-6">
      <Image src={src} alt={name} fill sizes='100vw' className="object-cover" priority/>
    </section>
  )
}

export default CoverImage
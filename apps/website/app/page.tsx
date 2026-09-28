import { BaseImage } from "@/components/atoms/Image";
import { Quote } from "@/components/atoms/Quote";
import { EntryBox } from "@/components/molecules/EntryBox";

export default function Home() {

  const ImageGrid = ({ src }:{src: string;}) => {
    return (
      <div className="col-span-1 relative h-[50vh] md:h-full">
        <BaseImage src={src} className="absolute"/>
      </div>
    )
  };

  return (
    <main className="w-full h-screen bg-blush md:py-8 flex justify-center">
      <div className="w-full h-full xl:max-w-7xl xl:max-h-7xl">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 md:gap-8">
          <ImageGrid src="/Leo.jpg" />
          <EntryBox className="col-span-1 h-[50vh] md:h-full" />
          <ImageGrid src="/Bugsy.jpg" />
          <Quote text="My cats love my Pet Pals sitter." name="John" className="col-span-1 h-[50vh] md:h-full" />
          <ImageGrid src="/Bepper.jpg" />
          <Quote text="The only pet sitting service I’ve found for my pig!" name="Jane" className="col-span-1 h-[50vh] md:h-full" />
        </div>
      </div>
    </main>
  );
}

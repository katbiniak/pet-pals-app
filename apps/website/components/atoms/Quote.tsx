import { cn } from "@/utils/cn";

interface QuoteProps {
  text?: string;
  name?: string;
  className?: string;
}

export const Quote: React.FC<QuoteProps> =
({
  text = '',
  name = '',
  className
}) => {
  return (
    <div className={cn(`bg-blossom w-full h-full flex flex-col justify-center items-center p-11 text-charcoal text-4xl text-center italic gap-2`, className)}>
      <p className="lg:max-w-60 w-full">{`"${text}"`}</p>
      <p> - {name} </p>
    </div>
  );
}

export default Quote;
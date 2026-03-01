export default function SpecialHeader({title}: {title: string}){
  return(
    <h1 className="text-2xl ps-4 font-bold relative before:absolute before:h-full before:w-[4px] before:bg-main before:start-0 before:top-0">{title}</h1>
  )
}
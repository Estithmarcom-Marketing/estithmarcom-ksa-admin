export default function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="text-base font-bold text-foreground border-b border-input pb-2 mb-4">
      {title}
    </h3>
  );
}
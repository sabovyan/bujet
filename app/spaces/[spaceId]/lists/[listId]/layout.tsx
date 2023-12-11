export default function ListLayout({
  children,
  list
}: {
  children: React.ReactNode;
  list: React.ReactNode;
}) {
  return (
    <main className="p-4">
      {children}
      {list}
    </main>
  );
}

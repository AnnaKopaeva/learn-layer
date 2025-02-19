export default function CardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex mt-8 justify-center w-full h-full">{children}</div>
  );
}

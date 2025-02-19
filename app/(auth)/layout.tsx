import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <main className="flex justify-center pt-8 h-full bg-gray-900 min-h-screen text-white">
        {children}
      </main>
    </div>
  );
}

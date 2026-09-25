// export default function AuthLayout({
//     children,
//   }: {
//     children: React.ReactNode;
//   }) {
//     return (
//       <div>
//         {children}
//       </div>
//     );
//   }

  export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="min-h-screen bg-slate-50">
        {children}
      </main>
    );
  }
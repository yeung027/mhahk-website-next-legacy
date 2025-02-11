import PageHeader  from '@/app/[lang]/components/PageHeader'

export default function IndexLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
      <PageHeader pathname={''} />
      {children}
      </>
    );
  }
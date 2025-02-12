import PageHeader  from '@/app/[lang]/components/PageHeader'

export default function IndexLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className={""}>
      <PageHeader pathname={''} />
      <div className={"px-[40px] mt-[10px]"}>
        {children}
      </div>
      </div>
    );
  }
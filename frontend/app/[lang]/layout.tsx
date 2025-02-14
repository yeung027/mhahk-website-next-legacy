import PageHeader  from '@/app/[lang]/components/PageHeader'
import {Locale} from "@/models/util";

export default async function IndexLayout({
    children,
    params
  }: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: Locale }>
  }>) 
  {
    const lang:Locale = (await params).lang;

    return (
      <div className={""}>
      <PageHeader pathname={''} locale={lang} />
      <div className={"px-pageX xl:px-pageXLX mt-[10px]"}>
        {children}
      </div>
      </div>
    );
  }
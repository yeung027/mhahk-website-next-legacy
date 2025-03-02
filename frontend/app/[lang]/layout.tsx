import PageHeader  from '@/app/[lang]/components/PageHeader'
import {Locale, PageCategory} from "@/models/util";
import PageFooter from './components/PageFooter';

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
      <PageHeader locale={lang} />
      <div className={"px-pageX xl:px-pageXLX mt-[10px]"}>
        {children}
      </div>
      <PageFooter locale={lang} />
      </div>
    );
  }
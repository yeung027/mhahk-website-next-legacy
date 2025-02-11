import Link from 'next/link'

interface PageHeaderProps {
    pathname: string
  }

export default function PageHeader({ pathname } : PageHeaderProps) {
    return (
        <header className={"h-[50px] w-full bg-mainGreen hidden xl:flex flex-row-reverse px-[47px] items-center text-white text-[0.938rem]"}>
            <div className="">
                <Link href={`zh-HK/${pathname}`}>
                    繁
                </Link>
                <span className='mx-[8px]'>|</span>
                <Link href={`cn/${pathname}`}>
                    簡
                </Link>
            </div>
        </header>
    )
    }
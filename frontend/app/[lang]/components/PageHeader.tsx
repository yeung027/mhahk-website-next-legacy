import Link from 'next/link'

interface PageHeaderProps {
    pathname: string
  }

export default function PageHeader({ pathname } : PageHeaderProps) {
    return (
        <header className={"h-[49px] w-full bg-mainGreen hidden xl:flex flex-row-reverse px-[47px] items-center text-white text-[0.938rem]"}>
            <div className="ml-[33px]">
                <input className="text-white bg-[#61b99f] h-[27px] rounded-[3px]" type='search' />
            </div>
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
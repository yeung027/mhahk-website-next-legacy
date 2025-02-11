import Link from 'next/link'
import { LiaSearchSolid } from "react-icons/lia";

interface PageHeaderProps {
    pathname: string
  }

export default function PageHeader({ pathname } : PageHeaderProps) {
    return (
        <header className={"h-[49px] w-full bg-mainGreen hidden xl:flex flex-row-reverse px-[47px] items-center text-white text-[0.938rem]"}>
            <div className="ml-[33px] flex flex-row-reverse">
                <input className="text-white bg-[#4db093] focus:bg-[#61b99f] h-[27px] rounded-[3px] px-[7px] w-[124px]" type='search' />
                <div className='absolute'>
                    <LiaSearchSolid className='h-[27px] text-[1.3rem] text-white mr-[7px] cursor-pointer' />
                </div>
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
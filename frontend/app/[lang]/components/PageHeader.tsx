import Link from 'next/link'
import Image from 'next/image'
import { LiaSearchSolid } from "react-icons/lia";
import { MdKeyboardArrowDown } from "react-icons/md";

interface PageHeaderProps {
    pathname: string
  }

export default function PageHeader({ pathname } : PageHeaderProps) {
    return (
        <header className={"flex flex-col"}>
            <div className={"h-[49px] w-full bg-mainGreen hidden xl:flex flex-row-reverse px-[47px] items-center text-white text-[0.938rem]"}>
                <div className="ml-[33px] flex flex-row-reverse">
                    <input className="text-white bg-[#4db093] focus:bg-[#61b99f] h-[27px] rounded-[3px] px-[7px] w-[124px] placeholder-white text-[0.938rem]" type='search' placeholder="搜尋" />
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
            </div>
            <div className={"px-[30px] flex flex-col"}>
                <div className={"grid grid-cols-[500px_auto]"}>
                    <div className={""}>
                        <Image
                            src="/header/logo.png"
                            width={474}
                            height={121}
                            alt="logo"
                            className={"max-w-[474px] h-[121px]"}
                            priority={true}
                        />
                    </div>
                    <div className={"flex flex-row-reverse items-center pr-[70px]"}>
                        <Image
                            src="/header/donation.png"
                            width={96}
                            height={30}
                            alt="logo"
                            priority={true}
                            key={"img422"}
                            className={"cursor-pointer"}
                        />
                        <Image
                            src="/header/youtube.png"
                            width={30}
                            height={30}
                            alt="logo"
                            priority={true}
                            key={"img3"}
                            className={"cursor-pointer"}
                        />
                        <Image
                            src="/header/fb.png"
                            width={30}
                            height={30}
                            alt="logo"
                            priority={true}
                            key={"img2"}
                            className={"cursor-pointer"}
                        />
                        <Image
                            src="/header/ig.png"
                            width={30}
                            height={28}
                            alt="logo"
                            className={"w-[30px] h-[28px] mr-[1px] cursor-pointer"}
                            priority={true}
                            key={"img1"}
                        />
                        
                        
                        
                    </div>
                </div>
                <ul className={"font-['Noto Sans', Helvetica] text-[0.875rem] px-[10px] flex flex-row gap-[30px]"}>
                    <li className={"cursor-pointer"}>
                        <div className={""}>
                            首頁
                        </div>
                        <div className={"mt-[8px] h-[2px] bg-black"} />
                    </li>
                    <li className={"cursor-pointer"}>
                        <div className={"flex flex-row items-center"}>
                            <span>
                                關於我們
                            </span>
                            <MdKeyboardArrowDown className={"ml-[5px]"} />
                        </div>
                        <div className={"mt-[8px] h-[2px] bg-black hidden"} />
                    </li>
                    <li className={"cursor-pointer"}>
                        <div className={"flex flex-row items-center"}>
                            <span>
                                核心服務
                            </span>
                            <MdKeyboardArrowDown className={"ml-[5px]"} />
                        </div>
                        <div className={"mt-[8px] h-[2px] bg-black hidden"} />
                    </li>
                    <li className={"cursor-pointer"}>
                        <div className={"flex flex-row items-center"}>
                            <span>
                                最新消息
                            </span>
                            <MdKeyboardArrowDown className={"ml-[5px]"} />
                        </div>
                        <div className={"mt-[8px] h-[2px] bg-black hidden"} />
                    </li>
                    <li className={"cursor-pointer"}>
                        <div className={"flex flex-row items-center"}>
                            <span>
                                出版
                            </span>
                            <MdKeyboardArrowDown className={"ml-[5px]"} />
                        </div>
                        <div className={"mt-[8px] h-[2px] bg-black hidden"} />
                    </li>
                    <li className={"cursor-pointer"}>
                        <div className={"flex flex-row items-center"}>
                            <span>
                                資訊分享
                            </span>
                            <MdKeyboardArrowDown className={"ml-[5px]"} />
                        </div>
                        <div className={"mt-[8px] h-[2px] bg-black hidden"} />
                    </li>
                    <li className={"cursor-pointer"}>
                        <div className={"flex flex-row items-center"}>
                            <span>
                                義工服務
                            </span>
                            <MdKeyboardArrowDown className={"ml-[5px]"} />
                        </div>
                        <div className={"mt-[8px] h-[2px] bg-black hidden"} />
                    </li>
                    <li className={"cursor-pointer"}>
                        <div className={"flex flex-row items-center"}>
                            <span>
                                職位空缺
                            </span>
                        </div>
                        <div className={"mt-[8px] h-[2px] bg-black hidden"} />
                    </li>
                </ul>
            </div>
        </header>
    )
}
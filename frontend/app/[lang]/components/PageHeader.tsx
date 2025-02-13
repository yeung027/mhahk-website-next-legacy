import Link from 'next/link'
import Image from 'next/image'
import { LiaSearchSolid } from "react-icons/lia";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

interface PageHeaderProps {
    pathname: string
  }

export default function PageHeader({ pathname } : PageHeaderProps) {
    const xl_menuitem_has_submenu = "group relative"
    const xl_menuitem_has_submenu_inner = "cursor-pointer flex flex-row items-center"
    const xl_submenu_classname = "flex transition duration-300 ease-in-out group opacity-0 group-hover:opacity-100 scale-[0] group-hover:scale-[1] origin-top cursor-pointer absolute shadow-[0_2px_5px_rgba(0,0,0,0.1)] bg-mainGreen w-full ml-[-15px] mt-[7px] min-w-[230px] flex-col px-[30px] py-[15px] text-green2 font-['Noto Sans', Helvetica]";
    const xl_submenuitem_classname = "transition duration-300 ease-in-out pt-[15px] pb-[9px] hover:text-hoverBlue"
    const xl_submenu_sep_classname = "border-t-[1px] border-[#4a9b7e]"

    const menu_sep_classname = "border-t-[1px] border-[#4db093]"
    const menu_item_classname = "text-green2"
    const menu_item_has_subitem_classname = "items-center grid grid-cols-[auto_10vw]"

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
            <div className={"px-[7vw] xl:px-[30px] flex flex-col"}>
                <div className={"flex flex-col xl:grid xl:grid-cols-[500px_auto] pt-[5px] xl:pt-0"}>
                    <div className={"grid grid-cols-[90%_auto] xl:flex"}>
                        <div className={""}>
                            <Image
                                src="/header/logo.png"
                                width={474}
                                height={121}
                                alt="logo"
                                className={"w-[80vw] xl:w-[474px] xl:max-w-[474px] xl:h-[121px]"}
                                priority={true}
                            />
                        </div>
                        <div className={"mr-[-1vw] flex xl:hidden items-center justify-end text-[1.5rem]"}>
                            <FiMenu className={"cursor-pointer"} />
                        </div>
                    </div>
                    <div className={"xl:w-full pl-[2vw] xl:pl-0 pt-[2vw] xl:pt-0 flex flex-row-reverse items-center place-self-start xl:place-self-center xl:pr-[70px]"}>
                        <Image
                            src="/header/donation.png"
                            width={90}
                            height={22}
                            alt="logo"
                            priority={true}
                            key={"img4ggg22"}
                            className={"cursor-pointer h-[26px] w-[88px] ml-[7px]"}
                        />
                        <Image
                            src="/header/youtube.png"
                            width={30}
                            height={30}
                            alt="logo"
                            priority={true}
                            key={"img3gggg"}
                            className={"cursor-pointer"}
                        />
                        <Image
                            src="/header/fb.png"
                            width={30}
                            height={30}
                            alt="logo"
                            priority={true}
                            key={"img2gggg"}
                            className={"cursor-pointer"}
                        />
                        <Image
                            src="/header/ig.png"
                            width={30}
                            height={28}
                            alt="logo"
                            className={"w-[30px] h-[28px] mr-[1px] cursor-pointer"}
                            priority={true}
                            key={"imgggg1"}
                        />
                        
                        
                        
                    </div>
                </div>
                <div className={"relative xl:hidden"}>
                <ul className={"flex flex-col gap-[3vw] absolute w-[calc(100%+8vw)] ml-[-4vw] font-['Istok Web', Helvetica] text-[0.875rem] bg-mainGreen w-full mt-[3px] py-[10vw] px-[8vw]"}>
                    <li className={"flex"}>
                        <div className="flex flex-row-reverse pb-[4vw]">
                            <input className="text-white bg-[#4db093] focus:bg-[#61b99f] h-[27px] rounded-[3px] px-[7px] w-[124px] placeholder-white" type='search' placeholder="搜尋" />
                            <div className='absolute'>
                                <LiaSearchSolid className='h-[27px] text-[1.3rem] text-white mr-[7px] cursor-pointer' />
                            </div>
                        </div>
                    </li>
                    <li className={`${menu_sep_classname}`} />
                    <li className={`${menu_item_classname} text-black`}>
                        首頁
                    </li>
                    <li className={`${menu_sep_classname}`} />
                    <li className={`${menu_item_classname} ${menu_item_has_subitem_classname}`}>                       
                        <span>
                            關於我們
                        </span>
                        <MdKeyboardArrowDown className={"ml-[5px]"} />
                    </li>
                    <li className={`${menu_sep_classname}`} />
                    <li className={`${menu_item_classname} ${menu_item_has_subitem_classname}`}>                       
                        <span>
                            核心服務
                        </span>
                        <MdKeyboardArrowDown className={"ml-[5px]"} />
                    </li>
                    <li className={`${menu_sep_classname}`} />
                    <li className={`${menu_item_classname} ${menu_item_has_subitem_classname}`}>                       
                        <span>
                            最新消息
                        </span>
                        <MdKeyboardArrowDown className={"ml-[5px]"} />
                    </li>
                    <li className={`${menu_sep_classname}`} />
                    <li className={`${menu_item_classname} ${menu_item_has_subitem_classname}`}>                       
                        <span>
                            出版
                        </span>
                        <MdKeyboardArrowDown className={"ml-[5px]"} />
                    </li>
                    <li className={`${menu_sep_classname}`} />
                    <li className={`${menu_item_classname} ${menu_item_has_subitem_classname}`}>                       
                        <span>
                            資訊分享
                        </span>
                        <MdKeyboardArrowDown className={"ml-[5px]"} />
                    </li>
                    <li className={`${menu_sep_classname}`} />
                    <li className={`${menu_item_classname} ${menu_item_has_subitem_classname}`}>                       
                        <span>
                            義工服務
                        </span>
                        <MdKeyboardArrowDown className={"ml-[5px]"} />
                    </li>
                    <li className={`${menu_sep_classname}`} />
                    <li className={`${menu_item_classname}`}>                       
                        <span>
                            職位空缺
                        </span>
                    </li>
                </ul>
                </div>

                <ul className={"font-['Noto Sans', Helvetica] text-[0.875rem] px-[10px] hidden xl:flex flex-row gap-[30px] mb-[10px]"}>
                    <li className={"relative cursor-pointer"}>
                        <div className={""}>
                            首頁
                        </div>
                        <div className={"absolute w-full mt-[8px] h-[2px] bg-black"} />
                    </li>
                    <li className={`${xl_menuitem_has_submenu}`}>
                        <div className={`${xl_menuitem_has_submenu_inner}`}>
                            <span>
                                關於我們
                            </span>
                            <MdKeyboardArrowDown className={"ml-[5px]"} />
                        </div>
                        <div className={"mt-[8px] h-[2px] bg-black hidden"} />
                        <ul className={`${xl_submenu_classname}`}>
                            <li className={`${xl_submenuitem_classname}`}>
                                <span>
                                    機構簡介
                                </span>
                            </li>
                            <li className={`${xl_submenu_sep_classname}`} />
                            <li className={`${xl_submenuitem_classname}`}>
                                <span>
                                    願景、使命及價值
                                </span>
                            </li>
                            <li className={`${xl_submenu_sep_classname}`} />
                            <li className={`${xl_submenuitem_classname}`}>
                                <span>
                                    機構架構
                                </span>
                            </li>
                            <li className={`${xl_submenu_sep_classname}`} />
                            <li className={`${xl_submenuitem_classname}`}>
                                <span>
                                    大事年表
                                </span>
                            </li>
                            <li className={`${xl_submenu_sep_classname}`} />
                            <li className={`${xl_submenuitem_classname}`}>
                                <span>
                                    財務報告
                                </span>
                            </li>
                            <li className={`${xl_submenu_sep_classname}`} />
                            <li className={`${xl_submenuitem_classname}`}>
                                <span>
                                    公開籌款活動審計報告
                                </span>
                            </li>
                            <li className={`${xl_submenu_sep_classname}`} />
                            <li className={`${xl_submenuitem_classname}`}>
                                <span>
                                    聯絡我們
                                </span>
                            </li>
                        </ul>
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
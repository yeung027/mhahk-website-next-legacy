'use client'

import { LiaSearchSolid } from "react-icons/lia";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { components } from "@/api/strapi";

interface PageHeaderProps {
    pathname: string,
    items:components["schemas"]["MainMenu"][] | undefined
  }

export default function MainMenu({ pathname, items } : PageHeaderProps) {

    const sep_classname = "border-t-[1px] border-[#4db093]"
    const item_classname = "text-green2"
    const has_subitem_classname = "items-center grid grid-cols-[auto_10vw]"
    const inner_classname   = "flex flex-col gap-[3vw] absolute font-Istok_Web text-[0.875rem] bg-mainGreen w-full mt-[3px] py-[10vw] px-[8vw]"
    const [mobileShow, setMobileShow]             = useState<boolean>(false);

    const xl_inner_classname= "xl:bg-white xl:static xl:font-Noto_Sans xl:px-[10px] xl:flex-row xl:gap-[30px] xl:mb-[10px] xl:py-0 xl:mt-0"
    const xl_menuitem = "xl:relative xl:cursor-pointer xl:text-[#000000e3]"
    const xl_menuitem_has_submenu = "xl:group xl:relative xl:text-[#000000e3] xl:flex"
    const xl_menuitem_has_submenu_inner = "cursor-pointer xl:flex flex-row items-center"
    const xl_submenu_classname = "flex transition duration-300 ease-in-out group opacity-0 group-hover:opacity-100 scale-[0] group-hover:scale-[1] origin-top cursor-pointer absolute shadow-[0_2px_5px_rgba(0,0,0,0.1)] bg-mainGreen w-full ml-[-15px] mt-[7px] min-w-[230px] flex-col px-[30px] py-[15px] text-green2 font-['Noto Sans', Helvetica]";
    const xl_submenuitem_classname = "transition duration-300 ease-in-out pt-[15px] pb-[9px] hover:text-hoverBlue"
    const xl_submenu_sep_classname = "border-t-[1px] border-[#4a9b7e]" 
    
    const menuBtnClick = () => {
        setMobileShow(!mobileShow)
    }

    return (
            <nav>
                <div className={"xl:hidden absolute text-[1.5rem] text-black h-[17vw] w-[10vw] top-[2vw] right-[4vw] flex items-center justify-end transition duration-700 ease-in-out "}>
                    <FiMenu className={`${mobileShow? "scale-[0] opacity-0" : "scale-[1] opacity-100"} absolute cursor-pointer`} onClick={menuBtnClick} />
                    <IoMdClose className={`${mobileShow? "scale-[1] opacity-100" : "scale-[0] opacity-0"} absolute cursor-pointer`} onClick={menuBtnClick} />
                </div>
                <div className={"relative"}>
                    <ul className={`${mobileShow? "scale-y-[1] opacity-100" : "scale-y-[0] opacity-0 xl:scale-y-[1] xl:opacity-100"} transition duration-300 ease-in-out origin-top ${inner_classname} ${xl_inner_classname}`}>
                        <li className={"flex xl:hidden"}>
                            <div className="flex flex-row-reverse pb-[4vw]">
                                <input className="text-white bg-[#4db093] focus:bg-[#61b99f] h-[27px] rounded-[3px] px-[7px] w-[124px] placeholder-white" type='search' placeholder="搜尋" />
                                <div className='absolute'>
                                    <LiaSearchSolid className='h-[27px] text-[1.3rem] text-white mr-[7px] cursor-pointer' />
                                </div>
                            </div>
                        </li>
                        <li className={`${sep_classname} xl:hidden`} />
                        {items &&
                            items.map((item) => {
                                return <li className={`${item_classname} ${xl_menuitem}`}>
                                            <div>
                                                {item.items?.map((sub:any) =>{
                                                    return  <>
                                                                {sub &&
                                                                    <div>{sub.__component == "main-menu.main-menu-item" ? "o" : "x"}</div>
                                                                }
                                                            </>
                                                }
                                                )}
                                            </div>
                                            <div className={"hidden xl:flex absolute w-full bottom-[-8px] h-[2px] bg-black"} />
                                        </li>
                            })
                        }


                    </ul>
                </div>
            </nav>

    )
}

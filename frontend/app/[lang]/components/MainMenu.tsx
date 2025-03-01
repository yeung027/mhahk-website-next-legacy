'use client'

import { LiaSearchSolid } from "react-icons/lia";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { components } from "@/api/strapi";
import {PageCategory} from "@/models/util";
import React from "react";

interface MainMenuProps {
    pathname: string,
    mainmenu:components["schemas"]["MainMenu"] | undefined,
    category: PageCategory
}



export default function MainMenu({ pathname, mainmenu, category } : MainMenuProps) {

    const sep_classname = "border-t-[1px] border-[#4db093]"
    const item_classname = "text-green2"
    const has_subitem_classname = "items-center grid grid-cols-[auto_10vw]"
    const inner_classname   = "flex flex-col gap-[3vw] absolute font-Istok_Web text-[0.875rem] bg-mainGreen w-full mt-[3px] py-[10vw] px-[8vw]"
    
    const [mobileShow, setMobileShow]             = useState<boolean>(false);

    const xl_inner_classname= "xl:bg-white xl:static xl:font-Noto_Sans xl:px-[10px] xl:flex-row xl:gap-[30px] xl:mb-[10px] xl:py-0 xl:mt-0"
    const xl_menuitem = "group xl:relative xl:cursor-pointer xl:text-[#000000e3]"
    const xl_menuitem_has_submenu_inner = "cursor-pointer xl:flex flex-row items-center"
    
    
    const menuBtnClick = () => {
        setMobileShow(!mobileShow)
    }

    const isRootItem = (
        item: components["schemas"]["MainMenuMainmenuRootitemComponent"] | components["schemas"]["MainMenuMainmenuSubmenuComponent"] | components["schemas"]["MainMenuMainmenuSubsubmenuComponent"]
      ): item is components["schemas"]["MainMenuMainmenuRootitemComponent"] => {
        return item.__component === "main-menu.mainmenu-rootitem";
    };

    const isSub_or_Subsubmenu = (
        item: components["schemas"]["MainMenuMainmenuRootitemComponent"] | 
              components["schemas"]["MainMenuMainmenuSubmenuComponent"] | 
              components["schemas"]["MainMenuMainmenuSubsubmenuComponent"]
    ): item is components["schemas"]["MainMenuMainmenuSubmenuComponent"] | 
            components["schemas"]["MainMenuMainmenuSubsubmenuComponent"] => {
        return item.__component === "main-menu.mainmenu-submenu" || 
               item.__component === "main-menu.mainmenu-subsubmenu";
    };

    const isSubmenu = (
        item: components["schemas"]["MainMenuMainmenuRootitemComponent"] | components["schemas"]["MainMenuMainmenuSubmenuComponent"] | components["schemas"]["MainMenuMainmenuSubsubmenuComponent"]
      ): item is components["schemas"]["MainMenuMainmenuSubmenuComponent"] => {
        return item.__component === "main-menu.mainmenu-submenu";
    };

    const isSubsubmenu = (
        item: components["schemas"]["MainMenuMainmenuRootitemComponent"] | components["schemas"]["MainMenuMainmenuSubmenuComponent"] | components["schemas"]["MainMenuMainmenuSubsubmenuComponent"]
      ): item is components["schemas"]["MainMenuMainmenuSubsubmenuComponent"] => {
        return item.__component === "main-menu.mainmenu-subsubmenu";
    };

    const subMenuRender = (
        menu: components["schemas"]["MainMenuMainmenuSubmenuComponent"]
    ) => {
        const submenu_classname = "scale-[1] opacity-100 static pl-[30px]"
        const submenu_sep_classname = "border-[#4db093]"
        const submenuitem_classname = "max-w-[200px] min-w-[160px]"

        const xl_submenu_classname = `transition duration-300 ease-in-out 
            group opacity-0 group-hover:xl:opacity-100 xl:scale-[0] group-hover:xl:scale-[1] origin-top cursor-pointer 
            xl:absolute xl:shadow-[0_2px_5px_rgba(0,0,0,0.1)] bg-mainGreen mt-[7px] px-[20px] py-[15px] 
            text-green2 font-['Noto Sans', Helvetica] gap-4`;
        const xl_submenuitem_classname = "transition duration-300 ease-in-out pt-[15px] pb-[9px] hover:text-hoverBlue"
        const xl_submenu_sep_classname = "border-t-[1px] xl:border-[#4a9b7e]" 

        return  <React.Fragment key={`sub-menu-id-${menu.id}`}>
                    <ul 
                        className={`${submenu_classname} ${xl_submenu_classname}`} 
                        key={`sub-menu-ul-${menu.id}`}
                    >
                        <li className={`${submenu_sep_classname} ${xl_submenu_sep_classname} xl:hidden`} key={`sep-${menu.id ?? 0}`}  />
                        {menu.items &&
                            menu.items.map((item, index) => {
                               return   <React.Fragment key={`menu-item-${index}`}>
                                            <li className={`${submenuitem_classname} ${xl_submenuitem_classname}`} key={`submenu-item-${item.id}-${index}`}>
                                                <span>{item.title}</span>
                                            </li>
                                            <li className={`${submenu_sep_classname} ${xl_submenu_sep_classname} last:hidden`} key={`submenu-sep-${item.id}-${index}`} />
                                        </React.Fragment>
                            })
                        }
                    </ul>
                </React.Fragment>
    };

    const subsubMenuRender = (
        index:number,
        menu: components["schemas"]["MainMenuMainmenuSubsubmenuComponent"]
    ) => {
        const submenu_classname = "scale-[1] opacity-100 static pl-[30px]"
        const submenu_sep_classname = "border-[#4db093]"
        const title_classname = `text-[0.938rem] text-[#004ee2] font-[600]`
        const ul_classname = ""
        const item_classname = ""
        const sep_classname = "border-[#4db093]"

        const xl_submenu_classname = `flex flex-row transition duration-300 ease-in-out 
             opacity-0 xl:scale-[0] xl:mt-[30px]
             peer-hover/g${String(index + 1).padStart(3, "0")}:xl:opacity-100 peer-hover/g${String(index + 1).padStart(3, "0")}:xl:scale-[1]
             hover:xl:opacity-100 hover:xl:scale-[1]
             origin-top cursor-pointer 
            xl:absolute xl:shadow-[0_2px_5px_rgba(0,0,0,0.1)] bg-mainGreen px-[20px] py-[15px] xl:mx-negative_pageXLX w-[calc(100%+60px)]
            text-green2 font-['Noto Sans', Helvetica] gap-4`;
        const xl_submenu_sep_classname = "border-t-[1px] xl:border-[#4a9b7e]" 
        const xl_ul_classname = ` `
        const submenuitem_classname = ""
        const xl_item_classname = "transition duration-300 ease-in-out pt-[15px] pb-[9px] hover:text-hoverBlue"
        const xl_sep_classname = "border-t-[1px] xl:border-[#4a9b7e]" 


        return  <li 
                    className={`${submenu_classname} ${xl_submenu_classname}`} 
                    key={`sub-sub-menu-ul-${menu.id}`}
                >
                    {menu.menus &&
                        menu.menus.map((subsubmenu) => {
                            return <ul className="">
                                        <li className={`${item_classname} ${xl_item_classname} ${title_classname}`}>
                                            {subsubmenu.title}
                                        </li>
                                        {subsubmenu.items &&
                                            subsubmenu.items.map((item, y) => {
                                                return  <React.Fragment key={`subsubmenu-item-${index}-${y}`}>
                                                            <li className={`${sep_classname} ${xl_sep_classname} last:hidden`} key={`subsubmenu-sep-${index}-${y}`} />
                                                            <li className={`${item_classname} ${xl_item_classname}`} key={`subsubmenu-item-${index}-${y}`}>
                                                                {item.image &&
                                                                    <img 
                                                                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.image.url}`} 
                                                                    key={`subsubmenu-item-image-${index}`} 
                                                                    className={`max-h-[60px]`}
                                                                />
                                                                }
                                                                {item.title}
                                                            </li>
                                                        </React.Fragment>
                                            })
                                        }
                                    </ul>
                        })
                        
                    }
                    
                </li>
    };

    return (
            <nav className={`z-nav`}>
                <div className={"xl:hidden absolute text-[1.5rem] text-black h-[17vw] w-[10vw] top-[2vw] right-[4vw] flex items-center justify-end transition duration-700 ease-in-out "}>
                    <FiMenu className={`${mobileShow? "scale-[0] opacity-0" : "scale-[1] opacity-100"} absolute cursor-pointer`} onClick={menuBtnClick} />
                    <IoMdClose className={`${mobileShow? "scale-[1] opacity-100" : "scale-[0] opacity-0"} absolute cursor-pointer`} onClick={menuBtnClick} />
                </div>
                <div className={"relative"}>
                    <ul className={`${mobileShow? "scale-y-[1] opacity-100" : "scale-y-[0] opacity-0 xl:scale-y-[1] xl:opacity-100"} 
                        transition duration-300 ease-in-out origin-top ${inner_classname} ${xl_inner_classname}`}>
                        <li className={"flex xl:hidden"}>
                            <div className="flex flex-row-reverse pb-[4vw]">
                                <input className="text-white bg-[#4db093] focus:bg-[#61b99f] h-[27px] rounded-[3px] px-[7px] w-[124px] placeholder-white" type='search' placeholder="搜尋" />
                                <div className='absolute'>
                                    <LiaSearchSolid className='h-[27px] text-[1.3rem] text-white mr-[7px] cursor-pointer' />
                                </div>
                            </div>
                        </li>
                        
                        {mainmenu && mainmenu.items &&
                            mainmenu.items.map((item, index) => {
                                return  <React.Fragment key={`main-menu-item-wrapper-${index}`}>
                                            <li className={`${sep_classname} xl:hidden`} key={`sep-${index}`} />
                                            <li className={`${isSubsubmenu(item)? `peer/g${String(index + 1).padStart(3, "0")}` : ''} ${item_classname} ${xl_menuitem}`} key={`main-menu-item-${index}`}>
                                                {isRootItem(item) &&
                                                    <div className={`${item.category?.category===category ? "text-black xl:text-[#000000e3]" : ""}`}>
                                                        {item.title}
                                                    </div>
                                                }
                                                {isSub_or_Subsubmenu(item) &&
                                                    <div className={`${xl_menuitem_has_submenu_inner} ${has_subitem_classname} ${item.category?.category===category ? "text-black" : ""}`}>
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                        <MdKeyboardArrowDown className={"ml-[5px]"} />
                                                    </div>
                                                }
                                                <div className={`${item.category && item.category.category === category ? "hidden xl:flex" : "hidden"} absolute w-full bottom-[-8px] h-[2px] bg-black`} />
                                                {isSubmenu(item) && subMenuRender(item)}
                                                
                                            </li>
                                            {isSubsubmenu(item) && subsubMenuRender(index, item)}
                                        </React.Fragment>
                            })
                        }
                    </ul>
                </div>
            </nav>

    )
}

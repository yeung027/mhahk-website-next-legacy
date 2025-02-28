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
    items:components["schemas"]["MainMenu"][] | undefined,
    category: PageCategory
}

const isMainMenuSubmenu = (
    item: components["schemas"]["MainMenuMainMenuItemComponent"] | components["schemas"]["MainMenuMainmenuSubmenuComponent"]
  ): item is components["schemas"]["MainMenuMainmenuSubmenuComponent"] => {
    return item.__component === "main-menu.mainmenu-submenu";
};

const isContainSubmenu = (items: (components["schemas"]["MainMenuMainMenuItemComponent"] | components["schemas"]["MainMenuMainmenuSubmenuComponent"])[] = []) => {
    return items.filter((u) => u.__component === "main-menu.mainmenu-submenu").length > 0
};

const ItemsVender = (id:number | undefined, items: (components["schemas"]["MainMenuMainMenuItemComponent"] | components["schemas"]["MainMenuMainmenuSubmenuComponent"])[] = []) => {
    
    const submenu_classname = "scale-[1] opacity-100 static pl-[30px]"
    const submenu_sep_classname = "border-[#4db093]"
    const submenuitem_classname = "max-w-[200px] min-w-[160px]"

    const xl_submenu_classname = `transition duration-300 ease-in-out 
        group opacity-0 group-hover:xl:opacity-100 xl:scale-[0] group-hover:xl:scale-[1] origin-top cursor-pointer 
        xl:absolute xl:shadow-[0_2px_5px_rgba(0,0,0,0.1)] bg-mainGreen mt-[7px] px-[20px] py-[15px] 
        text-green2 font-['Noto Sans', Helvetica] gap-4`;
    const xl_submenuitem_classname = "transition duration-300 ease-in-out pt-[15px] pb-[9px] hover:text-hoverBlue"
    const xl_submenu_sep_classname = "border-t-[1px] xl:border-[#4a9b7e]" 

    return (
        <React.Fragment key={`sub-menu-id-${id ?? 0}`}>

            {!(items.length==1 && !isMainMenuSubmenu(items[0])) && 
                <ul 
                    className={`${submenu_classname} ${xl_submenu_classname} 
                        ${isContainSubmenu(items)? 'flex flex-row' : ''}`} 
                    key={`sub-menu-ul-${id ?? 0}`}
                >
                    <li className={`${submenu_sep_classname} ${xl_submenu_sep_classname} xl:hidden`} key={`sep-${id ?? 0}`}  />
                    {items.map((item, index) => {
                        if (!isMainMenuSubmenu(item)) {
                            return (
                                <React.Fragment key={`menu-item-${index}`}>
                                    <li className={`${submenuitem_classname} ${xl_submenuitem_classname}`} key={`submenu-item-${id}-${index}`}>
                                        <span>{item.name}</span>
                                    </li>
                                    <li className={`${submenu_sep_classname} ${xl_submenu_sep_classname} last:hidden`} key={`submenu-sep-${id}-${index}`} />
                                </React.Fragment>
                            );
                        } else {
                            return SubSubMenuVender(item.id, item);
                        }
                    })}
                </ul>
            }
        </React.Fragment>
    );
};

const SubSubMenuVender = (id:number | undefined, item:components["schemas"]["MainMenuMainmenuSubmenuComponent"]) => {
    const title_classname = `text-[0.938rem] text-[#004ee2] font-[600]`
    const ul_classname = ""
    const item_classname = ""
    const sep_classname = "border-[#4db093]"

    const xl_ul_classname = ` `
    const submenuitem_classname = ""
    const xl_item_classname = "transition duration-300 ease-in-out pt-[15px] pb-[9px] hover:text-hoverBlue"
    const xl_sep_classname = "border-t-[1px] xl:border-[#4a9b7e]" 

    //console.log(item.submenus)
    return  <li 
                key={`sub-sub-menu-${item.id}`}
                className={`w-fit inline-block`}
            >
                {item.submenus &&
                    item.submenus.map((menu, index) => {
                        return  <ul className={`${ul_classname} ${xl_ul_classname}`} key={`sub-sub-menu-ul-${id ?? 0}`}>
                                    <li className={`${item_classname} ${xl_item_classname} ${title_classname}`}>
                                        {menu.name}
                                    </li>
                                    {menu.items &&
                                        menu.items.map((item, y) => {
                                            return  <React.Fragment key={`subsubmenu-item-${index}-${y}`}>
                                                        <li className={`${sep_classname} ${xl_sep_classname} last:hidden`} key={`subsubmenu-sep-${id}-${index}`} />
                                                        <li className={`${item_classname} ${xl_item_classname}`}>
                                                            {!isMainMenuSubmenu(item)&& item.name}
                                                        </li>
                                                    </React.Fragment>
                                        })
                                    }
                                </ul>
                    })
                }
            </li>
}

export default function MainMenu({ pathname, items, category } : MainMenuProps) {

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
                        {items &&
                            items.map((item, index) => {
                                return  <React.Fragment key={`main-menu-${index}`}>
                                            <li className={`${sep_classname} xl:hidden`} key={`sep-${index}`} />
                                            <li className={`${item_classname} ${xl_menuitem}`} key={`menu-item-${index}`}>
                                                {item.items && item.items.length<=1 &&
                                                    <div className={`${item.category===category ? "text-black xl:text-[#000000e3]" : ""}`}>
                                                        {item.name}
                                                    </div>
                                                }
                                                {item.items && item.items.length>1 &&
                                                    <div className={`${xl_menuitem_has_submenu_inner} ${has_subitem_classname} ${item.category===category ? "text-black" : ""}`}>
                                                        <span>
                                                            {item.name}
                                                        </span>
                                                        <MdKeyboardArrowDown className={"ml-[5px]"} />
                                                    </div>
                                                }
                                                
                                                {
                                                    <div className={`${item.category===category ? "hidden xl:flex" : "hidden"} absolute w-full bottom-[-8px] h-[2px] bg-black`} />
                                                }                                           
                                                
                                                {ItemsVender(item.id, item.items)}

                                            </li>
                                        </React.Fragment>    
                            })
                        }


                    </ul>
                </div>
            </nav>

    )
}
